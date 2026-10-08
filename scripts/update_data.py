#!/usr/bin/env python3
import json
import math
import re
import statistics
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

import requests

ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "config" / "sectors.json"
HISTORY_PATH = ROOT / "data" / "market_history.json"
ROTATION_PATH = ROOT / "data" / "latest" / "rotation.json"
ROTATION_JS_PATH = ROOT / "data" / "latest" / "rotation.js"

TAIPEI = ZoneInfo("Asia/Taipei")
YAHOO_CHART = "https://query1.finance.yahoo.com/v8/finance/chart/{symbol}"
TWSE_INDEX_HISTORY = "https://www.twse.com.tw/indicesReport/MI_5MINS_HIST"
TWSE_DAILY = "https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL"
TWSE_STOCK_DAY = "https://www.twse.com.tw/exchangeReport/STOCK_DAY"
TPEX_DAILY = "https://www.tpex.org.tw/openapi/v1/tpex_mainboard_daily_close_quotes"
HEADERS = {"User-Agent": "Mozilla/5.0 ai-sector-radar/1.0"}


def read_json(path, default=None):
    if not path.exists():
        return default
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def write_json(path, obj):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)
        f.write("\n")


def num(v):
    if v is None or isinstance(v, bool):
        return None
    if isinstance(v, (int, float)):
        return float(v)
    s = str(v).strip().replace(",", "")
    if s in {"", "--", "---", "除權", "除息"}:
        return None
    try:
        return float(s)
    except ValueError:
        return None



def normalize_market_date(value):
    if value is None:
        return None
    s = str(value).strip()
    normalized = s.replace(".", "/").replace("-", "/")
    try:
        if "/" in normalized:
            parts = normalized.split("/")
            if not re.fullmatch(r"\d{3,4}/\d{1,2}/\d{1,2}", normalized):
                return None
            year, month, day = map(int, parts)
        else:
            if not re.fullmatch(r"\d{7,8}", s):
                return None
            digits = s
            if len(digits) == 8:
                year, month, day = int(digits[:4]), int(digits[4:6]), int(digits[6:8])
            elif len(digits) == 7:
                year, month, day = int(digits[:3]), int(digits[3:5]), int(digits[5:7])
            else:
                return None
        if year < 1911:
            year += 1911
        return datetime(year, month, day).strftime("%Y-%m-%d")
    except (TypeError, ValueError):
        return None


def fetch_twse_benchmark_rows(months=2):
    rows_by_date = {}
    cursor = datetime.now(TAIPEI).replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    for _ in range(months):
        try:
            r = requests.get(
                TWSE_INDEX_HISTORY,
                params={"response": "json", "date": cursor.strftime("%Y%m01")},
                headers=HEADERS,
                timeout=20,
            )
            r.raise_for_status()
            payload = r.json()
            for rec in payload.get("data") or []:
                if not isinstance(rec, (list, tuple)) or len(rec) < 5:
                    continue
                date = normalize_market_date(rec[0])
                values = [num(rec[i]) for i in range(1, 5)]
                if not date or any(v is None for v in values):
                    continue
                open_, high, low, close = values
                rows_by_date[date] = {
                    "date": date,
                    "open": round(float(open_), 4),
                    "high": round(float(high), 4),
                    "low": round(float(low), 4),
                    "close": round(float(close), 4),
                    "volume": 0,
                }
        except Exception as exc:
            print(f"warning: official TWSE index history unavailable for {cursor:%Y-%m}: {exc}")

        if cursor.month == 1:
            cursor = cursor.replace(year=cursor.year - 1, month=12)
        else:
            cursor = cursor.replace(month=cursor.month - 1)

    return [rows_by_date[d] for d in sorted(rows_by_date)]


