# Theme Registry Methodology

This repository now separates **taxonomy**, **current market state**, **research evidence**, and **history**.

## Source of truth

- Theme taxonomy: `registry/themes.json`
- Company-to-theme relationships: `registry/companies.json`
- Market regime state: `state/market-regime.json`
- Current market map: `state/market-theme-map.json`
- Selected active themes: `state/active-themes.json`
- Structured theme research: `state/theme-research.json`
- Company coverage gaps: `state/coverage-gaps.json`
- Diffusion candidates: `state/diffusion-candidates.json`
- Expectation gap state: `state/expectation-gap.json`
- Theme research notes: `research/themes/`
- Historical snapshots: `history/`

The existing `config/sectors.json` remains the AI Sector Radar web application's configuration and the seed source for the initial registry. It is **not** the authoritative full-market taxonomy.

## Core invariants

1. **Theme IDs are stable.** Once a theme has an ID, renaming the display name must not change the ID.
2. **Registry != market state.** A tracked theme can be cold, hot, emerging, or dormant without being deleted from the registry.
3. **Incremental updates only.** Scheduled jobs must read the existing registry/state first and modify it; they must not recreate the system from memory.
4. **No silent deletion.** A theme should normally move to a dormant/deprecated registry status before removal.
5. **Preserve evidence.** Material taxonomy changes should be explained in a dated history snapshot/changelog.
6. **Parent/child evolution is explicit.** A new technical route inside an existing theme should first be evaluated as a subtheme before creating a new top-level theme.
7. **Price action is not taxonomy evidence.** A one-day rally can affect market state, but does not by itself justify a new registry entry.

## Registry lifecycle

Recommended `registry_status` values:

- `tracked`: part of the maintained research universe.
- `candidate`: proposed addition; taxonomy is not yet confirmed.
- `dormant`: retained for continuity but not actively researched.
- `deprecated`: superseded/merged; keep redirects or successor IDs in research notes.

## Market-state lifecycle

`state/market-theme-map.json` should use these market statuses:

- `Emerging`: early capital/attention formation, not yet broadly confirmed.
- `Confirmed`: price + breadth show a recognized market theme.
- `Accelerating`: participation and/or fundamental catalysts are strengthening.
- `Mature`: broad consensus; valuation/crowding risk becomes more relevant.
- `Cooling`: relative strength or catalyst intensity is fading.
- `Dormant`: currently not a meaningful market focus.

These are **descriptive states**, not investment recommendations.

## Creating a new theme

Before adding a new top-level theme, check whether the new item is:

1. a new catalyst for an existing theme;
2. a new child/subtheme;
3. a technology-route split;
4. a newly relevant supply-chain stage;
5. a market rename of an existing theme; or
6. a genuinely new investable theme.

Prefer updating an existing taxonomy node unless a separate node improves longitudinal tracking.

A new theme should include, at minimum:

- stable `id`
- `name` / `label`
- `parent_id` where applicable
- `scope`
- `registry_status`
- tags
- thesis / causal mechanism
- representative companies and roles
- source/evidence
- created/updated dates

## Company registry

`registry/companies.json` is the canonical cross-reference for companies. A company may link to multiple themes with different roles.

Roles are descriptive, for example:

- Leader
- High Beta
- Candidate
- Packaging Proxy
- Test Proxy
- Member

A scheduler should update relationships only when it has evidence that the company's economic exposure actually changed.

## Active Theme research handoff

The Market Theme Radar and Active Theme Research jobs have separate responsibilities:

- `state/active-themes.json` answers **what should be researched next**. Each active theme must carry a research agenda: `research_hypothesis`, ordered `causal_chain_focus`, `research_focus`, and `key_questions`.
- `state/theme-research.json` answers **what the deeper research currently says**. It is the structured dashboard projection of the full longitudinal notebooks in `research/themes/{theme_id}.md`.

