#!/usr/bin/env python3
import time
from datetime import datetime
from zoneinfo import ZoneInfo

from update_data import (
    CONFIG_PATH,
    HISTORY_PATH,
    merge_rows,
    read_json,
    resolve_symbol,
    write_json,
    yahoo_rows,
)

TAIPEI = ZoneInfo("Asia/Taipei")
MIN_HISTORY_ROWS = 120
BACKFILL_DAYS = 430


def main():
    config = read_json(CONFIG_PATH, {"sectors": []})
    history = read_json(HISTORY_PATH, {"benchmark": {}, "stocks": {}})
    stocks_hist = history.setdefault("stocks", {})

    tickers = {}
    for sector in config.get("sectors", []):
        for stock in sector.get("stocks", []):
            tickers[stock["ticker"]] = stock

    changed = 0
    for index, ticker in enumerate(sorted(tickers)):
        entry = stocks_hist.get(ticker) or {}
        old_rows = entry.get("rows") or []
        if len(old_rows) >= MIN_HISTORY_ROWS:
            continue

        try:
            symbol = entry.get("symbol") or resolve_symbol(ticker)
            rows = yahoo_rows(symbol, BACKFILL_DAYS)
            merged = merge_rows(old_rows, rows)
            stocks_hist[ticker] = {"symbol": symbol, "rows": merged}
            changed += 1
            print(f"backfilled {ticker} -> {symbol}: {len(old_rows)} -> {len(merged)} rows")
        except Exception as exc:
            # Keep the whole radar alive if one newly listed symbol is temporarily unavailable.
            print(f"warning: could not backfill {ticker}: {exc}")

        if index % 5 == 4:
            time.sleep(0.3)

    if changed:
        history["updated_at"] = datetime.now(TAIPEI).isoformat(timespec="seconds")
        write_json(HISTORY_PATH, history)
    print(f"backfill complete; changed={changed}; configured_tickers={len(tickers)}")


if __name__ == "__main__":
    main()
