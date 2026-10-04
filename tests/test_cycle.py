import json
import math
import sys
import unittest
from datetime import date, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import compute_cycle as cc
from update_data import build_rotation


def trading_dates(n):
    out, d = [], date(2025, 1, 1)
    while len(out) < n:
        if d.weekday() < 5:
            out.append(d.isoformat())
        d += timedelta(days=1)
    return out


def rows(dates, closes, volume=1000):
    return [{"date": d, "open": c, "high": c * 1.01, "low": c * 0.99, "close": c, "volume": volume} for d, c in zip(dates, closes)]


def synthetic():
    n = 160
    dates = trading_dates(n)
    shapes = {
        "UP": lambda i: 100 * (1.004 ** i),
        "DOWN": lambda i: 100 * (0.997 ** i),
        "LATE": lambda i: 100 if i < 110 else 100 * (1.02 ** (i - 110)),
        "WAVE": lambda i: 100 + 15 * math.sin(i / 9),
    }
    stocks, sectors = {}, []
    for sid, shape in shapes.items():
        tickers = []
        for k in range(2):
            ticker = f"{sid}{k}"
            stocks[ticker] = {"symbol": ticker, "rows": rows(dates, [shape(i) * (1 + 0.01 * k) for i in range(n)])}
            tickers.append({"ticker": ticker, "name": ticker, "role": "Leader" if k == 0 else "Member"})
        sectors.append({"id": sid, "label": sid, "stocks": tickers})
    history = {
        "benchmark": {"symbol": "^TWII", "rows": rows(dates, [100 * (1.001 ** i) for i in range(n)])},
        "stocks": stocks,
        "market_date": dates[-1],
    }
    config = {"groups": [{"id": "g", "sectors": list(shapes)}], "sectors": sectors}
    return config, history


class PureRuleTests(unittest.TestCase):
    def test_smooth_is_trailing_average(self):
        self.assertEqual(cc.smooth([3, 6, 9, 12], 3), [3, 4.5, 6, 9])

    def test_phase_quadrants(self):
        self.assertEqual([cc.phase(80, 80), cc.phase(80, 20), cc.phase(20, 80), cc.phase(20, 20)], ["L", "W", "I", "G"])

    def test_find_waves_closed_and_open(self):
        self.assertEqual(cc.find_waves([40, 55, 60, 45, 52, 51]), [(1, 3), (4, 6)])

    def test_base_before_uses_lower_bound_without_earlier_wave(self):
        waves = [(12, 20), (30, 40)]
        self.assertEqual(cc.base_before(waves, 0), (12, False))
        self.assertEqual(cc.base_before(waves, 1), (10, True))

    def test_turn_ladder(self):
        xs = [30, 30, 30, 30, 30, 42]
        self.assertEqual(cc.turn_level(xs, [0, 0, 0, 0, 0, 75], 5, 0.04, 0), "ready")
        self.assertEqual(cc.turn_level(xs, [0, 0, 0, 0, 0, 20], 5, 0.04, 0), "brewing")
        self.assertEqual(cc.turn_level(xs, [0, 0, 0, 0, 0, 20], 5, 0.01, 0), "watch")
        flat = [30] * 6
        self.assertEqual(cc.turn_level(flat, [0] * 6, 5, 0.06, 0), "watch")
        self.assertEqual(cc.turn_level(flat, [0] * 6, 5, 0.06, 0.2), "none")

    def test_turn_quality_levels(self):
        weak = {"ext20": 0.0, "b20": 0.4, "hot": 0.0}
        strong = {"ext20": 0.08, "b20": 1.0, "hot": 0.6}
        self.assertEqual(cc.turn_quality(5, weak)[0], "weak")
        self.assertEqual(cc.turn_quality(5, {"ext20": 0.05, "b20": 0.4, "hot": 0.0})[0], "normal")
        self.assertEqual(cc.turn_quality(60, strong)[0], "strong")

    def test_exit_levels(self):
        self.assertEqual(cc.exit_level([70, 70, 70, 70, 70, 55], 5, 0.02, 0), "alert")
        self.assertEqual(cc.exit_level([58] * 6, 5, -0.01, 0), "alert")
        self.assertEqual(cc.exit_level([90] * 6, 5, 0.03, 0), "stable")
        self.assertEqual(cc.exit_level([90] * 6, 5, 0.03, 0.25), "caution")

    def test_personality_types(self):
        self.assertEqual(cc.personality([80] * 100, [(0, 100)])["type"], "trend")
        breakout = [10] * 60 + [90] * 40
        self.assertEqual(cc.personality(breakout, cc.find_waves(breakout))["type"], "breakout")
        choppy = ([60, 60, 60, 20, 20, 20, 20] * 15)[:100]
        self.assertEqual(cc.personality(choppy, cc.find_waves(choppy))["type"], "choppy")
        self.assertEqual(cc.personality([10] * 100, [])["type"], "weak")


class BuildCycleTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.config, cls.history = synthetic()
        cls.cycle = cc.build_cycle(cls.config, cls.history)

    def test_positions_match_rotation_engine(self):
        rotation = build_rotation(self.config, self.history)
        _, positions, _, _ = cc.theme_daily(self.config, self.history)
        last = self.history["market_date"]
        for sector in rotation["sectors"]:
            self.assertEqual(tuple(round(v, 2) for v in positions[sector["id"]][last]), tuple(sector["path"][-1]))

    def test_output_shape(self):
        c = self.cycle
        self.assertEqual(c["updated_at"], self.history["market_date"])
        self.assertEqual(len(c["themes"]), 4)
        for theme in c["themes"]:
            series = theme["series"]
            self.assertEqual(len(series["rs"]), len(c["dates"]))
            self.assertEqual(len(series["phase"]), len(c["dates"]))
            self.assertTrue(all(v is None or 0 <= v <= 100 for v in series["rs"]))
            current = theme["current"]
            if current["strong"]:
                self.assertIn(current["wave"]["exit"], cc.EXIT_LEVELS)
                self.assertIn(current["wave"]["quality"], cc.QUALITY_LEVELS)
            else:
                self.assertIn(current["turn"], cc.TURN_LEVELS)
        json.dumps(c)

    def test_trends_land_on_expected_side(self):
        current = {t["id"]: t["current"] for t in self.cycle["themes"]}
        self.assertTrue(current["UP"]["strong"] or current["LATE"]["strong"])
        self.assertFalse(current["DOWN"]["strong"])

    def test_stats_carry_sample_sizes(self):
        stats = self.cycle["stats"]
        for level in cc.TURN_LEVELS:
            self.assertIn("n", stats["turn"][level])
        for level in cc.EXIT_LEVELS:
            self.assertIn("n", stats["exit"][level])
        self.assertIn("median_days", stats["waves"])


if __name__ == "__main__":
    unittest.main()
