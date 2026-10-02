"""Fail-closed freshness checks; no regime calculation or generated-state writes."""
from datetime import date, datetime, timedelta
import math
from zoneinfo import ZoneInfo
import requests
from update_data import fetch_twse_benchmark_rows, normalize_market_date

CALENDAR_URL = "https://openapi.twse.com.tw/v1/holidaySchedule/holidaySchedule"


def expected_date(today, official_dates, calendar):
    dates = sorted(d for d in official_dates if d <= today.isoformat())
    if today.isoformat() in dates:
        return today.isoformat()
    if not dates:
        raise ValueError("Official TWSE trading history unavailable; cannot verify freshness")
    entries = {}
    for item in calendar or []:
        day = normalize_market_date(item.get("Date"))
        if day:
            entries.setdefault(day, []).append(str(item.get("Name", "")) + " " + str(item.get("Description", "")))
    if not any(d.startswith(str(today.year) + "-") for d in entries):
        raise ValueError("Official holiday calendar missing requested year; cannot assume holiday")
    cursor = today
    for _ in range(40):
        day = cursor.isoformat()
        if cursor.year != today.year:
            raise ValueError("Prior-year calendar required; refusing to guess across year boundary")
        descriptions = entries.get(day, [])
        closed = any(any(word in text for word in ("放假", "補假", "休市", "無交易")) for text in descriptions)
        explicitly_open = any("開始交易" in text or "最後交易" in text for text in descriptions)
        if descriptions and not closed and not explicitly_open:
            raise ValueError("Unrecognized official calendar entry for " + day)
        if not closed and (cursor.weekday() < 5 or explicitly_open):
            if day not in dates:
                raise ValueError("Expected trading date " + day + " absent from official index history; publication pending or closure unverified")
            return day
        cursor -= timedelta(days=1)
    raise ValueError("No verified recent trading date")


def verify(config, history, rotation, target):
    if history.get("market_date") != target or rotation.get("updated_at") != target:
        raise ValueError("Generated dates do not match expected official trading date " + target)
    configured = {str(stock["ticker"]) for sector in config["sectors"] for stock in sector.get("stocks", [])}
    missing, invalid = [], []
    for ticker in sorted(configured):
        rows = (history.get("stocks", {}).get(ticker) or {}).get("rows") or []
        matches = [row for row in rows if row.get("date") == target]
        if len(matches) != 1:
            missing.append(ticker)
            continue
        row = matches[0]
        values = [row.get(key) for key in ("open", "high", "low", "close")]
        if any(not isinstance(v, (int, float)) or not math.isfinite(v) or v <= 0 for v in values):
            invalid.append(ticker)
            continue
        open_, high, low, close = values
        if low > min(open_, close) or high < max(open_, close) or low > high:
            invalid.append(ticker)
        volume = row.get("volume")
        if not isinstance(volume, (int, float)) or not math.isfinite(volume) or volume < 0:
            invalid.append(ticker)
    if missing or invalid:
        raise ValueError("Per-stock validation failed: missing_or_duplicate=" + ",".join(missing) + "; invalid_ohlcv=" + ",".join(sorted(set(invalid))))
    return {"expected_market_date": target, "configured_stocks": len(configured), "fresh_stocks": len(configured)}


def verify_current(config, history, rotation):
    today = datetime.now(ZoneInfo("Asia/Taipei")).date()
    official_rows = fetch_twse_benchmark_rows()
    official_dates = {row["date"] for row in official_rows}
    calendar = []
    if today.isoformat() not in official_dates:
        response = requests.get(CALENDAR_URL, timeout=20)
        response.raise_for_status()
        calendar = response.json()
        if not isinstance(calendar, list):
            raise ValueError("Unexpected official holiday calendar schema")
    target = expected_date(today, official_dates, calendar)
    result = verify(config, history, rotation, target)
    print("official freshness and per-stock checks:", result)
    return result
