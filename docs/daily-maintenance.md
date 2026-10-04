# Daily maintenance contract

Repository main is the only source of truth. This contract consolidates the six former industry-tracking stages; research coverage is no longer limited to the three current Active Themes. It does not declare historical research complete or change deterministic market classification.

## Execution boundary
- Scheduled entry: 15:00 Asia/Taipei on Monday-Friday, followed by verification against the official TWSE trading calendar. The task timezone must remain Asia/Taipei regardless of the owner's travel timezone. The delivery objective is to finish the day's ordered stages, publication and verification by 17:00 Taipei on actual trading days. Weekdays alone do not prove a trading day; official holidays must be skipped.
- The 15:00-17:00 interval is the expected service window, not a permission boundary that excuses abandoning work. If a verified trading-day run starts late or overruns, continue the unfinished work, preserve already-published results, and report actual start/finish times, the delay reason and remaining blockers. Do not simply mark the work deferred or complete. If a delayed invocation crosses a date boundary, reconcile the latest official trading date and outstanding state rather than mislabel current data as historical. Non-trading days still do not authorize market-data updates.
- Budget the depth of incremental research so every ordered stage is attempted and verifiable publication can finish within the target window; preserve uncompleted evidence questions in the queue instead of inventing conclusions. Separately owner-requested immediate research and operational repairs may proceed outside the recurring service window.
- Check the TWSE official trading calendar and official dated TAIEX historical daily data. A missing current-day row, timeout, or unavailable source is not proof of a holiday. Distinguish non-trading day from unknown/pending publication. Do not alter financial state until resolved.
- Non-trading days: report/retain the latest completed consistent state without writing a watchdog request or fabricating today's market data.
- Use the authorized GitHub connector for reads and writes. Do not launch separate Codex tasks. A tool approval requirement is a real pending approval, not successful publication or a failed run. Never bypass it, disable a schedule because of it, or claim unrestricted background writes have been proven.
- The owner requests direct scheduled publication of evidence-backed maintenance to this repository when supported; the old mandatory conversational “好” handoff is not part of this new pipeline. Preserve platform approval requirements.
- Do not pause/delete/modify former schedules automatically. Concurrent legacy writers must be identified and cut over explicitly; re-read/reconcile current main regardless.

## Ordered stages

### 0. Market data and deterministic regime
Read docs/market-regime.md, config/market-regime.json, state/market-regime.json, data/latest/rotation.json, ops/market-data-watchdog.json and .github/workflows/data-update.yml.
Use date-normalized as_of and updated_at in Asia/Taipei, inspecting underlying source freshness and errors rather than assuming a generated timestamp proves fresh inputs.
If verified trading day data is stale, first inspect existing Update Market Data runs and same-day watchdog requests. Do not duplicate an active run. Re-fetch main and state before any trigger; if already fresh, cancel the trigger.
Only update ops/market-data-watchdog.json to request the existing workflow; never manually compute/overwrite state/market-regime.json or generated prices. Preserve schema/other fields, set requested_for, requested_at, attempt = latest attempt + 1, reason and evidence of the freshness check. The push triggers Update Market Data.
Follow the trigger's actual workflow through completion or a genuine blocker; verify exact run/commit and then re-fetch regime and rotation. Failed/still-stale outputs remain stale. No unbounded retry or duplicate trigger loop.
Report every requested regime field from consistent completed state: regime, risk_budget_cap (maximum policy, not a target holding), change, TWII close, MA10/20/60 and ordering, their 5D slopes, previous-low break, S1/S2/S3, bear gate/phase, leverage_allowed and hedge_bias. Highlight material change first; never infer it from news.

### 1. Registry evolution and company gaps
Read registry/methodology.md, registry/themes.json, registry/companies.json, state/coverage-gaps.json, config/sectors.json and relevant prior registry history.
Research the recent 7–30 days of Taiwan/US/Asia industry evidence. Admit themes with sustained market relevance and a distinct commercial causal mechanism; a single headline or one-day price jump is insufficient. Check existing catalysts, child themes, route splits and renamed narratives before creating a stable ID.
Preserve stable IDs and dormant/deprecated continuity. Do not turn the registry into an encyclopedia of every industry.
Scan large-cap, high traded-value/attention and repeatedly evidenced companies beyond the existing registry. Every proposed company link needs an actual product/order/revenue/strategy connection. Keep uncertain candidates open with reasons. Synchronize the operational sector stock list only when appropriate for the current rotation engine.
Record evidence and open/resolved/dismissed changes; append history only for substantive changes.

### 2. Market map and current focus
Assess themes using dated price strength, breadth, capital confirmation, fundamentals and catalysts; never elevate a one-day rally alone.
Use Emerging / Confirmed / Accelerating / Mature / Cooling / Dormant; preserve prior state, direction and what changed.
Choose at most three Active Themes with research_status, research_hypothesis, ordered causal_chain_focus, 3–5 research_focus questions and 2–4 key_questions. Preserve existing agendas unless materially changed. New agenda = Queued; agenda is not evidence.
Discovery candidates do not silently become confirmed registry entries.

