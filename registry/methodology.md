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
