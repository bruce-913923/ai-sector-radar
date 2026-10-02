"""Offline regression tests: no provider traffic, no repository data writes."""
import importlib.util
import unittest
from datetime import date, timedelta
from pathlib import Path
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("radar_update_data", Path(__file__).resolve().parents[1] / "scripts" / "update_data.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def row(day, close=100, volume=123):
    return {"date": day, "open": close, "high": close, "low": close, "close": close, "volume": volume}


class BenchmarkFallbackTests(unittest.TestCase):
    def run_update(self, old, yahoo=None, official=None, yahoo_error=None):
        history = {"benchmark": {"symbol": "^TWII", "rows": old}, "stocks": {}}
        with patch.object(module, "read_json", return_value=history), \
             patch.object(module, "yahoo_rows", side_effect=yahoo_error, return_value=yahoo or []), \
             patch.object(module, "fetch_twse_benchmark_rows", return_value=official or []) as fallback, \
             patch.object(module, "fetch_official_snapshot", return_value={}), \
             patch.object(module, "write_json") as writer:
            result = module.update_history({"sectors": []})
            fallback.assert_called_once()
            writer.assert_called_once()
            return result

    def test_yahoo_failure_uses_official_and_preserves_history(self):
        old = [row((date(2026, 1, 1) + timedelta(days=i)).isoformat()) for i in range(120)]
        result = self.run_update(old, official=[row("2026-10-02", 200, 0)], yahoo_error=RuntimeError("offline"))
        self.assertEqual(result["market_date"], "2026-10-02")
        self.assertEqual(len(result["benchmark"]["rows"]), 121)
        self.assertEqual(result["benchmark"]["rows"][0], old[0])

    def test_both_sources_unavailable_fails_without_write(self):
        with patch.object(module, "read_json", return_value={"benchmark": {"rows": [row("2026-10-01")]}, "stocks": {}}), \
             patch.object(module, "yahoo_rows", side_effect=RuntimeError("offline")), \
             patch.object(module, "fetch_twse_benchmark_rows", return_value=[]), \
             patch.object(module, "write_json") as writer:
            with self.assertRaisesRegex(RuntimeError, "Neither Yahoo nor TWSE"):
                module.update_history({"sectors": []})
            writer.assert_not_called()

    def test_official_ohlc_wins_and_keeps_yahoo_volume(self):
        result = self.run_update([], yahoo=[row("2026-10-02", 100, 456)], official=[row("2026-10-02", 200, 0)])
        last = result["benchmark"]["rows"][-1]
        self.assertEqual(last["close"], 200)
        self.assertEqual(last["volume"], 456)

    def test_yahoo_works_when_official_unavailable(self):
        result = self.run_update([], yahoo=[row("2026-10-02")])
        self.assertEqual(result["market_date"], "2026-10-02")

    def test_empty_provider_rows_fail_clearly(self):
        with self.assertRaisesRegex(RuntimeError, "Neither Yahoo nor TWSE"):
            self.run_update([])


if __name__ == "__main__":
    unittest.main()
