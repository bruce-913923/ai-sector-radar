import sys
import unittest
from unittest.mock import patch
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/"scripts"))
from update_priority_candidates import evaluate, classify, build

CFG={"status":"approved", "technical":{"max_ma20_extension_pct":9,"min_relative_return_pct_point":0,"require_above_ma60":False,"signal_window_trading_days":5,"min_confirmation_sessions_including_trigger":2},"display":{"lookback_trading_days":5}}
class PriorityTests(unittest.TestCase):
    def rows(self):
        return [dict(date="2026-10-01",close=100,ext=1,slope=1,rs5=2,above60=False,cross=True,breakout=False,level=99),
                dict(date="2026-10-02",close=102,ext=2,slope=1,rs5=2,above60=False,cross=False,breakout=False,level=100)]
    def test_confirmation(self):
        m=self.rows()
        self.assertEqual(evaluate(m,"2026-10-01",CFG["technical"])["status"],"wait")
        self.assertEqual(evaluate(m,"2026-10-02",CFG["technical"])["status"],"pass")
    def test_extension_and_invalidation(self):
        m=self.rows(); m[-1]["ext"]=9.01
        self.assertEqual(evaluate(m,"2026-10-02",CFG["technical"])["status"],"wait")
        m[-1]["ext"]=2; m[-1]["close"]=98
        self.assertEqual(evaluate(m,"2026-10-02",CFG["technical"])["status"],"wait")
    def test_missing_is_not_pass(self):
        self.assertEqual(evaluate([],"2026-10-02",CFG["technical"])["status"],"data_insufficient")
        self.assertEqual(classify({"status":"pass"},{},"2026-10-04"),"research_pending")
    def assessment(self):
        return {"fundamental":{"status":"leading_evidence","reviewed_at":"2026-10-02","valid_until":"2026-10-20","sources":["https://example.com/report"]},"risk":{"status":"acceptable","reviewed_at":"2026-10-02","valid_until":"2026-10-20","sources":["https://example.com/report"]}}
    def test_three_gates(self):
        a=self.assessment()
        self.assertEqual(classify({"status":"pass"},a,"2026-10-04"),"priority")
        self.assertEqual(classify({"status":"wait"},a,"2026-10-04"),"waiting_signal")
        a["risk"]["status"]="block"
        self.assertEqual(classify({"status":"pass"},a,"2026-10-04"),"deferred")
    def test_expiry_and_future_evidence(self):
        a=self.assessment()
        self.assertEqual(classify({"status":"pass"},a,"2026-10-21"),"research_pending")
        self.assertEqual(classify({"status":"pass"},a,"2026-10-01"),"research_pending")
    def test_duplicate_ticker_and_no_retroactive_history(self):
        history={"benchmark":{"rows":[{"date":"2026-10-02","close":100}]},"stocks":{}}
        registry={"themes":[{"id":"A","registry_status":"tracked","companies":[{"ticker":"1","name":"one"}]},{"id":"B","registry_status":"tracked","companies":[{"ticker":"1","name":"one"}]}]}
        out=build(history,registry,CFG,{"companies":[]},now="2026-10-04T07:00:00+00:00")
        self.assertEqual(len(out["candidates"]),1)
        self.assertEqual(out["candidates"][0]["theme_ids"],["A","B"])
        self.assertEqual(out["recommendation_history"],[])
        self.assertEqual(out["mode"],"research_preview_not_backdated")

    def test_live_history_requires_today_review_and_service_window(self):
        h={"benchmark":{"rows":[{"date":"2026-10-01","close":100},{"date":"2026-10-02","close":101}]},"stocks":{}}
        reg={"themes":[{"id":"A","registry_status":"tracked","companies":[{"ticker":"1","name":"one"}]}]}
        a={"as_of":"2026-10-02","companies":[dict(ticker="1",**self.assessment())]}
        with patch("update_priority_candidates.metrics",return_value=[]), patch("update_priority_candidates.evaluate",return_value={"status":"pass"}):
            early=build(h,reg,CFG,a,now="2026-10-02T06:00:00+00:00")
            self.assertEqual(early["recommendation_history"],[])
            first=build(h,reg,CFG,a,now="2026-10-02T07:00:00+00:00")
            self.assertEqual(first["weekly"][0]["latest_qualified_date"],"2026-10-02")
            again=build(h,reg,CFG,a,first,now="2026-10-02T08:00:00+00:00")
            self.assertEqual(len(again["recommendation_history"]),1)
            self.assertEqual(again["weekly"][0]["first_qualified_date"],"2026-10-02")
            a["as_of"]="2026-10-01"
            stale=build(h,reg,CFG,a,now="2026-10-02T08:00:00+00:00")
            self.assertEqual(stale["mode"],"research_preview_not_backdated")
if __name__=="__main__": unittest.main()

