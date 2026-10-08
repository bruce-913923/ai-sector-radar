"""Offline stock fallback regressions: no live providers or repository writes."""
import copy
import sys
import unittest
from datetime import datetime
from pathlib import Path
from unittest.mock import Mock, patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import update_data as module
from market_data_quality import verify

TARGET = "2026-10-07"
CONFIG = {"sectors": [{"stocks": [{"ticker": "1802"}]}]}


def row(day=TARGET, **changes):
    result = {"date": day, "open": 60.1, "high": 65.7, "low": 59.8, "close": 65.7, "volume": 108421907}
    result.update(changes)
    return result


def payload():
    return {
        "stat": "OK", "date": "20261001",
        "title": "115年10月 1802 台玻 各日成交資訊",
        "fields": ["日期", "成交股數", "成交金額", "開盤價", "最高價", "最低價", "收盤價", "漲跌價差", "成交筆數", "註記"],
        "data": [["115/10/07", "108,469,283", "6,893,350,654", "60.10", "65.70", "59.80", "65.70", "+5.90", "53,243", ""]],
    }


class StockFallbackTests(unittest.TestCase):
    def fetch(self, data):
        response = Mock()
        response.json.return_value = data
        with patch.object(module.requests, "get", return_value=response) as get:
            result = module.fetch_twse_stock_day("1802", TARGET)
            get.assert_called_once_with(
                module.TWSE_STOCK_DAY,
                params={"response": "json", "date": "20261001", "stockNo": "1802"},
                headers=module.HEADERS, timeout=20,
            )
            response.raise_for_status.assert_called_once()
            return result

    def test_official_complete_row_and_volume_provenance(self):
        result = self.fetch(payload())
        self.assertEqual([result[k] for k in ("open", "high", "low", "close", "volume")],
                         [60.1, 65.7, 59.8, 65.7, 108469283])
        self.assertEqual(result["source"], "twse-stock-day")
        self.assertIn("stockNo=1802", result["source_url"])
        self.assertEqual(result["volume_unit"], "shares")
        self.assertIn("成交股數", result["volume_basis"])
        self.assertIn("Yahoo", result["volume_comparability"])

    def test_named_fields_allow_reordered_columns(self):
        data = payload()
        data["fields"].reverse()
        for record in data["data"]:
            record.reverse()
        result = self.fetch(data)
        self.assertEqual(result["close"], 65.7)
        self.assertEqual(result["volume"], 108469283)

    def test_stale_and_duplicate_targets_rejected(self):
        stale = payload()
        stale["data"][0][0] = "115/10/06"
        duplicate = payload()
        duplicate["data"].append(copy.deepcopy(duplicate["data"][0]))
        for data in (stale, duplicate):
            with self.subTest(data=data), self.assertRaisesRegex(ValueError, "expected one row"):
                self.fetch(data)

    def test_wrong_identity_month_status_and_fields_rejected(self):
        variants = []
        for key, value in (("title", "115年10月 2330 台積電 各日成交資訊"),
                           ("date", "20260901"), ("stat", "很抱歉，沒有符合條件的資料!")):
            data = payload()
            data[key] = value
            variants.append(data)
        data = payload()
        data["fields"][3] = "unknown"
        variants.append(data)
        for data in variants:
            with self.subTest(data=data), self.assertRaises(ValueError):
                self.fetch(data)

    def test_invalid_prices_and_volume_never_synthesized(self):
        for index, value in ((3, "--"), (3, "0"), (4, "60.00"), (5, "66.00"),
                             (6, "NaN"), (1, "-1"), (1, "1.5"), (1, True)):
            data = payload()
            data["data"][0][index] = value
            with self.subTest(index=index, value=value), self.assertRaises(ValueError):
                self.fetch(data)

    def test_valid_current_row_never_fetches_fallback(self):
        rows = [row()]
        with patch.object(module, "fetch_twse_stock_day") as fallback:
            self.assertIs(module.reconcile_current_stock_row("1802", "1802.TW", rows, TARGET), rows)
            fallback.assert_not_called()

    def test_invalid_or_missing_current_row_replaced_only_by_exact_date(self):
        official = dict(row(volume=108469283), source="twse-stock-day")
        prior = row("2026-10-06", close=60.1)
        for rows in ([prior, row(high=60)], [prior]):
            with patch.object(module, "fetch_twse_stock_day", return_value=official) as fallback:
                result = module.reconcile_current_stock_row("1802", "1802.TW", rows, TARGET)
                self.assertEqual(result, [prior, official])
                fallback.assert_called_once_with("1802", TARGET)

    def test_tpex_invalid_row_never_uses_twse(self):
        with patch.object(module, "fetch_twse_stock_day") as fallback:
            with self.assertRaisesRegex(ValueError, "No verified dated fallback"):
                module.reconcile_current_stock_row("1802", "1802.TWO", [row(high=60)], TARGET)
            fallback.assert_not_called()

    def test_invalid_or_stale_fallback_still_blocks(self):
        for official in (row("2026-10-06"), row(high=60)):
            with patch.object(module, "fetch_twse_stock_day", return_value=official):
                with self.assertRaisesRegex(ValueError, "Dated official stock fallback failed"):
                    module.reconcile_current_stock_row("1802", "1802.TW", [row(high=60)], TARGET)

    def update(self, fallback_error=None, snapshot=None, yahoo_valid=False):
        history = {"benchmark": {"symbol": "^TWII", "rows": [row("2026-10-06")]},
                   "stocks": {"1802": {"symbol": "1802.TW", "rows": [row("2026-10-06")]}}}
        def yahoo(symbol, days):
            return [row()] if symbol == "^TWII" or yahoo_valid else [row(high=60)]
        with patch.object(module, "read_json", return_value=history), \
             patch.object(module, "yahoo_rows", side_effect=yahoo), \
             patch.object(module, "fetch_twse_benchmark_rows", return_value=[row()]), \
             patch.object(module, "fetch_official_snapshot", return_value={"1802": snapshot if snapshot is not None else {"date": "2026-10-06"}}), \
             patch.object(module, "fetch_twse_stock_day", side_effect=fallback_error,
                          return_value=dict(row(volume=108469283), source="twse-stock-day")) as fallback, \
             patch.object(module, "write_json") as writer:
            if fallback_error:
                with self.assertRaisesRegex(ValueError, "Dated official stock fallback failed"):
                    module.update_history(CONFIG)
                writer.assert_not_called()
                return
            result = module.update_history(CONFIG)
            fallback.assert_called_once_with("1802", TARGET)
            writer.assert_called_once()
            self.assertEqual(verify(CONFIG, result, {"updated_at": TARGET}, TARGET)["fresh_stocks"], 1)
            self.assertEqual(result["stocks"]["1802"]["rows"][-1]["source"], "twse-stock-day")

    def test_full_update_recovers_invalid_yahoo_with_stale_snapshot(self):
        self.update()

    def test_invalid_same_day_snapshot_is_repaired_when_yahoo_invalid(self):
        self.update(snapshot=row(high=60), yahoo_valid=False)

    def test_fallback_outage_blocks_before_history_write(self):
        self.update(RuntimeError("offline"))

    def test_quality_error_retains_ticker_and_concrete_values(self):
        history = {"market_date": TARGET, "stocks": {"1802": {"rows": [row(high=60)]}}}
        with self.assertRaisesRegex(ValueError, "invalid_ohlcv=1802") as caught:
            verify(CONFIG, history, {"updated_at": TARGET}, TARGET)
        self.assertIn("high_below_open_or_close", str(caught.exception))
        self.assertIn("'high': 60", str(caught.exception))

    def test_boolean_nonfinite_and_negative_values_fail_closed(self):
        for bad in (row(open=True), row(close=float("inf")), row(low=0), row(volume=-1), row(volume=False)):
            with self.subTest(bad=bad):
                self.assertTrue(module.ohlcv_errors(bad))