A research agenda is not evidence. The Active Theme Research job must validate each agenda item and mark causal-chain stages as `Confirmed`, `Partial`, `Unverified`, or `Contradicted`. Missing evidence must remain missing rather than being inferred.

The Markdown notebook preserves detailed longitudinal evidence and sources. The JSON state is a concise, structured rendering layer for the web dashboard.

## Expectation Gap

`state/expectation-gap.json` compares **fundamental momentum** with **price reaction / valuation** for a deliberately narrow company universe. It is not a full-market screener and must not be rebuilt from conversational memory.

### Eligible universe

Only analyze companies attached to current `state/active-themes.json` that are one of:

- a current theme Leader / primary beneficiary from the registry or active-theme research; or
- an `A Fundamental Catch-up` candidate from `state/diffusion-candidates.json`; or
- a `B Early Fundamental Confirmation` candidate from `state/diffusion-candidates.json`.

Do not expand to unrelated companies merely because they look cheap or have not risen.

### Evidence layers

For each eligible company, keep the evidence layers separate:

1. **Fundamental momentum** — EPS/revenue/margin revisions, orders, utilization, ASP, capacity, customer or product mix changes.
2. **Price reaction** — dated 20D / 60D returns and relative returns versus the relevant theme and/or TWII when reliable data is available.
3. **Valuation** — forward valuation and, when available, the company's own historical range and relevant peer/theme reference.
4. **Crowding / expectation** — only when supported by observable evidence; do not infer a precise crowding score from narrative alone.

Numeric values must include an as-of date and source/evidence. If a reliable value cannot be verified, store `null` / `unknown`; never fabricate a number to complete the schema.

### Classification

Use one of these descriptive states:

- `Positive Gap`: fundamental evidence is improving faster than price/valuation appears to reflect.
- `Balanced`: fundamental improvement and market pricing are broadly aligned.
- `Crowded`: thesis can remain healthy, but price/valuation/expectation has run materially ahead of currently verified improvement.
- `Negative Gap`: price remains strong or valuation is elevated while verified fundamentals are weakening or failing to confirm.
- `Insufficient Data`: evidence is not strong enough for a defensible classification.

These states describe the relationship between evidence and market pricing; they are not buy/sell instructions.

### Update rules

- Read the previous `state/expectation-gap.json` before every run.
- Preserve prior classification and explain every material change.
- Recompute from current verified evidence rather than carrying a stale label forward.
- Append a snapshot to `history/expectation-gap/YYYY-MM-DD.json` when classifications or the eligible universe change materially.
- Do not overwrite old history files.

## State update rule

Every scheduled run must:

1. read the latest repository files;
2. compare with the previous state;
3. perform an incremental update;
4. record what changed;
5. write current state;
6. append a dated history snapshot when material changes occur.

Chat history must never be treated as the source of truth.

## Initial scope

The initial registry was seeded on 2026-09-28 from `config/sectors.json`, so it is intentionally AI-heavy. Full-market themes (e.g. satellite, robotics, power grid, defense, shipping, commodities, biotech, policy themes) should be discovered and added through the Theme Registry Updater rather than invented during initialization.


## Company Coverage Gap Scan

The registry must not become a closed universe that can never discover important companies omitted from the initial seed.

`state/coverage-gaps.json` tracks **company coverage gaps**, which are different from new-theme discovery candidates.

### Why this exists

A company can be economically important to an existing tracked theme even if it was absent from the original `config/sectors.json` seed. If it remains missing from `registry/companies.json`, downstream price rotation, theme research, diffusion and expectation-gap analysis can all become biased.

### Scan universe

Each Theme Registry maintenance run should compare the current company registry against external/current market evidence, especially:

- major TWSE/TPEx large-cap names;
- high traded-value / high market-attention names;
- companies repeatedly appearing in evidence for existing tracked themes;
- companies whose business mix materially changed into an existing tracked theme.

Price strength alone is not enough.

### Candidate / resolution rule

For a missing company:

