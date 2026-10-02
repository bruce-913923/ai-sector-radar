import sys
from pathlib import Path
from datetime import date
import unittest
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from market_data_quality import expected_date, verify

CALENDAR = [
    {"Date":"1150102","Name":"國曆新年開始交易日","Description":"國曆新年開始交易。"},
    {"Date":"1151009","Name":"國慶日","Description":"補假。"},
    {"Date":"1150212","Name":"市場無交易，僅辦理結算交割作業","Description":""},
]


class QualityTests(unittest.TestCase):
    def test_actual_today_overrides_calendar_uncertainty(self):
        self.assertEqual(expected_date(date(2026,10,2), {"2026-10-02"}, []), "2026-10-02")

    def test_missing_weekday_is_not_assumed_holiday(self):
        with self.assertRaisesRegex(ValueError, "publication pending"):
            expected_date(date(2026,10,2), {"2026-10-01"}, CALENDAR)

    def test_weekend_uses_verified_friday(self):
        self.assertEqual(expected_date(date(2026,10,3), {"2026-10-02"}, CALENDAR), "2026-10-02")

    def test_holiday_uses_prior_trading_day(self):
        self.assertEqual(expected_date(date(2026,10,9), {"2026-10-08"}, CALENDAR), "2026-10-08")

    def test_informational_open_day_not_holiday(self):
        with self.assertRaises(ValueError):
            expected_date(date(2026,1,2), {"2025-12-31"}, CALENDAR)

    def test_calendar_outage_not_holiday(self):
        with self.assertRaisesRegex(ValueError, "calendar missing"):
            expected_date(date(2026,10,3), {"2026-10-02"}, [])

    def test_stale_friday_not_accepted_on_weekend(self):
        with self.assertRaises(ValueError):
            expected_date(date(2026,10,3), {"2026-10-01"}, CALENDAR)

    def test_settlement_only_is_not_trading(self):
        self.assertEqual(expected_date(date(2026,2,12), {"2026-02-11"}, CALENDAR), "2026-02-11")

    def test_every_configured_stock_must_have_valid_current_row(self):
        config = {"sectors":[{"stocks":[{"ticker":"1"},{"ticker":"2"}]}]}
        row = {"date":"2026-10-02","open":10,"high":11,"low":9,"close":10,"volume":0}
        history = {"market_date":"2026-10-02","stocks":{"1":{"rows":[row]},"2":{"rows":[dict(row)]}}}
        rotation = {"updated_at":"2026-10-02"}
        self.assertEqual(verify(config,history,rotation,"2026-10-02")["fresh_stocks"],2)
        history["stocks"]["2"]["rows"]=[]
        with self.assertRaisesRegex(ValueError,"missing_or_duplicate=2"):
            verify(config,history,rotation,"2026-10-02")
        history["stocks"]["2"]["rows"]=[dict(row, high=5)]
        with self.assertRaisesRegex(ValueError,"invalid_ohlcv=2"):
            verify(config,history,rotation,"2026-10-02")

    def test_uniformly_stale_outputs_fail(self):
        with self.assertRaisesRegex(ValueError,"expected official"):
            verify({"sectors":[]},{"market_date":"2026-10-01"},{"updated_at":"2026-10-01"},"2026-10-02")


if __name__ == "__main__":
    unittest.main()