### 3. Research coverage BEFORE routine active refresh
Maintain state/research-queue.json as a coverage index derived from current registry, notebook existence/content and structured research, never from chat memory.
Coverage and evidence quality are different: an existing file or an Insufficient Evidence result does not imply a well-validated thesis.
First prioritize tracked themes with no substantive research baseline. Use dated market relevance, structural importance and oldest/never-researched age as tie-breakers. Ensure cold/unselected tracked themes are not permanently starved.
Each successful trading-day research run should attempt at least one never-researched baseline before routine Active Theme refresh while such gaps exist. Material thesis-invalidating evidence may preempt this, but record the reason and carry the backlog forward. Do not claim all gaps are filled in one run.
Preserve full longitudinal research/themes/{theme_id}.md for every researched theme, including non-active themes. Never delete a notebook because a theme exits Active Themes.
Retain structured summaries for all researched themes in state/theme-research.json where compatible with the inspected schema; Active Themes is a current-focus filter, not a storage deletion rule. Do not silently change the schema or label inactive work current. Any required frontend migration must be separately validated before claiming dashboard coverage fixed.
Research each causal chain as appropriate: demand → orders → supply/demand → capacity/utilization → ASP/mix → revenue → margins → EPS → expectations → valuation. Each node is Confirmed / Partial / Unverified / Contradicted with dated sources. Include contradictory evidence deliberately.
Preserve notebook sections: Current thesis, Causal chain, Catalysts, Fundamental confirmation, EPS/consensus revisions, Contradictory evidence, Leader/beneficiaries, Open questions, Change log.
Structured records retain theme_id, research_status, thesis_state, current_thesis, causal_chain, catalysts, fundamental_confirmation, eps_revisions, contradictory_evidence, companies, open_questions, research_focus, latest_changes and updated_at using existing schema conventions.
EPS revisions need prior/current numbers, fiscal year, change, source and date. Unknown is null/Unverified, never fabricated. Thesis states: Thesis Strengthening / Thesis Intact / Thesis Weakening / Thesis Broken. A completed evidence-gathering attempt becomes Updated or Insufficient Evidence, not still Queued.
Update queue results only after real research has been persisted and verified. Track blocked/missing evidence and the next question separately.

### 4. Diffusion
Restrict diffusion to current Active Themes. Only scan when the leader demonstrably leads; verify shared demand, actual supply-chain participation and revenue/profit sensitivity, not “laggards must catch up”.
Keep A Fundamental Catch-up, B Early Fundamental Confirmation and C Narrative Only distinct. Only A/B enter priority downstream research. State when no real diffusion exists. Preserve dated additions/upgrades/downgrades/removal reasons.

### 5. Expectation gap
Restrict to Active Theme leaders/primary beneficiaries and diffusion A/B. Never expand to a full-market cheap-stock screen.
Separate fundamental momentum, dated 20D/60D price/relative returns, forward/historical/peer valuation and observable crowding. Unknown inputs remain null/unknown with source dates.
Classifications: Positive Gap / Balanced / Crowded / Negative Gap / Insufficient Data. Compare prior classifications and explain changes. If upstream evidence or the eligible universe is missing, wait/mark insufficient rather than inventing a result.

## Publication and concurrency
- Read instructions, schemas and latest main each run. Preserve unrelated concurrent changes. Re-fetch all affected blobs immediately before publishing.
- Validate JSON parsing, unique stable IDs, company/theme references, active count <= 3, evidence dates/URLs, schema compatibility and append-only history. Do not mark forecasts/consensus as observed facts.
- No substantive change means no diff/no cosmetic timestamp-only commit.
- Prefer one coherent commit using the current base tree and parent, with a non-force fast-forward ref update. If the branch advanced, re-fetch, reapply and revalidate; never force push.
- If writing file-by-file, publish current data successfully before creating history. Never overwrite an existing historical snapshot; use a unique dated suffix for a second material update on the same day.
- Read back main after writes and verify actual content and commit. Check the existing Pages workflow before claiming the live dashboard updated. Report verification limits honestly.
- Keep execution evidence in an append-only dated history/maintenance/ record when maintenance changes state: source base SHA, stages attempted/completed/blocked, coverage before/after, changed paths, sources and validation outcomes. Do not embed credentials or private conversation content.
- If any necessary approval blocks a write, give the concrete proposed diff and request that approval without disabling jobs.

## User report
One consolidated Traditional Chinese report: market regime and changes; data freshness/watchdog run; registry/company changes; top/rising/cooling/discovery themes; Active Themes; newly researched backlog themes and remaining count; material thesis/diffusion/expectation changes; actual changed paths/commit/workflow status; unresolved evidence and next research priority.
Separate verified publications from planned or blocked work. Research is descriptive and evidence-based, not an instruction to trade.

