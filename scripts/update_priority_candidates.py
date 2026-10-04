#!/usr/bin/env python3
"""Deterministic technical candidates + separately sourced human/AI research gates.
No price downloads, no regime changes, no retroactive recommendations.
"""
import json
from datetime import datetime, timezone, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def read(path, default=None):
    p = ROOT / path
    return json.loads(p.read_text()) if p.exists() else default

def metrics(rows, benchmark):
    dates = [r["date"] for r in benchmark]
    bm = {r["date"]: float(r["close"]) for r in benchmark}
    indexes = {d: i for i, d in enumerate(dates)}
    rows = sorted((r for r in rows if r["date"] in bm), key=lambda r: r["date"])
    if len({r["date"] for r in rows}) != len(rows):
        raise ValueError("duplicate stock dates")
    out = []
    def ma(n, i):
        return sum(float(r["close"]) for r in rows[i-n+1:i+1]) / n
    for i in range(60, len(rows)):
        r = rows[i]
        bi = indexes[r["date"]]
        if bi < 5 or [x["date"] for x in rows[i-5:i+1]] != dates[bi-5:bi+1]:
            continue
        if not r.get("volume") or any(float(x["close"]) <= 0 for x in rows[i-30:i+1]):
            continue
        c = float(r["close"])
        avg = ma(20, i)
        high = max(float(x["close"]) for x in rows[i-20:i])
        cross = float(rows[i-1]["close"]) <= ma(20, i-1) and c > avg
        breakout = c > high and max(float(x["close"]) for x in rows[i-10:i]) <= max(float(x["close"]) for x in rows[i-30:i-10])
        out.append(dict(date=r["date"], close=c, ext=(c/avg-1)*100,
                        above60=c >= ma(60, i), rs5=(c/float(rows[i-5]["close"])-bm[r["date"]]/bm[dates[bi-5]])*100,
                        slope=avg-ma(20, i-3), cross=cross, breakout=breakout,
                        level=avg if cross else high))
    return out

def evaluate(ms, date, cfg):
    indexes = [i for i, m in enumerate(ms) if m["date"] == date]
    if not indexes:
        return dict(status="data_insufficient", reasons=["缺當日或必要歷史資料"])
    i = indexes[0]
    c = ms[i]
    reasons = []
    if c["ext"] < 0: reasons.append("月線下")
    if c["ext"] > cfg["max_ma20_extension_pct"]: reasons.append("超過月線乖離上限")
    if c["slope"] <= 0: reasons.append("月線未上行")
    if c["rs5"] <= cfg["min_relative_return_pct_point"]: reasons.append("近5日未贏大盤")
    if cfg["require_above_ma60"] and not c["above60"]: reasons.append("季線下")
    window = cfg["signal_window_trading_days"]
    events = [(j, m) for j, m in enumerate(ms[max(0,i-window+1):i+1], max(0,i-window+1)) if m["cross"] or m["breakout"]]
    event = events[-1] if events else None
    if event is None:
        reasons.append("近期無收復／整理突破訊號")
    else:
        j, e = event
        if i-j+1 < cfg["min_confirmation_sessions_including_trigger"]:
            reasons.append("尚未滿確認期")
        if any(m["close"] < e["level"] for m in ms[j:i+1]):
            reasons.append("未守住觸發基準")
    return dict(status="pass" if not reasons else "wait", reasons=reasons,
                close=c["close"], extension_pct=round(c["ext"],2), relative_5d_pp=round(c["rs5"],2),
                trigger_date=event[1]["date"] if event else None,
                trigger_level=round(event[1]["level"],4) if event else None,
                setup=("ma20_reclaim" if event[1]["cross"] else "consolidation_breakout") if event else None)

def gate(assessment, name, evaluated_date):
    g = (assessment or {}).get(name, {})
    if not g.get("sources") or not g.get("reviewed_at") or not g.get("valid_until"):
        return "unknown"
    if g["reviewed_at"][:10] > evaluated_date or g["valid_until"] < evaluated_date:
        return "unknown"
    return g.get("status", "unknown")

def classify(technical, assessment, evaluated_date):
    f, r = gate(assessment,"fundamental",evaluated_date), gate(assessment,"risk",evaluated_date)
    if f == "fail" or r == "block": return "deferred"
    if technical["status"] == "data_insufficient": return "data_insufficient"
    if f not in ("verified_improvement","leading_evidence") or r not in ("acceptable","caution"):
        return "research_pending"
    return "priority" if technical["status"] == "pass" else "waiting_signal"

