"""Regression for previous-trading-day comparisons and unchanged classifier policy."""
import importlib.util
import json
from datetime import date, timedelta
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("regime", ROOT / "scripts/update_market_regime.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class RegimeRerunTests(unittest.TestCase):
    def calculate(self, old, latest_close=110):
        rows = []
        for index in range(80):
            close = 100 + index
            day = (date(2026, 6, 1) + timedelta(days=index)).isoformat()
            rows.append({"date": day, "open": close, "high": close+1, "low": close-1, "close": close})
        rows[-1].update(open=latest_close, high=latest_close+1, low=latest_close-1, close=latest_close)
        history = {"benchmark": {"symbol": "^TWII", "rows": rows}}
        config = json.loads((ROOT / "config/market-regime.json").read_text())
        def read(path, default=None):
            return history if path == module.HISTORY_PATH else config if path == module.CONFIG_PATH else old
        with tempfile.TemporaryDirectory() as temp, \
             patch.object(module, "HISTORY_DIR", Path(temp)), \
             patch.object(module, "read_json", side_effect=read), \
             patch.object(module, "write_json") as writer:
            module.main()
            return writer.call_args_list[0].args[1], rows

    def test_same_day_rerun_preserves_daily_transition(self):
        first, rows = self.calculate({})
        second, _ = self.calculate(first)
        self.assertEqual(first["regime"], "Bear")
        self.assertEqual(first["change"], "Strong Bull -> Bear")
        self.assertEqual(second["change"], first["change"])
        self.assertEqual(second["previous_as_of"], rows[-2]["date"])
        self.assertNotEqual(second["previous_as_of"], second["as_of"])
        self.assertEqual(first, second)

    def test_cached_regime_does_not_define_daily_comparison(self):
        first, _ = self.calculate({"as_of": "2026-01-01", "regime": "Range"})
        second, _ = self.calculate({"as_of": first["as_of"], "regime": "Bear"})
        self.assertEqual(first["change"], second["change"])
        self.assertEqual(first["previous_as_of"], second["previous_as_of"])

    def test_unchanged_day_remains_unchanged(self):
        state, rows = self.calculate({}, latest_close=179)
        self.assertEqual(state["regime"], "Strong Bull")
        self.assertEqual(state["change"], "unchanged")
        self.assertEqual(state["previous_as_of"], rows[-2]["date"])

    def test_extracted_classifier_matches_original_gate_expression(self):
        for close in (60, 90, 100, 110, 150):
            for slope in (-0.01, 0.0, 0.02):
                ind = {"close":close, "open":close, "previous_close":close+2,
                       "ma10":105, "ma20":100, "ma60":90,
                       "ma10_change_5d":slope, "ma20_change_5d":slope, "ma60_change_5d":slope,
                       "previous_low_20d":70, "high_max_5d":110, "close_to_ma60_gap":close/90-1}
                prev = dict(ind, close=close+1)
                setups = module.bear_setups(ind)
                previous_setups = module.bear_setups(prev)
                pending = module.pending_gate(ind, setups)
                previous_pending = module.pending_gate(prev, previous_setups)
                phases = [p for p, yes in previous_setups.items() if yes] if previous_pending and ind["open"] <= prev["ma10"] else []
                base = module.base_regime(ind)
                expected = "Bear" if phases or base == "Bear" else ("Range" if pending and base in {"Strong Bull","Bull"} else base)
                self.assertEqual(module.classify_indicators(ind, prev)[-1], expected)


if __name__ == "__main__":
    unittest.main()
