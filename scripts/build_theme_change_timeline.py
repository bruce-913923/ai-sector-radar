"""Build a read-only, five-trading-session market-change view for Pages."""
import json
from pathlib import Path

def normalize_snapshot(raw, path):
    """Accept historical theme-map wrappers used by 2026-10-05..07 snapshots."""
    market = raw.get("market_theme_map") or raw.get("map") or raw
    themes = market.get("themes", []) if isinstance(market, dict) else []
    changes = list(raw.get("material_changes") or market.get("material_changes") or []) if isinstance(market, dict) else []
    if not changes:
        # Derive only explicit status transitions; do not invent events from price alone.
        for theme in themes:
            previous, current = theme.get("previous_status"), theme.get("status")
            if previous and current and previous != current:
                changes.append({"theme_id": theme.get("id"), "from": previous, "to": current,
                                "direction": theme.get("direction"), "reason": "status transition in snapshot"})
    return {"as_of": str(raw.get("as_of") or market.get("as_of") or "")[:10],
            "themes": themes, "material_changes": changes, "_path": path}

def build_timeline(trading_dates, snapshots):
    days=sorted(set(trading_dates))[-5:]
    window=set(days)
    groups={}
    available=[]
    empty_days=[]
    # History is append-only. If a same-day correction snapshot exists, retain
    # only the latest path for that normalized market date; otherwise a stale
    # earlier snapshot would leak false transitions into the timeline.
    latest_by_date={}
    for snap in snapshots:
        date=snap.get("as_of")
        if date not in window: continue
        prior=latest_by_date.get(date)
        key=lambda item: (1 if item.get("snapshot_role") == "correction" else 0, str(item.get("_path","")))
        if prior is None or key(snap) > key(prior):
            latest_by_date[date]=snap
    for snap in sorted(latest_by_date.values(),key=lambda s:(s.get("as_of",""),s.get("_path",""))):
        date=snap.get("as_of")
        available.append(date)
        changes=snap.get("material_changes")
        if changes is None:
            # Initial full snapshot is a baseline, not a claimed change.
            changes=[dict(theme_id=t.get("id"),to=t.get("status"),baseline=True,reason="初始市場狀態紀錄，不能視為當日升級或改善") for t in snap.get("themes",[])]
        if not changes: empty_days.append(date)
        for c in changes:
            tid=c.get("theme_id") or c.get("id")
            if not tid: continue
            event=dict(date=date,from_status=c.get("from"),to_status=c.get("to"),direction=c.get("direction"),reason=c.get("reason") or c.get("detail") or "",baseline=bool(c.get("baseline")),source=snap.get("_path"))
            g=groups.setdefault(tid,dict(theme_id=tid,events=[]))
            # Repeated prose and unchanged state do not become fresh improvements.
            signature=lambda e:(e["from_status"],e["to_status"],e["direction"],e["reason"],e["baseline"])
            if any(signature(e)==signature(event) for e in g["events"]): continue
            g["events"].append(event)
    result=[]
    for g in groups.values():
        events=g["events"]
        changes=[e for e in events if not e["baseline"]]
        directions={e["direction"] for e in changes if e["direction"] in ("↑","↓")}
        g.update(first_date=(changes or events)[0]["date"],latest_date=(changes or events)[-1]["date"],material_change_count=len(changes),has_reversal=len(directions)>1)
        result.append(g)
    result.sort(key=lambda g:(g["latest_date"],g["material_change_count"]),reverse=True)
    return dict(schema_version="1.0",market_as_of=days[-1] if days else None,trading_dates=days,available_snapshot_dates=sorted(set(available)),missing_snapshot_dates=[d for d in days if d not in available],snapshot_dates_without_material_changes=sorted(set(empty_days)),themes=result)

def main():
    root=Path(__file__).resolve().parents[1]
    history=json.loads((root/"data/market_history.json").read_text())
    dates=[r["date"] for r in history["benchmark"]["rows"]]
    snapshots=[]
    for p in sorted((root/"history/theme-map").glob("*.json")):
        s=json.loads(p.read_text())
        snapshots.append(normalize_snapshot(s, str(p.relative_to(root))))
    out=build_timeline(dates,snapshots)
    # Build artifact only: no history, price, regime or source-state writes.
    (root/"state/theme-change-timeline.json").write_text(json.dumps(out,ensure_ascii=False,indent=2)+"\n")
if __name__=="__main__": main()