def yahoo_rows(symbol, days=420):
    end = datetime.now(timezone.utc) + timedelta(days=1)
    start = end - timedelta(days=days)
    params = {
        "period1": int(start.timestamp()),
        "period2": int(end.timestamp()),
        "interval": "1d",
        "events": "history",
        "includeAdjustedClose": "true",
    }
    r = requests.get(YAHOO_CHART.format(symbol=symbol), params=params, headers=HEADERS, timeout=25)
    r.raise_for_status()
    payload = r.json()
    result = (payload.get("chart") or {}).get("result") or []
    if not result:
        raise RuntimeError(f"Yahoo returned no data for {symbol}")
    result = result[0]
    timestamps = result.get("timestamp") or []
    quote = ((result.get("indicators") or {}).get("quote") or [{}])[0]
    opens = quote.get("open") or []
    highs = quote.get("high") or []
    lows = quote.get("low") or []
    closes = quote.get("close") or []
    volumes = quote.get("volume") or []
    out = []
    seen_dates = set()
    for i, ts in enumerate(timestamps):
        dt = datetime.fromtimestamp(ts, timezone.utc).astimezone(TAIPEI)
        day = dt.strftime("%Y-%m-%d")
        if day in seen_dates:
            raise ValueError(f"Duplicate Yahoo daily observation for {symbol} {day}")
        seen_dates.add(day)
        # Keep incomplete rows incomplete so validation can trigger a dated
        # fallback. Dropping them could expose an older cached row instead.
        row = {
            "date": day,
            "source": "yahoo-chart",
            "source_url": YAHOO_CHART.format(symbol=symbol),
            "volume_unit": "shares" if symbol.endswith((".TW", ".TWO")) else "provider-reported",
            "volume_basis": "Yahoo chart volume, as reported; no cross-source normalization applied",
        }
        for key, values in (("open", opens), ("high", highs), ("low", lows), ("close", closes), ("volume", volumes)):
            row[key] = num(values[i]) if i < len(values) else None
        out.append(row)
    return out


def resolve_symbol(ticker):
    errors = []
    for suffix in (".TW", ".TWO"):
        symbol = f"{ticker}{suffix}"
        try:
            rows = yahoo_rows(symbol, 35)
            if sum(not ohlcv_errors(row) for row in rows) >= 5:
                return symbol
        except Exception as exc:
            errors.append(f"{symbol}: {exc}")
        time.sleep(0.12)
    raise RuntimeError("; ".join(errors))


def merge_rows(old_rows, new_rows, keep=430):
    merged = {r["date"]: r for r in old_rows}
    for row in new_rows:
        merged[row["date"]] = row
    rows = [merged[d] for d in sorted(merged)]
    return rows[-keep:]


def merge_stock_rows(ticker, old_rows, new_rows, target):
    """An incomplete refresh must not replace a complete dated observation."""
    by_date = {}
    for batch in (old_rows, new_rows):
        counts = {}
        for row in batch:
            day = row.get("date")
            counts[day] = counts.get(day, 0) + 1
        for row in batch:
            day = row.get("date")
            if counts[day] != 1:
                print("warning: rejected duplicate stock observations " + row_diagnostic(ticker, row, ["duplicate_date"]))
                continue
            errors = ohlcv_errors(row)
            if errors:
                print("warning: rejected incoming stock row " + row_diagnostic(ticker, row, errors))
                # Keep invalid current data only as diagnostic input to the
                # dated fallback when no valid current observation exists.
                if day != target or (day in by_date and not ohlcv_errors(by_date[day])):
                    continue
            by_date[day] = row
    return [by_date[day] for day in sorted(by_date)][-430:]


def pick(record, names):
    lowered = {str(k).lower(): v for k, v in record.items()}
    for name in names:
        if name in record:
            return record[name]
        if name.lower() in lowered:
            return lowered[name.lower()]
    return None


def fetch_official_snapshot():
    result = {}
    sources = [(TWSE_DAILY, "twse"), (TPEX_DAILY, "tpex")]
    for url, market in sources:
        try:
            r = requests.get(url, headers=HEADERS, timeout=20)
            r.raise_for_status()
            payload = r.json()
            if isinstance(payload, dict):
                payload = payload.get("data") or payload.get("aaData") or []
            records = payload if isinstance(payload, list) else []
            ticker_counts = {}
            for rec in records:
                if isinstance(rec, dict):
                    ticker = str(pick(rec, ["Code", "SecuritiesCompanyCode", "股票代號", "代號"]) or "").strip()
                    ticker_counts[ticker] = ticker_counts.get(ticker, 0) + 1
            for rec in records:
                if not isinstance(rec, dict):
                    continue
                ticker = str(pick(rec, ["Code", "SecuritiesCompanyCode", "股票代號", "代號"]) or "").strip()
                if not ticker.isdigit():
                    continue
                if ticker_counts[ticker] != 1:
                    print(f"warning: rejected duplicate {market} snapshot for {ticker}")
                    continue
                raw_date = pick(rec, ["Date", "TradeDate", "TradingDate", "交易日期", "成交日期", "日期"])
                result[ticker] = {
                    "market": market,
                    "date": normalize_market_date(raw_date),
                    "source_date": raw_date,
                    "source": market + "-daily",
                    "source_url": url,
                    "volume_unit": "shares",
                    "volume_basis": market.upper() + " daily reported shares; no cross-source normalization applied",
                    "open": num(pick(rec, ["OpeningPrice", "Open", "開盤價"])),
                    "high": num(pick(rec, ["HighestPrice", "High", "最高價"])),
                    "low": num(pick(rec, ["LowestPrice", "Low", "最低價"])),
                    "close": num(pick(rec, ["ClosingPrice", "Close", "收盤價", "ClosePrice"])),
                    # Do not guess whether an undocumented generic Volume is
                    # shares or board lots. Unknown units stay incomplete.
                    "volume": num(pick(rec, ["TradeVolume", "TradingShares", "成交股數"])),
                }
        except Exception as exc:
            print(f"warning: official {market} snapshot unavailable: {exc}")
    return result


