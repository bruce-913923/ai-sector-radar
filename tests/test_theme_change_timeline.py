import sys
import unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/"scripts"))
from build_theme_change_timeline import build_timeline, normalize_snapshot

class TimelineTests(unittest.TestCase):
    def test_empty_next_day_retains_change(self):
        out=build_timeline(["2026-09-30","2026-10-01","2026-10-02"],[
            {"as_of":"2026-10-01","material_changes":[{"theme_id":"A","from":"Emerging","to":"Confirmed","direction":"↑","reason":"new evidence"}]},
            {"as_of":"2026-10-02","material_changes":[]}])
        self.assertEqual(out["themes"][0]["latest_date"],"2026-10-01")
        self.assertEqual(out["snapshot_dates_without_material_changes"],["2026-10-02"])
        self.assertEqual(out["missing_snapshot_dates"],["2026-09-30"])
    def test_merge_reversal_and_repeat(self):
        c={"theme_id":"A","from":"Emerging","to":"Confirmed","direction":"↑","reason":"evidence"}
        out=build_timeline(["1","2","3"],[{"as_of":"1","material_changes":[c]},{"as_of":"2","material_changes":[c]},{"as_of":"3","material_changes":[{"theme_id":"A","from":"Confirmed","to":"Cooling","direction":"↓","reason":"counterevidence"}]}])
        self.assertEqual(out["themes"][0]["material_change_count"],2)
        self.assertTrue(out["themes"][0]["has_reversal"])

    def test_normalize_preserves_correction_role(self):
        snap=normalize_snapshot({
            "as_of":"2026-10-08",
            "snapshot_role":"correction",
            "themes":[],
            "material_changes":[]
        },"history/theme-map/2026-10-08-correction.json")
        self.assertEqual(snap["snapshot_role"],"correction")

    def test_latest_same_day_correction_wins(self):
        out=build_timeline(["2026-10-08"],[
            {"as_of":"2026-10-08","_path":"history/theme-map/2026-10-08.json","material_changes":[{"theme_id":"A","from":"Confirmed","to":"Cooling","direction":"↓","reason":"stale"}]},
            {"as_of":"2026-10-08","_path":"history/theme-map/2026-10-08-correction.json","snapshot_role":"correction","material_changes":[]}])
        self.assertEqual(out["snapshot_dates_without_material_changes"],["2026-10-08"])
        self.assertEqual(out["themes"],[])

    def test_window_is_trading_dates_and_baseline_not_change(self):
        out=build_timeline(["1","2","3","4","5","6"],[{"as_of":"1","material_changes":[{"theme_id":"OLD","reason":"old"}]},{"as_of":"2","themes":[{"id":"A","status":"Confirmed"}]}])
        self.assertEqual(out["trading_dates"],["2","3","4","5","6"])
        self.assertEqual(len(out["themes"]),1)
        self.assertEqual(out["themes"][0]["material_change_count"],0)
if __name__=="__main__": unittest.main()