1. identify the plausible existing theme link(s);
2. verify that the business/theme exposure is material, not merely a one-off press mention;
3. if verified, add the company incrementally to `registry/companies.json` and the relevant `registry/themes.json` company lists;
4. if the theme participates in the current rotation engine, mirror the company into `config/sectors.json` so OHLCV is collected by `scripts/update_data.py`;
5. record the resolution in `state/coverage-gaps.json` and a dated registry history changelog;
6. if evidence is not sufficient, leave the item under `open_gaps` rather than forcing an add.

A company may link to multiple themes. Avoid attaching a company to every adjacent narrative; each link needs a specific business mechanism.

### Operational mirror

`registry/*.json` remains the authoritative taxonomy/company relationship source. `config/sectors.json` is an operational mirror for the current AI rotation engine, because `scripts/update_data.py` still uses it to determine which stocks receive OHLCV history. When a tracked AI-theme company is added or removed, keep the relevant config sector stock list synchronized until the data pipeline is refactored to read the registry directly.

## Fundamental evidence and forward outlook (2026-10-04)

Research covers all tracked themes, not only the maximum three Active Themes. Preserve inactive notebooks and structured summaries. Prioritize material evidence gaps over cosmetic completeness: retrieve original company reports, financial statements, monthly revenues, investor presentations and customer/supplier announcements before treating a missing field as unavailable. Distinguish not searched, retrieval blocked, not disclosed in checked sources and insufficient attribution. An existing baseline or Updated status is not proof that the investment thesis is fully verified.

Organize research as: current business mechanism and observed fundamentals; future growth outlook; contradictory evidence and pricing/valuation risks; actionable monitoring questions. Preserve existing beneficiary-path presentation. A forward outlook is not a renamed research agenda and is not a promise of price appreciation.

Each researched theme in state/theme-research.json should have an outlook OBJECT with summary (string), horizon (specific forward period), direction (Improving, Stable or Deteriorating; null when evidence does not support a direction), and drivers (array). Each driver has item, type, timing, as_of and source. State conditions and distinguish orders, capacity plans, pricing, product milestones, management guidance and analyst estimates. Unknown dates/timing remain null; source is a directly reviewable URL. Do not treat an example as evidence. If current rendering does not consume outlook, report the integration gap without modifying the interface in a data-only task. Keep research_focus as research work and open_questions as measurable follow-up questions with baseline, next disclosure/event and invalidation conditions.

Actively seek current-year and the next one or two fiscal years' EPS estimates for relevant registered companies. Preserve eps_revisions' existing company/year/previous/current/change_pct/source/date/verification keys. A reliably sourced current estimate may be recorded without a previous estimate; missing previous and change_pct remain null. Add estimate_type (broker_estimate, consensus_mean, consensus_median or company_guidance), currency, previous_date, previous_source, forecaster and sample_size when available, null otherwise. Do not infer a numeric EPS from a company growth target. Actual EPS belongs in fundamentals, not forecasts. Compare revisions only within the same issuer, fiscal year, forecasting source/statistic, currency and share basis; a forecast level is not necessarily a revision. Disclose outdated values and do not confuse target prices or aggregate net profit with EPS.

Use dated direct sources, preserve original units and periods, distinguish quarter from year-to-date and group-level figures from theme-attributable economics. Forecasts never become Confirmed actual outcomes. Record negative evidence and formal clarifications, not only favorable headlines. Retain substantive notebook history; update only researched entries on latest main and append unique history/theme-research snapshots. Evidence-quality completion and schema/display coverage must be reported separately.

The primary autonomous maintenance job publishes through its granted GitHub permissions. A separately configured backup job must honor its own explicit background proposal / foreground approval flow. This methodology does not activate a paused backup or override an approval boundary.

## Executable research task lifecycle (2026-10-04)
Stage 3 MUST consume state/research-queue.json research_tasks, existing research_focus and open_questions before new routine research. A list is not a completed action. Each task has a stable task_id, theme_id, kind (data_gap or thesis_monitor), question, status, priority, baseline, latest_evidence, last_checked_at, next_check_at, next_event, resolution_criteria, result and history. Unknown event dates remain null; never invent a company announcement date.