def build(history, registry, cfg, assessments, previous=None, now=None):
    now = now or datetime.now(timezone.utc).isoformat()
    evaluated_date = datetime.fromisoformat(now.replace("Z","+00:00")).astimezone(timezone(timedelta(hours=8))).date().isoformat()
    benchmark = sorted(history["benchmark"]["rows"], key=lambda r:r["date"])
    date = benchmark[-1]["date"]
    if date > evaluated_date: raise ValueError("future market date")
    if len({r["date"] for r in benchmark}) != len(benchmark): raise ValueError("duplicate benchmark dates")
    universe = {}
    for theme in registry["themes"]:
        if theme.get("registry_status") != "tracked": continue
        for c in theme.get("companies",[]):
            item = universe.setdefault(str(c["ticker"]),dict(ticker=str(c["ticker"]),company_name=c["name"],theme_ids=[]))
            item["theme_ids"].append(theme["id"])
    assessment_map = {str(a["ticker"]): a for a in assessments.get("companies",[])}
    candidates=[]
    for ticker,item in sorted(universe.items()):
        rows=history.get("stocks",{}).get(ticker,{}).get("rows",[])
        technical=evaluate(metrics(rows,benchmark),date,cfg["technical"])
        a=assessment_map.get(ticker,{})
        candidates.append(dict(**item,technical=technical,fundamental=a.get("fundamental",{}),risk=a.get("risk",{}),
                               classification=classify(technical,a,evaluated_date)))
    # Recommendations are admitted only on a same-date live market evaluation.
    # Historical technical replay is not a historical recommendation.
    taipei_date=datetime.fromisoformat(now.replace("Z","+00:00")).astimezone(
        timezone(timedelta(hours=8))).date().isoformat()
    local_now=datetime.fromisoformat(now.replace("Z","+00:00")).astimezone(timezone(timedelta(hours=8)))
    live = taipei_date == date and assessments.get("as_of")==date and local_now.hour >= 15
    prior=(previous or {}).get("recommendation_history",[])
    days=[r["date"] for r in benchmark]
    keep=set(days[-int(cfg["display"]["lookback_trading_days"]):])
    hist=[x for x in prior if x.get("market_date") in keep]
    # Current state keeps the latest daily evaluation; every published revision is
    # separately archived append-only. No earlier trading day is regenerated.
    if live:
        qualified_today=[c["ticker"] for c in candidates if c["classification"]=="priority"]
        old_day=next((x for x in hist if x.get("market_date")==date),None)
        if old_day is None or old_day["tickers"] != qualified_today:
            hist=[x for x in hist if x.get("market_date")!=date]
            hist.append(dict(market_date=date,evaluated_at=now,tickers=qualified_today))
    first_dates=dict((previous or {}).get("first_qualified_dates",{}))
    for day in hist:
        for ticker in day["tickers"]:
            first_dates.setdefault(ticker,day["market_date"])
    weekly=[]
    today={c["ticker"]:c for c in candidates}
    for ticker in sorted({t for h in hist for t in h["tickers"]}):
        qualified=[h["market_date"] for h in hist if ticker in h["tickers"]]
        streak=0
        for d in reversed(days):
            match=next((h for h in hist if h["market_date"]==d),None)
            if match and ticker in match["tickers"]: streak+=1
            else: break
        old=next((x for x in (previous or {}).get("weekly",[]) if x["ticker"]==ticker),{})
        weekly.append(dict(ticker=ticker,company_name=today.get(ticker,{}).get("company_name",ticker),
                           first_qualified_date=first_dates.get(ticker,old.get("first_qualified_date",min(qualified))),
                           latest_qualified_date=max(qualified),consecutive_qualified_sessions=streak,
                           qualifies_today=live and today.get(ticker,{}).get("classification")=="priority",
                           current_status=today.get(ticker,{}).get("classification","data_insufficient")))
    return dict(schema_version="1.0",market_as_of=date,evaluated_at=now,
                mode="live" if live else "research_preview_not_backdated",
                criteria_status=cfg["status"],candidates=candidates,weekly=weekly,
                recommendation_history=hist,first_qualified_dates=first_dates,
                counts={k:sum(c["classification"]==k for c in candidates) for k in ("priority","waiting_signal","research_pending","deferred","data_insufficient")},
                limitations=["近5日名單保留真實發布紀錄，不由今天研究回填過去推薦。","技術門檻僅做密度測試，尚無樣本外獲利驗證。"])

def main():
    cfg=read("config/priority-screen-v1.json")
    previous=read("state/priority-candidates.json",{})
    data=build(read("data/market_history.json"),read("registry/themes.json"),cfg,
               read("state/priority-assessments.json",{"companies":[]}),previous)
    # No timestamp-only changes.
    comparable=lambda x:{k:v for k,v in x.items() if k!="evaluated_at"}
    if comparable(previous)==comparable(data): return
    p=ROOT/"state/priority-candidates.json"
    p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n")
    archive=ROOT/"history/priority-candidates"
    archive.mkdir(parents=True,exist_ok=True)
    name=datetime.now(timezone.utc).strftime("%Y-%m-%dT%H%M%S%fZ")+".json"
    with (archive/name).open("x") as f: json.dump(data,f,ensure_ascii=False,indent=2)

if __name__=="__main__": main()
