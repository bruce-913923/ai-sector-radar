#!/usr/bin/env python3
"""Theme turn-strong radar analytics for the market dashboard.

Builds data/latest/cycle.json from the raw OHLCV history so the market page
only renders. Everything is recomputed from scratch on each run with the same
relative-strength definitions as scripts/update_data.py. Probabilities are
in-sample frequencies over the available history and always ship with their
sample size; they describe the past, not a forecast guarantee.
"""
import json
import statistics
from datetime import datetime

from update_data import (
    CONFIG_PATH,
    HISTORY_PATH,
    ROOT,
    TAIPEI,
    classify_stock,
    median,
    percentile_map,
    read_json,
    rows_map,
    stock_metrics,
    trailing_values,
)

CYCLE_PATH = ROOT / "data" / "latest" / "cycle.json"

SMOOTH_DAYS = 3        # trailing average before classifying; removes one-day flicker
STRONG_LINE = 50       # relative-strength percentile; at or above = beating most themes
NEAR_LINE = 40         # lower bound of "approaching the strong line"
NEAR_RISE = 5          # minimum 5-day rise in relative strength to count as approaching
MOMENTUM_HOT = 70      # momentum percentile that counts as turning up
LOOKBACK = 5           # days used for "5-day change"
TURN_HORIZON = 10      # a turn counts when it happens within this many days
MIN_WAVE_DAYS = 5      # a turn that lasts at least this long is a real turn
EXIT_HORIZON = 5       # exit risk = strong wave ends within this many days
EXIT_FADE_LINE = 60    # below this and falling = alert
EXIT_SAFE_LINE = 75    # at or above this, above MA20 and no constituent below MA60 = stable
LONG_BASE_DAYS = 40    # consolidation length that historically precedes longer waves
FIRM_MA20 = 0.03       # median close at least 3% above MA20 = firmly above the monthly line
BASE_MA20 = 0.05       # median close at least 5% above MA20 for the bottoming watch signal
OUTPUT_DAYS = 244      # about one trading year of daily series in the output
LEADER_BREAKOUT = {"READY", "推進中"}

TURN_LEVELS = ("ready", "brewing", "watch", "none")
QUALITY_LEVELS = ("weak", "normal", "strong")
EXIT_LEVELS = ("alert", "caution", "stable")


def smooth(values, days=SMOOTH_DAYS):
    out = []
    for i in range(len(values)):
        window = values[max(0, i - days + 1): i + 1]
        out.append(sum(window) / len(window))
    return out


def phase(x, y):
    """L = strong, W = fading (still strong), I = warming (still weak), G = cold."""
    if x >= STRONG_LINE:
        return "L" if y >= STRONG_LINE else "W"
    return "I" if y >= STRONG_LINE else "G"


def find_waves(xs, line=STRONG_LINE):
    """Return (start, end) index pairs where xs stays at or above line; end is exclusive."""
    waves, start = [], None
    for i, value in enumerate(xs):
        if start is None and value >= line:
            start = i
        elif start is not None and value < line:
            waves.append((start, i))
            start = None
    if start is not None:
        waves.append((start, len(xs)))
    return waves


def base_before(waves, index):
    """Days below the line before waves[index]; lower bound when no earlier wave is visible."""
    start = waves[index][0]
    if index == 0:
        return start, False
    return start - waves[index - 1][1], True


def personality(xs, waves):
    n = len(xs)
    above = sum(1 for v in xs if v >= STRONG_LINE) / n if n else 0
    done = [e - s for s, e in waves if s > 0 and e < n]
    med = statistics.median(done) if done else None
    breakout = False
    for i, (s, e) in enumerate(waves):
        base, _ = base_before(waves, i)
        if s > 0 and base >= LONG_BASE_DAYS and e - s >= 20:
            breakout = True
    if above >= 0.7:
        kind = "trend"
    elif breakout:
        kind = "breakout"
    elif len(waves) >= 5 and med is not None and med <= 7:
        kind = "choppy"
    elif above <= 0.3:
        kind = "weak"
    else:
        kind = "swing"
    return {
        "type": kind,
        "above_share": round(above * 100),
        "strong_waves": len(waves),
        "median_days": med,
        "history_days": n,
    }


def turn_level(xs, ys, i, ext20, weak_share):
    near = NEAR_LINE <= xs[i] < STRONG_LINE and xs[i] - xs[i - LOOKBACK] >= NEAR_RISE
    hot = ys[i] >= MOMENTUM_HOT
    if near and hot:
        return "ready"
    if near or hot:
        return "brewing" if ext20 is not None and ext20 >= FIRM_MA20 else "watch"
    if ext20 is not None and ext20 >= BASE_MA20 and weak_share == 0:
        return "watch"
    return "none"


