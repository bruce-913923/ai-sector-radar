# Daily maintenance contract

Repository main is the only source of truth. This contract consolidates the six former industry-tracking stages; research coverage is no longer limited to the three current Active Themes. It does not declare historical research complete or change deterministic market classification.

## Execution boundary
- Daily scheduled entry: 15:15 Asia/Taipei. Start market maintenance only between 15:00 and 17:00 Taipei on a verified TWSE trading day. An already-started run may finish afterward. A late start outside that window must report deferred, not silently run.
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
These are verified pending work, not completed fixes. Reconcile with latest source and tests before implementation.
1. Restore inactive AI_ASIC and LIQUID_COOLING structured projections from their retained notebooks, using actual evidence dates and the latest dated conclusions. LIQUID_COOLING's 2026-10-01 addendum says Thesis Intact. Keep the existing themes array schema and all active records. Topic-detail rendering already looks up any stored theme; only the active cards are intentionally filtered. Queue is not yet displayed by the UI.
2. Repair Update Market Data concurrent push handling: a completed 2026-10-01 calculation failed at git push when main advanced. Use bounded fresh-base retries, regenerating and validating if calculation/config inputs changed; never force push or silently rebase stale generated state.
3. Validate expected official trading-date freshness and individual stock/sector coverage, not just equality between generated files. Track provider failures and missing tickers. A source outage is not a holiday.
4. Isolate Yahoo benchmark-fetch errors so an available TWSE official index fallback can still run.
5. Preserve previous-trading-day comparison through same-day reruns; previous_as_of must not silently lose the prior-day comparison.
6. Reconcile stale active-agenda Queued labels with actual completed research; process status and evidence confidence remain separate.
7. Complete explicit cutover from legacy six schedules; these were not modified during setup. First scheduled background write remains unverified until a real run succeeds. Tool approval failures must be reported, never bypassed.
No change to deterministic regime thresholds, bear gates, exposure policy or security permissions is implied by these operational repairs.
