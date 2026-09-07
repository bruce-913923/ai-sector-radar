#!/usr/bin/env python3
import json
import math
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
TWSE_DAILY = "https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL"
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
    if v is None:
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
    for i, ts in enumerate(timestamps):
        close = closes[i] if i < len(closes) else None
        if close is None:
            continue
        dt = datetime.fromtimestamp(ts, timezone.utc).astimezone(TAIPEI)
        out.append({
            "date": dt.strftime("%Y-%m-%d"),
            "open": round(float(opens[i] if i < len(opens) and opens[i] is not None else close), 4),
            "high": round(float(highs[i] if i < len(highs) and highs[i] is not None else close), 4),
            "low": round(float(lows[i] if i < len(lows) and lows[i] is not None else close), 4),
            "close": round(float(close), 4),
            "volume": int(volumes[i] if i < len(volumes) and volumes[i] is not None else 0),
        })
    return out


def resolve_symbol(ticker):
    errors = []
    for suffix in (".TW", ".TWO"):
        symbol = f"{ticker}{suffix}"
        try:
            rows = yahoo_rows(symbol, 35)
            if len(rows) >= 5:
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
            for rec in payload if isinstance(payload, list) else []:
                ticker = str(pick(rec, ["Code", "SecuritiesCompanyCode", "股票代號", "代號"]) or "").strip()
                if not ticker.isdigit():
                    continue
                close = num(pick(rec, ["ClosingPrice", "Close", "收盤價", "ClosePrice"]))
                if close is None or close <= 0:
                    continue
                result[ticker] = {
                    "market": market,
                    "open": num(pick(rec, ["OpeningPrice", "Open", "開盤價"])) or close,
                    "high": num(pick(rec, ["HighestPrice", "High", "最高價"])) or close,
                    "low": num(pick(rec, ["LowestPrice", "Low", "最低價"])) or close,
                    "close": close,
                    "volume": int(num(pick(rec, ["TradeVolume", "TradingShares", "成交股數", "Volume"])) or 0),
                }
        except Exception as exc:
            print(f"warning: official {market} snapshot unavailable: {exc}")
    return result


def update_history(config):
    history = read_json(HISTORY_PATH, {"benchmark": {}, "stocks": {}})
    benchmark = history.get("benchmark") or {}
    benchmark_symbol = benchmark.get("symbol") or "^TWII"
    existing_bench = benchmark.get("rows") or []

    bootstrap = len(existing_bench) < 120
    yahoo_days = 430 if bootstrap else 30
    bench_rows = yahoo_rows(benchmark_symbol, yahoo_days)
    history["benchmark"] = {"symbol": benchmark_symbol, "rows": merge_rows(existing_bench, bench_rows)}
    latest_market_date = history["benchmark"]["rows"][-1]["date"]
    print(f"benchmark latest date: {latest_market_date}; bootstrap={bootstrap}")

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
        rows = merge_rows(old_rows, recent)

        # Official TWSE/TPEx snapshot is used as a same-day reconciliation layer.
        # Yahoo remains the date authority so holidays do not create fake rows.
        if rows and ticker in official and rows[-1]["date"] == latest_market_date:
            snap = official[ticker]
            rows[-1] = {
                "date": latest_market_date,
                "open": round(float(snap["open"]), 4),
                "high": round(float(snap["high"]), 4),
                "low": round(float(snap["low"]), 4),
                "close": round(float(snap["close"]), 4),
                "volume": int(snap["volume"]),
            }
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
        "source": "yahoo-history+twse-tpex-daily",
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