def turn_quality(base_days, agg):
    checks = {
        "long_base": base_days >= LONG_BASE_DAYS,
        "firm_ma20": agg["ext20"] >= FIRM_MA20,
        "broad": agg["b20"] >= 0.75,
        "hot": agg["hot"] >= 0.5,
    }
    score = sum(checks.values())
    level = "weak" if score == 0 else "normal" if score <= 2 else "strong"
    return level, checks


def exit_level(xs, i, ext20, weak_share):
    x = xs[i]
    dx = x - xs[i - LOOKBACK]
    if (x < EXIT_FADE_LINE and dx < -5) or (ext20 < 0 and x < EXIT_FADE_LINE):
        return "alert"
    if x >= EXIT_SAFE_LINE and ext20 > 0 and weak_share == 0:
        return "stable"
    return "caution"


def theme_daily(config, history):
    """Daily cross-sectional RS / momentum percentiles plus per-theme constituent aggregates.

    Mirrors update_data.build_rotation over every date with enough benchmark history.
    """
    bench_rows = history["benchmark"]["rows"]
    bench_map = rows_map(bench_rows)
    bench_dates = [r["date"] for r in bench_rows]
    stocks_hist = history.get("stocks", {})
    sectors = config["sectors"]
    metric_cache = {}

    def metrics(ticker, date):
        key = (ticker, date)
        if key not in metric_cache:
            entry = stocks_hist.get(ticker)
            metric_cache[key] = stock_metrics(entry, date, bench_dates) if entry else None
        return metric_cache[key]

    dates, strength, aggs = [], {s["id"]: {} for s in sectors}, {s["id"]: {} for s in sectors}
    for date in bench_dates:
        b20 = trailing_values(date, bench_dates, bench_map, 20)
        b60 = trailing_values(date, bench_dates, bench_map, 60)
        if len(b60) < 55 or len(b20) < 18:
            continue
        close = bench_map[date]["close"]
        bench_r20, bench_r60 = close / b20[0] - 1, close / b60[0] - 1
        dates.append(date)
        for sector in sectors:
            pairs = [(stock, metrics(stock["ticker"], date)) for stock in sector.get("stocks", [])]
            pairs = [(stock, m) for stock, m in pairs if m]
            r20 = median([m["r20"] for _, m in pairs])
            r60 = median([m["r60"] for _, m in pairs])
            if r20 is None or r60 is None:
                strength[sector["id"]][date] = None
                continue
            strength[sector["id"]][date] = .60 * (r20 - bench_r20) + .40 * (r60 - bench_r60)
            count = len(pairs)
            states = [classify_stock(m) for _, m in pairs]
            leaders = [classify_stock(m) for stock, m in pairs if stock.get("role") == "Leader"]
            aggs[sector["id"]][date] = {
                "b20": sum(1 for _, m in pairs if m["above20"]) / count,
                "weak": sum(1 for _, m in pairs if m["close"] < m["ma60"]) / count,
                "ext20": median([m["close"] / m["ma20"] - 1 for _, m in pairs]),
                "hot": sum(1 for s in states if s == "過熱") / count,
                "heat": median([m["heat"] for _, m in pairs]),
                "leader": leaders[0] if leaders else None,
            }

    positions = {s["id"]: {} for s in sectors}
    for i, date in enumerate(dates):
        today = {sid: strength[sid].get(date) for sid in strength}
        xmap = percentile_map(today)
        momentum = {}
        for sid, now in today.items():
            prev = strength[sid].get(dates[i - LOOKBACK]) if i >= LOOKBACK else None
            momentum[sid] = now - prev if now is not None and prev is not None else None
        ymap = percentile_map(momentum)
        for sid, now in today.items():
            if now is not None:
                positions[sid][date] = (xmap[sid], ymap[sid])

    last = dates[-1] if dates else None
    stocks_now = {}
    for sector in sectors:
        rows = []
        for stock in sector.get("stocks", []):
            m = metrics(stock["ticker"], last) if last else None
            rows.append({
                "ticker": stock["ticker"],
                "name": stock.get("name", stock["ticker"]),
                "role": stock.get("role", "Member"),
                "state": classify_stock(m),
                "ext20": round((m["close"] / m["ma20"] - 1) * 100, 1) if m else None,
                "above_ma60": bool(m and m["close"] >= m["ma60"]),
            })
        stocks_now[sector["id"]] = rows
    return dates, positions, aggs, stocks_now


