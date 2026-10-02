#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HISTORY_PATH = ROOT / "data" / "market_history.json"
CONFIG_PATH = ROOT / "config" / "market-regime.json"
STATE_PATH = ROOT / "state" / "market-regime.json"
HISTORY_DIR = ROOT / "history" / "market-regime"


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


def ma_at(rows, index, window):
    if index - window + 1 < 0:
        return None
    values = [float(r["close"]) for r in rows[index - window + 1:index + 1]]
    return sum(values) / len(values)


def pct_change(now, prev):
    if now is None or prev in (None, 0):
        return None
    return now / prev - 1.0


def indicators_at(rows, index, slope_window=5, previous_low_window=20):
    if index < 65:
        return None
    row = rows[index]
    close = float(row["close"])
    ma10 = ma_at(rows, index, 10)
    ma20 = ma_at(rows, index, 20)
    ma60 = ma_at(rows, index, 60)

    prev_index = index - slope_window
    ma10_prev = ma_at(rows, prev_index, 10)
    ma20_prev = ma_at(rows, prev_index, 20)
    ma60_prev = ma_at(rows, prev_index, 60)

    prev_low_slice = rows[max(0, index - previous_low_window):index]
    previous_low = min(float(r["low"]) for r in prev_low_slice) if prev_low_slice else None
    high5 = max(float(r["high"]) for r in rows[max(0, index - 4):index + 1])

    return {
        "date": row["date"],
        "open": float(row["open"]),
        "high": float(row["high"]),
        "low": float(row["low"]),
        "close": close,
        "previous_close": float(rows[index - 1]["close"]),
        "ma10": ma10,
        "ma20": ma20,
        "ma60": ma60,
        "ma10_change_5d": pct_change(ma10, ma10_prev),
        "ma20_change_5d": pct_change(ma20, ma20_prev),
        "ma60_change_5d": pct_change(ma60, ma60_prev),
        "previous_low_20d": previous_low,
        "high_max_5d": high5,
        "close_to_ma60_gap": pct_change(close, ma60),
    }


def bear_setups(ind):
    if not ind:
        return {"S1": False, "S2": False, "S3": False}
    c = ind["close"]
    ma20, ma60 = ind["ma20"], ind["ma60"]
    m20c, m60c = ind["ma20_change_5d"], ind["ma60_change_5d"]
    s1 = (
        ma20 > ma60
        and ma60 < c < ma20
        and m20c is not None and m20c < 0.01
        and ind["high_max_5d"] >= ma20 * 0.98
        and ind["close_to_ma60_gap"] is not None and ind["close_to_ma60_gap"] >= 0.03
    )
    s2 = (
        c < ma60
        and m60c is not None and m60c < 0.003
        and m20c is not None and m20c < 0.005
    )
    s3 = (
        ma60 > ma20
        and c < ma20
        and m20c is not None and m20c < 0
    )
    return {"S1": s1, "S2": s2, "S3": s3}


def pending_gate(ind, setups):
    return (
        any(setups.values())
        and ind["close"] < ind["previous_close"]
        and ind["close"] < ind["ma10"]
    )


def base_regime(ind):
    c = ind["close"]
    ma10, ma20, ma60 = ind["ma10"], ind["ma20"], ind["ma60"]
    m10c, m20c, m60c = ind["ma10_change_5d"], ind["ma20_change_5d"], ind["ma60_change_5d"]
    broke_previous_low = ind["previous_low_20d"] is not None and c < ind["previous_low_20d"]

    strong_bull = (
        c > ma10 > ma20 > ma60
        and m10c is not None and m10c > 0
        and m20c is not None and m20c > 0
        and m60c is not None and m60c >= 0
    )
    bull = (
        ma20 > ma60
        and c > ma20
        and m20c is not None and m20c >= 0
    )
    bearish_structure = (
        (c < ma60 and m20c is not None and m20c < 0)
        or (ma20 < ma60 and c < ma20 and m20c is not None and m20c < 0)
        or (broke_previous_low and c < ma20)
    )

    if bearish_structure:
        return "Bear"
    if strong_bull:
        return "Strong Bull"
    if bull:
        return "Bull"
    return "Range"


def round_or_none(value, digits=4):
    return None if value is None else round(float(value), digits)


def material_fingerprint(state):
    bear = state.get("bear_phase") or {}
    signals = state.get("signals") or {}
    return {
        "regime": state.get("regime"),
        "risk_budget_cap": state.get("risk_budget_cap"),
        "pending_gate": bear.get("pending_gate"),
        "confirmed_gate": bear.get("confirmed_gate"),
        "confirmed_phases": bear.get("confirmed_phases") or [],
        "broke_previous_low": signals.get("broke_previous_low"),
    }


