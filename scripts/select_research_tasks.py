#!/usr/bin/env python3
"""CLI entry point for the deterministic research queue selector.

This is read-only: it prints the selected task IDs and records without writing
the queue, so the maintenance runner can persist evidence only after a real
research attempt.
"""
import argparse
import json
from pathlib import Path

try:  # direct script invocation
    from research_queue import select_research_tasks
except ImportError:  # ``python -m scripts.select_research_tasks``
    from .research_queue import select_research_tasks


def main(argv=None):
    parser = argparse.ArgumentParser(description="Select due research tasks oldest-theme-first")
    parser.add_argument("--queue", default="state/research-queue.json", help="queue JSON path")
    parser.add_argument("--as-of", default=None, help="Taipei date or ISO timestamp")
    parser.add_argument("--limit", type=int, default=None, help="maximum number of selected tasks")
    parser.add_argument("--event", action="append", default=[], help="task/theme ID with a newly observed event")
    parser.add_argument("--all-per-theme", action="store_true", help="select every eligible task per theme")
    args = parser.parse_args(argv)
    queue = json.loads(Path(args.queue).read_text(encoding="utf-8"))
    selected = select_research_tasks(
        queue,
        args.as_of,
        limit=args.limit,
        new_events=args.event,
        one_per_theme=not args.all_per_theme,
    )
    print(json.dumps({
        "as_of": args.as_of,
        "selected_task_ids": [task.get("task_id") for task in selected],
        "tasks": selected,
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