def analyse_theme(theme_dates, xy, aggs):
    """Smoothed series, waves and per-day aggregates for one theme (dates where it has data)."""
    xs = smooth([p[0] for p in xy])
    ys = smooth([p[1] for p in xy])
    return {
        "dates": theme_dates,
        "xs": xs,
        "ys": ys,
        "aggs": [aggs[d] for d in theme_dates],
        "waves": find_waves(xs),
    }


def _next_start(starts, t, horizon):
    for s in range(t + 1, t + horizon + 1):
        if s in starts:
            return s
    return None


def _rate(hits, total):
    return round(hits / total, 3) if total else None


def _duration_stats(days):
    if not days:
        return {"n": 0, "median_days": None, "fail_2d": None, "last_10d": None}
    return {
        "n": len(days),
        "median_days": statistics.median(days),
        "fail_2d": _rate(sum(1 for d in days if d <= 2), len(days)),
        "last_10d": _rate(sum(1 for d in days if d >= 10), len(days)),
    }


def collect_stats(analyses):
    turn = {lvl: {"n": 0, "hits": 0, "leads": []} for lvl in TURN_LEVELS}
    quality = {lvl: [] for lvl in QUALITY_LEVELS}
    exits = {lvl: {"n": 0, "hits": 0} for lvl in EXIT_LEVELS}
    all_waves, long_base = [], []
    for a in analyses:
        xs, ys, aggs, waves = a["xs"], a["ys"], a["aggs"], a["waves"]
        n = len(xs)
        starts = {s: e - s for s, e in waves if s > 0}
        for t in range(2 * LOOKBACK, n - TURN_HORIZON):
            if xs[t] >= STRONG_LINE:
                continue
            lvl = turn_level(xs, ys, t, aggs[t]["ext20"], aggs[t]["weak"])
            nxt = _next_start(starts, t, TURN_HORIZON)
            bucket = turn[lvl]
            bucket["n"] += 1
            if nxt is not None:
                bucket["leads"].append(nxt - t)
                if starts[nxt] >= MIN_WAVE_DAYS or nxt + starts[nxt] == n:
                    bucket["hits"] += 1
        for idx, (s, e) in enumerate(waves):
            if s == 0:
                continue
            if e < n:
                days = e - s
                all_waves.append(days)
                base, _ = base_before(waves, idx)
                if base >= LONG_BASE_DAYS:
                    long_base.append(days)
                if s >= 2 * LOOKBACK:
                    level, _ = turn_quality(base, aggs[s])
                    quality[level].append(days)
            for t in range(s + 2, min(e, n - EXIT_HORIZON)):
                lvl = exit_level(xs, t, aggs[t]["ext20"], aggs[t]["weak"])
                exits[lvl]["n"] += 1
                if e <= t + EXIT_HORIZON and e < n:
                    exits[lvl]["hits"] += 1
    return {
        "turn": {
            lvl: {
                "p": _rate(v["hits"], v["n"]),
                "n": v["n"],
                "lead_days": statistics.median(v["leads"]) if v["leads"] else None,
            }
            for lvl, v in turn.items()
        },
        "quality": {lvl: _duration_stats(days) for lvl, days in quality.items()},
        "exit": {lvl: {"p": _rate(v["hits"], v["n"]), "n": v["n"]} for lvl, v in exits.items()},
        "waves": _duration_stats(all_waves),
        "long_base": _duration_stats(long_base),
    }


def current_state(a):
    xs, ys, aggs, waves = a["xs"], a["ys"], a["aggs"], a["waves"]
    i = len(xs) - 1
    agg = aggs[i]
    prev_agg = aggs[i - LOOKBACK] if i >= LOOKBACK else agg
    state = {
        "rs": round(xs[i]),
        "rs_5d": round(xs[i] - xs[i - LOOKBACK]) if i >= LOOKBACK else None,
        "momentum": round(ys[i]),
        "phase": phase(xs[i], ys[i]),
        "ext20": round(agg["ext20"] * 100, 1),
        "breadth": round(agg["b20"] * 100),
        "breadth_5d": round((agg["b20"] - prev_agg["b20"]) * 100),
        "weak_share": round(agg["weak"] * 100),
        "hot_share": round(agg["hot"] * 100),
        "heat": round(agg["heat"], 2) if agg["heat"] is not None else None,
        "leader_breakout": agg["leader"] in LEADER_BREAKOUT,
        "strong": xs[i] >= STRONG_LINE,
    }
    if state["strong"]:
        idx = len(waves) - 1
        start = waves[idx][0]
        base, known = base_before(waves, idx)
        level, checks = turn_quality(base, aggs[start])
        start_agg = aggs[start]
        state["wave"] = {
            "day": i - start + 1,
            "start": a["dates"][start],
            "base_days": base,
            "base_known": known,
            "quality": level,
            "quality_checks": checks,
            "at_start": {
                "ext20": round(start_agg["ext20"] * 100, 1),
                "breadth": round(start_agg["b20"] * 100),
                "hot_share": round(start_agg["hot"] * 100),
            },
            "exit": exit_level(xs, i, agg["ext20"], agg["weak"]),
        }
    else:
        last_end = waves[-1][1] if waves else None
        state["base_days"] = i - last_end + 1 if last_end is not None else i + 1
        state["base_known"] = last_end is not None
        state["turn"] = turn_level(xs, ys, i, agg["ext20"], agg["weak"])
        state["near_line"] = NEAR_LINE <= xs[i] < STRONG_LINE and xs[i] - xs[i - LOOKBACK] >= NEAR_RISE
        state["momentum_hot"] = ys[i] >= MOMENTUM_HOT
    return state


