"""Build a read-only, five-trading-session market-change view for Pages."""
import json
from pathlib import Path

def build_timeline(trading_dates, snapshots):
    days=sorted(set(trading_dates))[-5:]
    window=set(days)
    groups={}
    available=[]
    empty_days=[]
    for snap in sorted(snapshots,key=lambda s:(s.get("as_of",""),s.get("_path",""))):
        date=snap.get("as_of")
        if date not in window: continue
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
        s["_path"]=str(p.relative_to(root))
        snapshots.append(s)
    out=build_timeline(dates,snapshots)
    # Build artifact only: no history, price, regime or source-state writes.
    (root/"state/theme-change-timeline.json").write_text(json.dumps(out,ensure_ascii=False,indent=2)+"\n")
if __name__=="__main__": main()