def ohlcv_errors(row):
    """Return concrete validation failures without repairing or inventing values."""
    errors = []
    for key in ("open", "high", "low", "close"):
        value = row.get(key)
        if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value) or value <= 0:
            errors.append(key + "_not_finite_positive")
    if not errors:
        open_, high, low, close = (row[key] for key in ("open", "high", "low", "close"))
        if low > min(open_, close):
            errors.append("low_above_open_or_close")
        if high < max(open_, close):
            errors.append("high_below_open_or_close")
        if low > high:
            errors.append("low_above_high")
    volume = row.get("volume")
    if isinstance(volume, bool) or not isinstance(volume, (int, float)) or not math.isfinite(volume) or volume < 0:
        errors.append("volume_not_finite_nonnegative")
    elif volume != int(volume):
        errors.append("volume_not_integer_shares")
    return errors


def row_diagnostic(ticker, row, reasons):
    values = {key: row.get(key) for key in ("date", "open", "high", "low", "close", "volume", "source", "source_date", "volume_unit")}
    return f"{ticker}: reasons={','.join(reasons)} values={values!r}"


def fetch_twse_stock_day(ticker, target):
    """Fetch one explicitly dated, complete official row; never relabel stale data."""
    month = datetime.strptime(target, "%Y-%m-%d").strftime("%Y%m01")
    response = requests.get(
        TWSE_STOCK_DAY,
        params={"response": "json", "date": month, "stockNo": ticker},
        headers=HEADERS,
        timeout=20,
    )
    response.raise_for_status()
    payload = response.json()
    if not isinstance(payload, dict) or payload.get("stat") != "OK" or payload.get("date") != month:
        raise ValueError("Unexpected TWSE STOCK_DAY response or month")
    if ticker not in str(payload.get("title", "")).split():
        raise ValueError("TWSE STOCK_DAY response does not identify requested ticker")
    fields = payload.get("fields")
    required = {"date": "日期", "open": "開盤價", "high": "最高價", "low": "最低價", "close": "收盤價", "volume": "成交股數"}
    if not isinstance(fields, list) or any(fields.count(name) != 1 for name in required.values()):
        raise ValueError("Unexpected TWSE STOCK_DAY field schema")
    indices = {key: fields.index(name) for key, name in required.items()}
    records = payload.get("data")
    if not isinstance(records, list):
        raise ValueError("Unexpected TWSE STOCK_DAY data schema")
    matches = []
    for record in records:
        if not isinstance(record, (list, tuple)) or len(record) <= max(indices.values()):
            raise ValueError("Malformed TWSE STOCK_DAY record")
        if normalize_market_date(record[indices["date"]]) != target:
            continue
        row = {"date": target}
        for key in ("open", "high", "low", "close", "volume"):
            raw = record[indices[key]]
            row[key] = None if isinstance(raw, bool) else num(raw)
        matches.append(row)
    if len(matches) != 1:
        raise ValueError(f"TWSE STOCK_DAY target {target}: expected one row, got {len(matches)}")
    row = matches[0]
    errors = ohlcv_errors(row)
    if not errors and not row["volume"].is_integer():
        errors.append("volume_not_integer_shares")
    if errors:
        raise ValueError(row_diagnostic(ticker, row, errors))
    row["volume"] = int(row["volume"])
    row.update({
        "source": "twse-stock-day",
        "source_url": f"{TWSE_STOCK_DAY}?response=json&date={month}&stockNo={ticker}",
        "volume_unit": "shares",
        "volume_basis": "TWSE STOCK_DAY 成交股數 (shares), as reported",
        "volume_comparability": "May differ from Yahoo historical volume; no cross-source normalization applied",
    })
    return row


