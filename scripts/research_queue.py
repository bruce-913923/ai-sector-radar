"""Deterministic research-task selection helpers.

The maintenance agent persists queue state and evidence; this module only decides
which existing tasks are eligible for the next pass.  It deliberately does not
mutate tasks so callers can preserve next_check_at, latest_evidence and history.
"""
from __future__ import annotations

from datetime import date, datetime, timezone
from typing import Iterable, Mapping, Any
from zoneinfo import ZoneInfo

TAIPEI = ZoneInfo("Asia/Taipei")

# Tasks which have terminal outcomes must never be scheduled again.
TERMINAL_STATUSES = frozenset({"resolved", "invalidated", "dismissed", "cancelled"})
OPEN_STATUSES = frozenset({"open", "in_progress", "waiting_event", "blocked"})


def _as_date(value: Any) -> date | None:
    """Parse date/datetime/ISO values, returning None for missing or invalid."""
    if value is None or value == "":
        return None
    if isinstance(value, datetime):
        return value.astimezone(TAIPEI).date() if value.tzinfo else value.date()
    if isinstance(value, date):
        return value
    if not isinstance(value, str):
        return None
    raw = value.strip()
    if not raw:
        return None
    try:
        # ISO timestamps ending in Z are accepted by fromisoformat after
        # converting to an explicit UTC offset.
        parsed = datetime.fromisoformat(raw.replace("Z", "+00:00"))
        return parsed.astimezone(TAIPEI).date() if parsed.tzinfo else parsed.date()
    except ValueError:
        try:
            return date.fromisoformat(raw[:10])
        except ValueError:
            return None


def _today(as_of: Any = None) -> date:
    parsed = _as_date(as_of)
    if parsed is not None:
        return parsed
    return datetime.now(timezone.utc).date()


def _theme_dates(queue: Mapping[str, Any]) -> dict[str, date | None]:
    """Return the persisted last-researched date for each theme.

    Theme records are authoritative. Missing dates remain missing and sort
    first; the selector never invents a theme update from task timestamps.
    """
    result: dict[str, date | None] = {}
    for theme in queue.get("themes", []) or []:
        theme_id = str(theme.get("theme_id") or theme.get("id") or "")
        if not theme_id:
            continue
        result[theme_id] = _as_date(theme.get("last_researched_at"))
    return result


def _event_ids(new_events: Iterable[str] | Mapping[str, Any] | None) -> set[str]:
    if new_events is None:
        return set()
    if isinstance(new_events, Mapping):
        return {str(k) for k, value in new_events.items() if value}
    return {str(x) for x in new_events}


def task_eligibility(
    task: Mapping[str, Any],
    as_of: Any = None,
    *,
    new_events: Iterable[str] | Mapping[str, Any] | None = None,
) -> tuple[bool, str]:
    """Return whether *task* may be selected and a machine-readable reason.

    ``next_check_at`` is a hard gate: a future date always wins over task
    priority or array position.  An explicit new event can make a waiting task
    eligible only when no future hard gate is present (the event then explains
    why an otherwise unscheduled task is due).
    """
    status = str(task.get("status") or "open")
    if status in TERMINAL_STATUSES:
        return False, "terminal"
    if status not in OPEN_STATUSES:
        return False, "unknown_status"

    today = _today(as_of)
    next_check = _as_date(task.get("next_check_at"))
    if next_check is not None and next_check > today:
        return False, "next_check_future"

    checked = bool(task.get("last_checked_at"))
    event_keys = _event_ids(new_events)
    task_id = str(task.get("task_id") or "")
    theme_id = str(task.get("theme_id") or "")
    event_ready = task_id in event_keys or theme_id in event_keys

    # A missing last_checked_at represents an untouched task, even if its
    # status was migrated to in_progress.  It must remain distinct from a
    # checked-but-insufficient task, whose next_check_at controls re-entry.
    if not checked:
        return True, "never_checked"
    if event_ready:
        return True, "new_event"
    # A checked blocked/waiting task with no scheduled check is waiting on an
    # external disclosure.  Treating a missing date as immediately due would
    # re-run it on every maintenance pass and starve untouched themes.
    if status in {"blocked", "waiting_event"} and next_check is None:
        return False, "awaiting_event"
    if next_check is None or next_check <= today:
        return True, "due"
    # Kept as a defensive branch if date parsing or future logic changes.
    return False, "not_due"


def _task_sort_key(task: Mapping[str, Any]) -> tuple[Any, ...]:
    # Data gaps are the executable evidence backlog; monitors follow once a
    # relevant event/date is due.  This is only an intra-theme tie-breaker.
    kind_rank = 0 if task.get("kind") == "data_gap" else 1
    checked = _as_date(task.get("last_checked_at")) or date.min
    next_check = _as_date(task.get("next_check_at")) or date.min
    try:
        priority = int(task.get("priority"))
    except (TypeError, ValueError):
        priority = 10**9
    return (kind_rank, next_check, checked, priority, str(task.get("task_id") or ""))


def select_research_tasks(
    queue: Mapping[str, Any],
    as_of: Any = None,
    *,
    limit: int | None = None,
    new_events: Iterable[str] | Mapping[str, Any] | None = None,
    one_per_theme: bool = True,
) -> list[Mapping[str, Any]]:
    """Select due tasks in oldest-theme-first order.

    The selector rotates across theme lines rather than repeatedly taking the
    first task in the persisted array.  By default it takes at most one task
    from each theme, so a checked/blocked line cannot starve an untouched line.
    Returned mappings are the original task objects and are never modified.
    """
    today = _today(as_of)
    if limit is not None and int(limit) <= 0:
        return []
    theme_dates = _theme_dates(queue)
    events = _event_ids(new_events)
    candidates: dict[str, list[Mapping[str, Any]]] = {}
    for task in queue.get("research_tasks", []) or []:
        ok, _reason = task_eligibility(task, today, new_events=events)
        if not ok:
            continue
        theme_id = str(task.get("theme_id") or "")
        if not theme_id:
            continue
        candidates.setdefault(theme_id, []).append(task)

    # Unknown/missing theme dates sort first; this is the intended never-
    # researched-first behaviour.  Theme ID is a stable deterministic tie-break.
    ordered_themes = sorted(
        candidates,
        key=lambda theme_id: (
            theme_dates.get(theme_id) is not None,
            theme_dates.get(theme_id) or date.min,
            theme_id,
        ),
    )
    selected: list[Mapping[str, Any]] = []
    for theme_id in ordered_themes:
        tasks = sorted(candidates[theme_id], key=_task_sort_key)
        if one_per_theme:
            tasks = tasks[:1]
        for task in tasks:
            selected.append(task)
            if limit is not None and len(selected) >= max(0, int(limit)):
                return selected
    return selected


# Short alias for callers that use the terminology in the maintenance contract.
select_tasks = select_research_tasks


__all__ = [
    "OPEN_STATUSES",
    "TERMINAL_STATUSES",
    "task_eligibility",
    "select_research_tasks",
    "select_tasks",
]