def classify_indicators(ind, prev_ind):
    setups = bear_setups(ind)
    prev_setups = bear_setups(prev_ind)
    is_pending = pending_gate(ind, setups)
    prev_pending = pending_gate(prev_ind, prev_setups) if prev_ind else False
    confirmed_phases = [phase for phase, active in prev_setups.items() if active] if prev_pending and ind["open"] <= prev_ind["ma10"] else []
    confirmed = bool(confirmed_phases)

    base = base_regime(ind)
    regime = "Bear" if confirmed or base == "Bear" else ("Range" if is_pending and base in {"Strong Bull", "Bull"} else base)

    return setups, is_pending, confirmed_phases, confirmed, base, regime


def main():
    history = read_json(HISTORY_PATH)
    config = read_json(CONFIG_PATH)
    if not history or not config:
        raise RuntimeError("market history or market-regime config is missing")

    benchmark = history.get("benchmark") or {}
    rows = benchmark.get("rows") or []
    if len(rows) < 70:
        raise RuntimeError(f"insufficient TWII history rows: {len(rows)}")

    latest_index = len(rows) - 1
    slope_window = int(config.get("slope_window", 5))
    previous_low_window = int(config.get("previous_low_window", 20))
    ind = indicators_at(rows, latest_index, slope_window, previous_low_window)
    prev_ind = indicators_at(rows, latest_index - 1, slope_window, previous_low_window)

    setups, is_pending, confirmed_phases, confirmed, base, regime = classify_indicators(ind, prev_ind)

    risk_map = config["risk_budget_cap"]
    leverage_map = config["leverage_allowed"]
    hedge_map = config["hedge_bias"]

    old = read_json(STATE_PATH, {}) or {}
    # Compare with the prior trading row, not the last invocation's cached state.
    # Repeated same-day runs must not erase the daily transition.
    prior_ind = indicators_at(rows, latest_index - 2, slope_window, previous_low_window)
    previous_regime = classify_indicators(prev_ind, prior_ind)[-1]
    old_as_of = prev_ind["date"]
    change = f"{previous_regime} -> {regime}" if previous_regime != regime else "unchanged"

    broke_previous_low = ind["previous_low_20d"] is not None and ind["close"] < ind["previous_low_20d"]
    all_mas_bullish = ind["close"] > ind["ma10"] > ind["ma20"] > ind["ma60"]

    state = {
        "schema_version": "1.0",
        "as_of": ind["date"],
        "previous_as_of": old_as_of,
        "market": "TW",
        "benchmark": benchmark.get("symbol") or config.get("benchmark_symbol") or "^TWII",
        "regime": regime,
        "base_regime": base,
        "risk_budget_cap": risk_map[regime],
        "leverage_allowed": leverage_map[regime],
        "hedge_bias": hedge_map[regime],
        "change": change,
        "signals": {
            "open": round_or_none(ind["open"], 2),
            "high": round_or_none(ind["high"], 2),
            "low": round_or_none(ind["low"], 2),
            "close": round_or_none(ind["close"], 2),
            "ma10": round_or_none(ind["ma10"], 2),
            "ma20": round_or_none(ind["ma20"], 2),
            "ma60": round_or_none(ind["ma60"], 2),
            "ma10_change_5d": round_or_none(ind["ma10_change_5d"], 6),
            "ma20_change_5d": round_or_none(ind["ma20_change_5d"], 6),
            "ma60_change_5d": round_or_none(ind["ma60_change_5d"], 6),
            "previous_low_20d": round_or_none(ind["previous_low_20d"], 2),
            "broke_previous_low": broke_previous_low,
            "all_mas_bullish": all_mas_bullish
        },
        "bear_phase": {
            "current_setups": [phase for phase, active in setups.items() if active],
            "setup_flags": setups,
            "trigger_day_down": ind["close"] < ind["previous_close"],
            "close_below_ma10": ind["close"] < ind["ma10"],
            "pending_gate": is_pending,
            "confirmed_gate": confirmed,
            "confirmed_phases": confirmed_phases,
            "s1_gap_value": round_or_none(ind["close_to_ma60_gap"], 6)
        },
        "source": {
            "market_history": "data/market_history.json",
            "config": "config/market-regime.json",
            "methodology": "docs/market-regime.md",
            "calculator": "scripts/update_market_regime.py"
        },
        "notes": "Risk budget cap is a maximum exposure policy; it is not a required position size."
    }

    changed = material_fingerprint(old) != material_fingerprint(state)
    write_json(STATE_PATH, state)

    if changed:
        HISTORY_DIR.mkdir(parents=True, exist_ok=True)
        snapshot = HISTORY_DIR / f"{ind['date']}.json"
        if not snapshot.exists():
            write_json(snapshot, state)
            print(f"wrote regime history snapshot {snapshot.name}")
        else:
            print(f"material change detected but same-day history snapshot already exists: {snapshot.name}")

    print(f"market regime {ind['date']}: {regime}; base={base}; risk_cap={risk_map[regime]:.0%}; pending={is_pending}; confirmed={confirmed}")


if __name__ == "__main__":
    main()