def reconcile_current_stock_row(ticker, symbol, rows, target):
    matches = [row for row in rows if row.get("date") == target]
    errors = ohlcv_errors(matches[0]) if len(matches) == 1 else ["missing_or_duplicate_target"]
    if not errors:
        return rows
    detail = row_diagnostic(ticker, matches[0] if matches else {"date": target}, errors)
    print("warning: rejected current stock row " + detail)
    if symbol != f"{ticker}.TW":
        raise ValueError("No verified dated fallback for " + detail)
    try:
        official_row = fetch_twse_stock_day(ticker, target)
        # Defend the integration boundary as well as the HTTP parser.
        if official_row.get("date") != target or ohlcv_errors(official_row):
            raise ValueError("Dated fallback returned an invalid or mismatched row")
    except Exception as exc:
        raise ValueError("Dated official stock fallback failed for " + detail + "; " + str(exc)) from exc
    print(f"recovered {ticker} {target}: source=twse-stock-day; volume basis may differ from Yahoo history")
    return merge_rows(rows, [official_row])


def update_history(config):
    history = read_json(HISTORY_PATH, {"benchmark": {}, "stocks": {}})
    benchmark = history.get("benchmark") or {}
    benchmark_symbol = benchmark.get("symbol") or "^TWII"
    existing_bench = benchmark.get("rows") or []

    bootstrap = len(existing_bench) < 120
    yahoo_days = 430 if bootstrap else 30
    # A Yahoo outage must not prevent the official TWSE fallback from running.
    try:
        bench_rows = yahoo_rows(benchmark_symbol, yahoo_days)
        bench_rows = [row for row in bench_rows if not ohlcv_errors(row)]
    except Exception as exc:
        print(f"warning: Yahoo benchmark refresh failed for {benchmark_symbol}: {exc}")
        bench_rows = []
    merged_bench = merge_rows(existing_bench, bench_rows)

    # TWSE official index history is the same-day date/OHLC authority.
    # Yahoo remains useful for historical backfill and benchmark volume.
    official_bench_rows = fetch_twse_benchmark_rows()
    if not bench_rows and not official_bench_rows:
        raise RuntimeError("Neither Yahoo nor TWSE returned benchmark rows; refusing cached-only publication")
    benchmark_source = "yahoo-fallback"
    if official_bench_rows:
        existing_by_date = {r["date"]: r for r in merged_bench}
        for row in official_bench_rows:
            if row["date"] in existing_by_date:
                row["volume"] = int(existing_by_date[row["date"]].get("volume") or 0)
        merged_bench = merge_rows(merged_bench, official_bench_rows)
        benchmark_source = "twse-official"

    history["benchmark"] = {"symbol": benchmark_symbol, "rows": merged_bench}
    latest_market_date = history["benchmark"]["rows"][-1]["date"]
    print(f"benchmark latest date: {latest_market_date}; bootstrap={bootstrap}; source={benchmark_source}")

    tickers = {}
    for sector in config["sectors"]:
        for stock in sector.get("stocks", []):
            tickers[stock["ticker"]] = stock

    official = fetch_official_snapshot()
    stocks_hist = history.setdefault("stocks", {})

    for index, ticker in enumerate(sorted(tickers)):
        entry = stocks_hist.get(ticker) or {}
        symbol = entry.get("symbol")
        if not symbol:
            symbol = resolve_symbol(ticker)
            print(f"resolved {ticker} -> {symbol}")
        old_rows = entry.get("rows") or []
        try:
            recent = yahoo_rows(symbol, yahoo_days)
        except Exception as exc:
            print(f"warning: Yahoo refresh failed for {ticker}: {exc}")
            recent = []
        # Preserve a bad current row for explicit reconciliation, but do not
        # overwrite valid historical observations with incomplete backfill.
        rows = merge_stock_rows(ticker, old_rows, recent, latest_market_date)

        # Only explicitly dated snapshots can reconcile the benchmark date.
        # Missing or malformed source dates never inherit today's date.
        snap = official.get(ticker)
        snap_date = snap.get("date") if snap else None
        if snap and snap_date == latest_market_date:
            # A valid official row has precedence, but an invalid snapshot
            # cannot destroy a complete exact-date Yahoo/cached observation.
            rows = merge_stock_rows(ticker, rows, [dict(snap)], latest_market_date)
        elif snap:
            print(f"warning: skip official snapshot {ticker}: snapshot={snap_date} benchmark={latest_market_date}")
        rows = reconcile_current_stock_row(ticker, symbol, rows, latest_market_date)
        stocks_hist[ticker] = {"symbol": symbol, "rows": rows}
        if index % 6 == 5:
            time.sleep(0.25)

    history["updated_at"] = datetime.now(TAIPEI).isoformat(timespec="seconds")
    history["market_date"] = latest_market_date
    write_json(HISTORY_PATH, history)
    return history