def wave_list(a):
    n = len(a["xs"])
    out = []
    for idx, (s, e) in enumerate(a["waves"]):
        base, known = base_before(a["waves"], idx)
        out.append({
            "start": a["dates"][s],
            "end": a["dates"][e - 1] if e < n else None,
            "days": e - s,
            "complete": s > 0 and e < n,
            "base_days": base,
            "base_known": known,
        })
    return out


def aligned(values, theme_dates, out_dates, fmt):
    lookup = dict(zip(theme_dates, values))
    return [fmt(lookup[d]) if d in lookup else None for d in out_dates]


def build_cycle(config, history):
    dates, positions, aggs, stocks_now = theme_daily(config, history)
    group_of = {}
    for group in config.get("groups", []):
        for sid in group.get("sectors", []):
            group_of[sid] = group.get("id")
    out_dates = dates[-OUTPUT_DAYS:]
    analyses, themes = [], []
    for sector in config["sectors"]:
        sid = sector["id"]
        theme_dates = [d for d in dates if d in positions[sid]]
        if len(theme_dates) < 2 * LOOKBACK + 1:
            continue
        a = analyse_theme(theme_dates, [positions[sid][d] for d in theme_dates], aggs[sid])
        analyses.append(a)
        phases = [phase(x, y) for x, y in zip(a["xs"], a["ys"])]
        themes.append({
            "id": sid,
            "label": sector.get("label") or sector.get("name") or sid,
            "name": sector.get("name") or sid,
            "group": group_of.get(sid),
            "series": {
                "rs": aligned(a["xs"], theme_dates, out_dates, round),
                "momentum": aligned(a["ys"], theme_dates, out_dates, round),
                "phase": "".join(p or "-" for p in aligned(phases, theme_dates, out_dates, str)),
                "breadth": aligned([g["b20"] for g in a["aggs"]], theme_dates, out_dates, lambda v: round(v * 100)),
                "heat": aligned([g["heat"] for g in a["aggs"]], theme_dates, out_dates, lambda v: round(v, 2) if v is not None else None),
            },
            "personality": personality(a["xs"], a["waves"]),
            "waves": wave_list(a),
            "current": current_state(a),
            "stocks": stocks_now[sid],
        })
    return {
        "schema_version": "1.0",
        "updated_at": history.get("market_date") or (dates[-1] if dates else None),
        "generated_at": datetime.now(TAIPEI).isoformat(timespec="seconds"),
        "history_start": dates[0] if dates else None,
        "method": {
            "smooth_days": SMOOTH_DAYS,
            "strong_line": STRONG_LINE,
            "near_line": NEAR_LINE,
            "near_rise": NEAR_RISE,
            "momentum_hot": MOMENTUM_HOT,
            "turn_horizon": TURN_HORIZON,
            "min_wave_days": MIN_WAVE_DAYS,
            "exit_horizon": EXIT_HORIZON,
            "exit_fade_line": EXIT_FADE_LINE,
            "exit_safe_line": EXIT_SAFE_LINE,
            "long_base_days": LONG_BASE_DAYS,
            "firm_ma20_pct": FIRM_MA20 * 100,
        },
        "stats": collect_stats(analyses),
        "dates": out_dates,
        "themes": themes,
    }


def main():
    config = read_json(CONFIG_PATH)
    history = read_json(HISTORY_PATH)
    if not config or not history:
        raise RuntimeError("config/sectors.json or data/market_history.json missing")
    cycle = build_cycle(config, history)
    if len(cycle["themes"]) < 3:
        raise RuntimeError("cycle build produced too few themes")
    CYCLE_PATH.parent.mkdir(parents=True, exist_ok=True)
    CYCLE_PATH.write_text(json.dumps(cycle, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(f"wrote {CYCLE_PATH}; themes={len(cycle['themes'])}; days={len(cycle['dates'])}; as_of={cycle['updated_at']}")


if __name__ == "__main__":
    main()