## Open reliability and coverage repairs (audit 2026-10-02)
Status below distinguishes implemented repairs from remaining work. Reconcile with latest source and tests before implementation.
1. Completed 2026-10-02: restored inactive AI_ASIC and LIQUID_COOLING structured projections from the prior GitHub state, cross-checked against retained notebooks. Preserved actual dates (2026-09-30 and 2026-10-01), all current active records, and LIQUID_COOLING Thesis Intact. This is recovery of existing research, not fresh external verification or completion of the 31 missing baselines. Existing topic-detail code looks up all stored themes; active cards remain intentionally filtered. Live browser verification confirmed restored liquid-cooling content and original 2026-10-01 date, plus MLCC evidence-insufficient detail and 2026-10-02 date. Queue UI remains pending.
2. Implemented: three bounded non-force push attempts. A failed push fetches latest main into the disposable Actions checkout and reruns tests, all generators, and shared validation before retry. Commit a29fdd87f486b842f83a7f15786ffe3c57c50452; normal data run 37015694973 succeeded. Four command-double tests passed in CI 37015915453; a real concurrent Git push race has not been integration-tested.
3. Implemented and verified: scripts/market_data_quality.py checks actual official TWSE index dates; when today's row is absent it consults the official calendar and weekends to identify the expected prior trading date. Missing expected rows, missing/wrong-year calendar, unknown entries, or unresolved year boundaries fail closed rather than infer a holiday. Every configured ticker must have exactly one current-date valid OHLCV row. Suspended/missing tickers intentionally block publication pending explicit review; no silent exceptions. Commit 1b852f7f4b5a09e3cc356aaaae1ee11205f0a168: ten new regression tests, all 23 tests in CI 37017442107, and full data run 37017441784 succeeded. Real future outage/holiday scenarios remain subject to monitoring.
4. Completed: Yahoo benchmark errors no longer block TWSE fallback; both providers returning no rows fails rather than publishing cached-only data. Commit d0b17174057cf66689c8babda2f48f2e53c06f01; five offline regressions and real data run 37015373422 passed.
5. Completed: comparison is derived from prior trading rows with the same existing classifier, not previous invocation state. Commit 08830fc6e41583316283582e2793cc5a3c659420; four regression tests plus existing tests passed in CI 37016204759, data run 37016204742 passed. Generated main readback: as_of 2026-10-02, previous_as_of 2026-10-01. No strategy thresholds changed.
6. Completed: reconciled ABF, CCL and SERVER_DRAM process labels with their already-persisted same-day Updated research, preserving ranks, agendas and all financial assertions. Process completion and evidence confidence remain separate.
7. Legacy schedule cutover: the owner confirmed on 2026-10-02 that all former schedules are stopped. This is owner-reported, not an independent scheduler audit; the maintenance assistant did not modify those schedules. The unified schedule is the successor; its current timing is defined in Execution boundary. First scheduled background write remains unverified until a real run succeeds. Tool approval failures must be reported, never bypassed.
No change to deterministic regime thresholds, bear gates, exposure policy or security permissions is implied by these operational repairs.

## Coverage checkpoint 2026-10-02
Seven longitudinal notebooks and seven structured records now exist; 29 tracked themes still lack a baseline. MLCC is Insufficient Evidence with documented gaps; CONNECTOR has a completed baseline with partial attribution and missing consensus inputs. Commits aeb94a4fa3ba6571dd57c5649651e33c50f03bff and 60cbdc4450c95d6e198b04fc45a0922ce3e759b1 were read back and Pages succeeded. File existence is not proof of fully validated investment conclusions.

## UI evidence dates
The dashboard now labels the daily metric as research updates including insufficient-evidence attempts, not universally completed deep research. Detail panels show the research date separately from market date. Commits 97c420fe1d4687f763d515087cf771fb1703c1b4 and af73afb99fc8e79954be884691dc2b2c41fd8d13 include a script cache-version refresh, confirmed in the live browser. Updated is process status, not proof every causal node is confirmed.

## Scheduling correction 2026-10-04
The scheduler record inspected on 2026-10-04 contained a 15:15 Asia/Taipei DTSTART but default_timezone Europe/Rome and a DAILY recurrence. Its last recorded run was 2026-10-03T13:14:28.380456Z, approximately 21:14 Taipei / 15:14 Rome on Saturday. The timezone mismatch and weekend-inclusive recurrence are verified configuration defects; the scheduler's internal timezone-resolution behavior is not independently proven.
The successor task was updated to exact_schedule, Asia/Taipei for both DTSTART and default_timezone, and Monday-Friday at 15:00, beginning 2026-10-05. Actual TWSE holidays remain an execution-time official-calendar check. The 17:00 objective is a completion target; lateness requires recovery and transparent reporting, not automatic abandonment. Scheduler acceptance is verified, but the next actual invocation and end-to-end timely completion remain to be observed. A saved schedule is not a guarantee of queue latency or runtime.


### Stage 3 task execution contract
Follow registry/methodology.md#executable-research-task-lifecycle-2026-10-04. Consume research_tasks before routine refresh, select due gaps/events, update each attempted item's evidence/result/status, synchronize notebook and structured projection, preserve closed history, and report actual closure counts. Schema migration alone is not a completed evidence task.