def median(values):
    vals = [v for v in values if v is not None and math.isfinite(v)]
    return statistics.median(vals) if vals else None


def percentile_map(values_by_key):
    valid = sorted((v, k) for k, v in values_by_key.items() if v is not None and math.isfinite(v))
    if not valid:
        return {k: 50.0 for k in values_by_key}
    if len(valid) == 1:
        return {valid[0][1]: 50.0}
    out = {}
    for rank, (_, key) in enumerate(valid):
        out[key] = 100.0 * rank / (len(valid) - 1)
    for key in values_by_key:
        out.setdefault(key, 50.0)
    return out


def rows_map(rows):
    return {r["date"]: r for r in rows}


def trailing_values(date, dates, rowmap, n, field="close"):
    try:
        idx = dates.index(date)
    except ValueError:
        return []
    selected = dates[max(0, idx - n + 1): idx + 1]
    return [rowmap[d][field] for d in selected if d in rowmap and rowmap[d].get(field) is not None]


def stock_metrics(entry, date, bench_dates):
    rm = rows_map(entry.get("rows") or [])
    if date not in rm:
        return None
    closes20 = trailing_values(date, bench_dates, rm, 20)
    closes60 = trailing_values(date, bench_dates, rm, 60)
    closes120 = trailing_values(date, bench_dates, rm, 120)
    if len(closes60) < 55 or len(closes20) < 18:
        return None
    close = rm[date]["close"]
    r20 = close / closes20[0] - 1 if closes20[0] else None
    r60 = close / closes60[0] - 1 if closes60[0] else None
    ma20 = sum(closes20) / len(closes20)
    ma60 = sum(closes60) / len(closes60)
    previous20 = closes20[:-1] if len(closes20) > 1 else closes20
    high20 = max(previous20) if previous20 else close
    volumes20 = trailing_values(date, bench_dates, rm, 20, "volume")
    volumes120 = trailing_values(date, bench_dates, rm, 120, "volume")
    values20 = [c * v for c, v in zip(closes20[-len(volumes20):], volumes20)] if volumes20 else []
    values120 = [c * v for c, v in zip(closes120[-len(volumes120):], volumes120)] if volumes120 else []
    avg20 = sum(values20) / len(values20) if values20 else 0
    avg120 = sum(values120) / len(values120) if values120 else 0
    heat = avg20 / avg120 if avg120 > 0 else 1.0
    return {
        "close": close, "r20": r20, "r60": r60, "ma20": ma20, "ma60": ma60,
        "high20": high20, "heat": heat, "above20": close > ma20,
    }


def classify_stock(m):
    if not m:
        return "資料不足"
    close, ma20, ma60, high20 = m["close"], m["ma20"], m["ma60"], m["high20"]
    extension = close / ma20 - 1 if ma20 else 0
    dist_high = high20 / close - 1 if close else 1
    if close < ma60:
        return "轉弱"
    if extension > 0.14:
        return "過熱"
    if close >= high20 or dist_high <= 0.025:
        return "READY"
    if close > ma20 and (m["r20"] or 0) > 0.05:
        return "推進中"
    if close > ma20:
        return "改善中"
    return "整理中"