class RawProviderTests(unittest.TestCase):
    """Exercise real provider parsers, not only pre-parsed row doubles."""

    def yahoo_payload(self):
        timestamp = int(datetime(2026, 10, 7, 13, 30, tzinfo=module.TAIPEI).timestamp())
        return {"chart": {"result": [{"timestamp": [timestamp], "indicators": {"quote": [{
            "open": [60.1], "high": [65.7], "low": [59.8], "close": [65.7], "volume": [108421907],
        }]}}]}}

    def snapshot_payload(self):
        return [{"Code": "1802", "Date": "1151007", "OpeningPrice": "60.10", "HighestPrice": "65.70",
                 "LowestPrice": "59.80", "ClosingPrice": "65.70", "TradeVolume": "108,421,907"}]

    def response(self, data):
        response = Mock()
        response.json.return_value = data
        return response

    def test_yahoo_missing_ohlcv_stays_missing(self):
        for key in ("open", "high", "low", "close", "volume"):
            for missing in ([], [None], [True], ["NaN"]):
                data = self.yahoo_payload()
                data["chart"]["result"][0]["indicators"]["quote"][0][key] = missing
                with self.subTest(key=key, missing=missing), \
                     patch.object(module.requests, "get", return_value=self.response(data)):
                    parsed = module.yahoo_rows("1802.TW")
                    self.assertEqual(len(parsed), 1)
                    self.assertTrue(module.ohlcv_errors(parsed[0]))
                    self.assertEqual(parsed[0]["date"], TARGET)
                    self.assertEqual(parsed[0]["source"], "yahoo-chart")
                    self.assertEqual(parsed[0]["volume_unit"], "shares")

    def test_invalid_historical_yahoo_row_does_not_replace_valid_cache(self):
        data = self.yahoo_payload()
        result = data["chart"]["result"][0]
        result["timestamp"].insert(0, int(datetime(2026, 10, 6, 13, 30, tzinfo=module.TAIPEI).timestamp()))
        for key, values in result["indicators"]["quote"][0].items():
            values.insert(0, None if key == "close" else values[0])
        with patch.object(module.requests, "get", return_value=self.response(data)):
            parsed = module.yahoo_rows("1802.TW")
        prior = row("2026-10-06")
        history = {"benchmark": {"rows": []}, "stocks": {"1802": {"symbol": "1802.TW", "rows": [prior]}}}
        with patch.object(module, "read_json", return_value=history), \
             patch.object(module, "yahoo_rows", return_value=parsed), \
             patch.object(module, "fetch_twse_benchmark_rows", return_value=[row()]), \
             patch.object(module, "fetch_official_snapshot", return_value={}), \
             patch.object(module, "write_json"):
            updated = module.update_history(CONFIG)
        self.assertEqual(updated["stocks"]["1802"]["rows"][0], prior)
        self.assertEqual(updated["benchmark"]["rows"][0]["date"], TARGET)

    def test_snapshot_missing_ohlcv_stays_missing(self):
        for field in ("OpeningPrice", "HighestPrice", "LowestPrice", "ClosingPrice", "TradeVolume"):
            for value in (None, "", "--", True, "NaN"):
                data = self.snapshot_payload()
                data[0][field] = value
                with self.subTest(field=field, value=value), \
                     patch.object(module.requests, "get", side_effect=[self.response(data), self.response([])]):
                    parsed = module.fetch_official_snapshot()["1802"]
                    self.assertTrue(module.ohlcv_errors(parsed))
                    self.assertEqual(parsed["date"], TARGET)
                    self.assertEqual(parsed["source"], "twse-daily")
                    self.assertEqual(parsed["volume_unit"], "shares")

    def run_raw_update(self, yahoo_data, snapshot_data, fallback_data=None, fallback_error=None, cache_current=False, expect_failure=False):
        history = {"benchmark": {"symbol": "^TWII", "rows": []},
                   "stocks": {"1802": {"symbol": "1802.TW", "rows": [row("2026-10-06")]}}}
        if cache_current:
            history["stocks"]["1802"]["rows"] = [dict(row(), source="verified-cache", volume_unit="shares")]
        fallback_calls = []

        def get(url, **kwargs):
            if url == module.YAHOO_CHART.format(symbol="^TWII"):
                return self.response(self.yahoo_payload())
            if url == module.YAHOO_CHART.format(symbol="1802.TW"):
                return self.response(yahoo_data)
            if url == module.TWSE_DAILY:
                return self.response(snapshot_data)
            if url == module.TPEX_DAILY:
                return self.response([])
            if url == module.TWSE_STOCK_DAY:
                fallback_calls.append(kwargs["params"])
                if fallback_error:
                    raise fallback_error
                return self.response(fallback_data if fallback_data is not None else payload())
            raise AssertionError("Unexpected network endpoint: " + url)

        with patch.object(module.requests, "get", side_effect=get), \
             patch.object(module, "read_json", return_value=history), \
             patch.object(module, "fetch_twse_benchmark_rows", return_value=[row()]), \
             patch.object(module, "datetime", wraps=datetime) as clock, \
             patch.object(module, "write_json") as writer:
            # Exercise the old same-Taipei-day relabelling bug explicitly.
            clock.now.return_value = datetime(2026, 10, 7, 16, tzinfo=module.TAIPEI)
            if expect_failure:
                with self.assertRaisesRegex(ValueError, "Dated official stock fallback failed"):
                    module.update_history(CONFIG)
                writer.assert_not_called()
                return None, fallback_calls
            result = module.update_history(CONFIG)
            writer.assert_called_once()
            verify(CONFIG, result, {"updated_at": TARGET}, TARGET)
            return result["stocks"]["1802"]["rows"][-1], fallback_calls

    def test_incomplete_yahoo_uses_fallback_without_valid_current_row(self):
        for key in ("open", "high", "low", "close", "volume"):
            data = self.yahoo_payload()
            data["chart"]["result"][0]["indicators"]["quote"][0][key] = [None]
            with self.subTest(key=key):
                result, calls = self.run_raw_update(data, [])
                self.assertEqual(result["source"], "twse-stock-day")
                self.assertEqual(result["volume"], 108469283)
                self.assertEqual(len(calls), 1)

    def test_incomplete_same_day_snapshot_triggers_dated_fallback(self):
        for key in ("OpeningPrice", "HighestPrice", "LowestPrice", "ClosingPrice", "TradeVolume"):
            data = self.snapshot_payload()
            del data[0][key]
            with self.subTest(key=key):
                yahoo = self.yahoo_payload()
                yahoo["chart"]["result"][0]["indicators"]["quote"][0]["open"] = [None]
                result, calls = self.run_raw_update(yahoo, data)
                self.assertEqual(result["source"], "twse-stock-day")
                self.assertEqual(len(calls), 1)

    def test_snapshot_dates_are_never_relabelled(self):
        for value in (None, "", "invalid", "prefix20261007", "2026-10-07-extra", "2026//10/07", "2026-10-06"):
            snap = self.snapshot_payload()
            snap[0]["Date"] = value
            yahoo = self.yahoo_payload()
            yahoo["chart"]["result"][0]["indicators"]["quote"][0]["open"] = [None]
            with self.subTest(value=value):
                result, calls = self.run_raw_update(yahoo, snap)
                self.assertEqual(result["source"], "twse-stock-day")
                self.assertEqual(len(calls), 1)

    def test_valid_snapshot_preserves_provenance_and_zero_volume(self):
        snap = self.snapshot_payload()
        snap[0]["TradeVolume"] = "0"
        result, calls = self.run_raw_update(self.yahoo_payload(), snap)
        self.assertEqual(calls, [])
        self.assertEqual(result["volume"], 0)
        self.assertEqual(result["source"], "twse-daily")
        self.assertEqual(result["source_url"], module.TWSE_DAILY)
        self.assertEqual(result["source_date"], "1151007")
        self.assertEqual(result["volume_unit"], "shares")

    def test_fractional_volume_is_not_truncated(self):
        yahoo = self.yahoo_payload()
        yahoo["chart"]["result"][0]["indicators"]["quote"][0]["volume"] = [1.5]
        result, calls = self.run_raw_update(yahoo, [])
        self.assertEqual(result["source"], "twse-stock-day")
        self.assertEqual(len(calls), 1)

    def test_unknown_snapshot_volume_unit_does_not_become_shares(self):
        snap = self.snapshot_payload()
        del snap[0]["TradeVolume"]
        snap[0]["Volume"] = "108421"
        yahoo = self.yahoo_payload()
        yahoo["chart"]["result"][0]["indicators"]["quote"][0]["open"] = [None]
        result, calls = self.run_raw_update(yahoo, snap)
        self.assertEqual(result["source"], "twse-stock-day")
        self.assertEqual(result["volume_unit"], "shares")
        self.assertEqual(len(calls), 1)

    def test_valid_yahoo_zero_volume_is_preserved_without_fallback(self):
        yahoo = self.yahoo_payload()
        yahoo["chart"]["result"][0]["indicators"]["quote"][0]["volume"] = [0]
        result, calls = self.run_raw_update(yahoo, [])
        self.assertEqual(calls, [])
        self.assertEqual(result["volume"], 0)
        self.assertEqual(result["source"], "yahoo-chart")
        self.assertEqual(result["volume_unit"], "shares")

    def test_raw_fallback_outage_and_wrong_date_block_writes(self):
        yahoo = self.yahoo_payload()
        yahoo["chart"]["result"][0]["indicators"]["quote"][0]["open"] = [None]
        self.run_raw_update(yahoo, [], fallback_error=RuntimeError("offline"), expect_failure=True)
        stale = payload()
        stale["data"][0][0] = "115/10/06"
        self.run_raw_update(yahoo, [], fallback_data=stale, expect_failure=True)

    def test_invalid_snapshot_preserves_valid_yahoo_even_when_fallback_unavailable(self):
        snap = self.snapshot_payload()
        snap[0]["HighestPrice"] = "--"
        result, calls = self.run_raw_update(self.yahoo_payload(), snap, fallback_error=RuntimeError("offline"))
        self.assertEqual(calls, [])
        self.assertEqual(result["source"], "yahoo-chart")
        self.assertEqual(result["high"], 65.7)

    def test_invalid_refresh_preserves_valid_exact_date_cache(self):
        yahoo = self.yahoo_payload()
        yahoo["chart"]["result"][0]["indicators"]["quote"][0]["open"] = [None]
        snap = self.snapshot_payload()
        snap[0]["TradeVolume"] = None
        result, calls = self.run_raw_update(yahoo, snap, cache_current=True, fallback_error=RuntimeError("offline"))
        self.assertEqual(calls, [])
        self.assertEqual(result["source"], "verified-cache")
        self.assertEqual(result["date"], TARGET)

    def test_duplicate_yahoo_payload_is_rejected(self):
        data = self.yahoo_payload()
        result = data["chart"]["result"][0]
        result["timestamp"] *= 2
        for values in result["indicators"]["quote"][0].values():
            values *= 2
        with patch.object(module.requests, "get", return_value=self.response(data)):
            with self.assertRaisesRegex(ValueError, "Duplicate Yahoo"):
                module.yahoo_rows("1802.TW")
        result, calls = self.run_raw_update(data, [])
        self.assertEqual(result["source"], "twse-stock-day")
        self.assertEqual(len(calls), 1)

    def test_duplicate_snapshot_payload_is_not_silently_selected(self):
        snap = self.snapshot_payload()
        snap.append(dict(snap[0], ClosingPrice="64.0"))
        yahoo = self.yahoo_payload()
        yahoo["chart"]["result"][0]["indicators"]["quote"][0]["open"] = [None]
        result, calls = self.run_raw_update(yahoo, snap)
        self.assertEqual(result["source"], "twse-stock-day")
        self.assertEqual(len(calls), 1)

    def test_duplicate_cached_target_does_not_count_as_valid_current_row(self):
        rows = module.merge_stock_rows("1802", [row(), row()], [], TARGET)
        self.assertEqual(rows, [])
        with patch.object(module, "fetch_twse_stock_day", return_value=dict(row(), source="twse-stock-day")) as fallback:
            recovered = module.reconcile_current_stock_row("1802", "1802.TW", rows, TARGET)
        fallback.assert_called_once_with("1802", TARGET)
        self.assertEqual(len(recovered), 1)


if __name__ == "__main__":
    unittest.main()
