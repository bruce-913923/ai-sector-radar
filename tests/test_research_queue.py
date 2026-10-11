import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from research_queue import select_research_tasks, task_eligibility


class ResearchQueueSelectionTests(unittest.TestCase):
    def task(self, task_id, theme, *, status="in_progress", checked="2026-10-10", next_check=None, kind="data_gap", priority=99):
        return {
            "task_id": task_id,
            "theme_id": theme,
            "kind": kind,
            "status": status,
            "priority": priority,
            "last_checked_at": checked,
            "next_check_at": next_check,
        }

    def queue(self, tasks, themes):
        return {"themes": themes, "research_tasks": tasks}

    def test_future_next_check_is_hard_gate_for_checked_and_waiting_tasks(self):
        future = self.task("future", "HOT", status="waiting_event", next_check="2026-10-20")
        untouched = self.task("untouched", "COLD", checked=None, next_check=None)
        q = self.queue([future, untouched], [
            {"theme_id": "HOT", "last_researched_at": "2026-10-01"},
            {"theme_id": "COLD", "last_researched_at": "2026-10-02"},
        ])
        self.assertEqual(select_research_tasks(q, "2026-10-11"), [untouched])
        self.assertEqual(task_eligibility(future, "2026-10-11"), (False, "next_check_future"))

    def test_oldest_theme_rotates_before_task_priority_or_array_order(self):
        newest_high_priority = self.task("newest", "NEW", priority=1)
        oldest_low_priority = self.task("oldest", "OLD", priority=99)
        q = self.queue([newest_high_priority, oldest_low_priority], [
            {"theme_id": "NEW", "last_researched_at": "2026-10-10"},
            {"theme_id": "OLD", "last_researched_at": "2026-10-01"},
        ])
        self.assertEqual([t["task_id"] for t in select_research_tasks(q, "2026-10-11")], ["oldest", "newest"])

    def test_checked_insufficient_line_does_not_starve_untouched_theme(self):
        blocked = self.task("blocked", "BLOCKED", status="blocked", next_check="2026-10-19")
        waiting = self.task("waiting", "WAIT", status="waiting_event", next_check="2026-10-19")
        untouched = self.task("new", "NEW", status="in_progress", checked=None)
        q = self.queue([blocked, waiting, untouched], [
            {"theme_id": "BLOCKED", "last_researched_at": "2026-10-01"},
            {"theme_id": "WAIT", "last_researched_at": "2026-10-02"},
            {"theme_id": "NEW", "last_researched_at": "2026-10-03"},
        ])
        self.assertEqual([t["task_id"] for t in select_research_tasks(q, "2026-10-11")], ["new"])

    def test_only_one_task_per_theme_by_default(self):
        first = self.task("first", "OLD", checked=None)
        second = self.task("second", "OLD", checked=None, kind="thesis_monitor")
        later = self.task("later", "NEXT", checked=None)
        q = self.queue([second, later, first], [
            {"theme_id": "OLD", "last_researched_at": "2026-10-01"},
            {"theme_id": "NEXT", "last_researched_at": "2026-10-02"},
        ])
        out = select_research_tasks(q, "2026-10-11")
        self.assertEqual([t["task_id"] for t in out], ["first", "later"])
        self.assertEqual(len(select_research_tasks(q, "2026-10-11", one_per_theme=False)), 3)

    def test_terminal_tasks_never_reenter(self):
        tasks = [self.task(s, "T", status=s, checked=None) for s in ("resolved", "invalidated", "dismissed", "cancelled")]
        q = self.queue(tasks, [{"theme_id": "T", "last_researched_at": None}])
        self.assertEqual(select_research_tasks(q, "2026-10-11"), [])

    def test_limit_zero_or_negative_returns_empty(self):
        task = self.task("one", "T", checked=None)
        q = self.queue([task], [{"theme_id": "T", "last_researched_at": None}])
        self.assertEqual(select_research_tasks(q, "2026-10-11", limit=0), [])
        self.assertEqual(select_research_tasks(q, "2026-10-11", limit=-1), [])

    def test_as_of_timestamp_uses_taipei_calendar_date(self):
        task = self.task("taipei", "T", checked="2026-10-10", next_check="2026-10-11")
        q = self.queue([task], [{"theme_id": "T", "last_researched_at": "2026-10-01"}])
        # 23:30 UTC on Oct 10 is 07:30 Oct 11 in Taipei, so the Oct 11
        # check is due. A UTC-date comparison would incorrectly skip it.
        self.assertEqual(
            [t["task_id"] for t in select_research_tasks(q, "2026-10-10T23:30:00Z")],
            ["taipei"],
        )

    def test_selector_does_not_infer_or_mutate_theme_dates(self):
        task = self.task("one", "T", checked=None)
        q = self.queue([task], [{"theme_id": "T", "last_researched_at": None}])
        before = q["themes"][0].copy()
        select_research_tasks(q, "2026-10-11")
        self.assertEqual(q["themes"][0], before)

    def test_checked_waiting_without_schedule_requires_event(self):
        waiting = self.task("waiting", "T", status="waiting_event", checked="2026-10-10")
        blocked = self.task("blocked", "T2", status="blocked", checked="2026-10-10")
        q = self.queue([waiting, blocked], [
            {"theme_id": "T", "last_researched_at": "2026-10-01"},
            {"theme_id": "T2", "last_researched_at": "2026-10-02"},
        ])
        self.assertEqual(select_research_tasks(q, "2026-10-11"), [])
        self.assertEqual(select_research_tasks(q, "2026-10-11", new_events={"waiting"}), [waiting])

    def test_explicit_event_allows_unscheduled_checked_task(self):
        task = self.task("event", "T", next_check=None)
        q = self.queue([task], [{"theme_id": "T", "last_researched_at": "2026-10-01"}])
        self.assertEqual(select_research_tasks(q, "2026-10-11", new_events={"event"}), [task])


if __name__ == "__main__":
    unittest.main()