def build_rotation(config, history):
    bench_rows = history["benchmark"]["rows"]
    bench_map = rows_map(bench_rows)
    bench_dates = [r["date"] for r in bench_rows]
    stocks_hist = history["stocks"]

    usable_dates = bench_dates[-100:]
    strength_history = {s["id"]: {} for s in config["sectors"]}
    day_stock_metrics = {}

    for date in usable_dates:
        bench_closes20 = trailing_values(date, bench_dates, bench_map, 20)
        bench_closes60 = trailing_values(date, bench_dates, bench_map, 60)
        if len(bench_closes60) < 55 or len(bench_closes20) < 18:
            continue
        bench_close = bench_map[date]["close"]
        bench_r20 = bench_close / bench_closes20[0] - 1
        bench_r60 = bench_close / bench_closes60[0] - 1
        day_stock_metrics[date] = {}

        for sector in config["sectors"]:
            metrics = []
            for stock in sector.get("stocks", []):
                ticker = stock["ticker"]
                entry = stocks_hist.get(ticker)
                if not entry:
                    continue
                m = stock_metrics(entry, date, bench_dates)
                if m:
                    metrics.append(m)
                    day_stock_metrics[date][ticker] = m
            sector_r20 = median([m["r20"] for m in metrics])
            sector_r60 = median([m["r60"] for m in metrics])
            if sector_r20 is None or sector_r60 is None:
                strength = None
            else:
                strength = .60 * (sector_r20 - bench_r20) + .40 * (sector_r60 - bench_r60)
            strength_history[sector["id"]][date] = strength

    valid_dates = [d for d in usable_dates if d in day_stock_metrics]
    positions = {s["id"]: [] for s in config["sectors"]}

    for i, date in enumerate(valid_dates):
        strengths = {s["id"]: strength_history[s["id"]].get(date) for s in config["sectors"]}
        xmap = percentile_map(strengths)
        momentum = {}
        for sector in config["sectors"]:
            sid = sector["id"]
            now = strengths.get(sid)
            prev_date = valid_dates[i - 5] if i >= 5 else None
            prev = strength_history[sid].get(prev_date) if prev_date else None
            momentum[sid] = now - prev if now is not None and prev is not None else None
        ymap = percentile_map(momentum)
        for sector in config["sectors"]:
            sid = sector["id"]
            if strengths.get(sid) is not None:
                positions[sid].append({"date": date, "x": round(xmap[sid], 2), "y": round(ymap[sid], 2)})

    latest_date = history["market_date"]
    out_sectors = []
    label_overrides = {
        "LIQUID_COOLING": "液冷", "SERVER_DRAM": "DRAM", "AI_ODM": "ODM", "HVDC_800V": "800V"
    }

    for sector in config["sectors"]:
        sid = sector["id"]
        path_entries = positions[sid][-60:]
        if len(path_entries) < 5:
            continue
        latest_metrics = []
        stocks_out = []
        for stock in sector.get("stocks", []):
            ticker = stock["ticker"]
            m = day_stock_metrics.get(latest_date, {}).get(ticker)
            if m:
                latest_metrics.append(m)
            stocks_out.append({
                "ticker": ticker,
                "name": stock.get("name", ticker),
                "role": stock.get("role", "Candidate"),
                "state": classify_stock(m),
            })
        heat = median([m["heat"] for m in latest_metrics]) or 1.0
        breadth = 100.0 * sum(1 for m in latest_metrics if m["above20"]) / len(latest_metrics) if latest_metrics else 0
        out_sectors.append({
            "id": sid,
            "label": label_overrides.get(sid, sector.get("name", sid).split()[0]),
            "heat": round(max(.5, min(2.5, heat)), 2),
            "breadth": round(breadth),
            "stocks": stocks_out,
            "dates": [p["date"] for p in path_entries],
            "path": [[p["x"], p["y"]] for p in path_entries],
        })

    rotation = {
        "updated_at": latest_date,
        "generated_at": datetime.now(TAIPEI).isoformat(timespec="seconds"),
        "source": "twse-index+yahoo-history+twse-tpex-daily",
        "benchmark": "TWII",
        "window_default": 10,
        "formula": {
            "x": "cross-sectional percentile of 60% RS20 + 40% RS60 vs TWII",
            "y": "cross-sectional percentile of 5-trading-day change in relative strength",
            "heat": "median 20D traded-value proxy / 120D traded-value proxy",
            "breadth": "% constituents above MA20",
        },
        "sectors": out_sectors,
    }
    return rotation


def main():
    config = read_json(CONFIG_PATH)
    if not config or not config.get("sectors"):
        raise RuntimeError("config/sectors.json is empty")
    history = update_history(config)
    rotation = build_rotation(config, history)
    if len(rotation["sectors"]) < 3:
        raise RuntimeError("rotation build produced too few sectors")
    write_json(ROTATION_PATH, rotation)
    ROTATION_JS_PATH.parent.mkdir(parents=True, exist_ok=True)
    ROTATION_JS_PATH.write_text("window.__RADAR_DATA__ = " + json.dumps(rotation, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print(f"wrote {ROTATION_PATH} and {ROTATION_JS_PATH}; sectors={len(rotation['sectors'])}")


if __name__ == "__main__":
    main()