Select due open/data_gap tasks first, prioritizing missing material evidence and age, while preserving the existing never-researched-first policy. Select thesis_monitor tasks when a relevant disclosure/event occurs or their check date is due. Record selected task IDs at run start in the maintenance result. No due task may be silently ignored: record a scoped deferral reason for items that cannot fit this run, without changing their last_checked_at.

Statuses: open, in_progress, waiting_event, blocked, resolved, invalidated, dismissed. Every attempted item must produce dated sources, a conclusion or exact blocker, and a next action. Reading a URL alone never resolves the underlying commercial question. A data_gap can resolve only when its resolution_criteria are satisfied by evidence. Source retrieval can resolve independently of a deeper attribution question, which remains its own open task. Do not label an unsearched question not_disclosed.

Thesis monitors preserve the original forecast vintage, metric/unit/fiscal period and attribution. Compare actual disclosures and subsequent forecasts with that baseline, allowing seasonality and accounting/share changes. Mark supported/at_risk/contradicted/unknown in result; remain waiting_event until horizon ends, thesis is invalidated or the question is explicitly retired. An EPS miss alone does not mechanically determine a P/E change. Null/unknown baselines require a separate evidence task rather than fabricated thresholds.

Write the same researched result to the notebook and structured state, update the task result/status/history and append a unique historical snapshot. Project unresolved data work into research_focus; project continuing thesis monitoring into open_questions; latest_changes reports new evidence and decisions, not a duplicate agenda. Preserve closed tasks and their evidence in task history, excluding them from the current unresolved display. Migrate existing string questions incrementally with stable IDs; do not erase them before migration is verified.

After publication, read back queue and research together. Report selected, attempted, resolved, invalidated, blocked and waiting-event counts and the most material conclusion. A new schema/prompt is not proof of a successful scheduled execution: distinguish a verified manual pass from the next real scheduled run. Backup jobs apply the same selection/result logic in their proposal and commit only under their own approval rules.

## Whole-theme and all-company coverage (2026-10-04)
Pass 1 is initial theme coverage for usable display, not investment-grade research. Pass 2 must review EVERY company linked by registry/themes.json, regardless of Active status or priority-pick eligibility. Maintain the company_coverage grid in state/research-queue.json across commercial link, fundamentals, forward outlook, future EPS, valuation, contrary evidence and monitoring. Distinguish needs_coverage_audit, reviewed, not_disclosed_in_checked_sources, retrieval_blocked and insufficient_attribution; each resolved cell needs source dates and an explanation. A mixed company's evidence cannot silently stand for its peers.

Produce a coherent industry synthesis: common demand, supply bottlenecks, technology routes and timing; compare each company's exposure, capacity/orders, revenue/profit conversion and risks; explain divergence and thesis invalidation. Keep every company visible even when EPS is unavailable. Date estimates individually and never compare nominal EPS to rank companies. Target an initial full-company evidence audit within one week of 2026-10-04 (by 2026-10-11); this is a coverage target, not a promise that undisclosed/private estimates exist. Schedule non-market research catch-up within authorized runs as needed, without creating duplicate market data or changing other schedules. Report remaining cells and reasons, not just theme/file counts. Changes to priority-pick selection or its UI are outside this research backfill and remain pending separate discussion.


## Priority candidates integration (2026-10-04)
The owner approved the initial baseline in config/priority-screen-v1.json. Follow docs/priority-screen-v1.md for company-specific fundamental/risk assessment, technical rules and genuine five-session recommendation history. Stage 5 maintains state/priority-assessments.json for all tracked companies separately from the Active-only expectation-gap universe. GitHub Actions owns generated state/priority-candidates.json. Do not equate Positive Gap with a priority recommendation or backdate records. The complete paused-backup instructions are docs/backup-priority-stage5.md; this does not activate that backup.
