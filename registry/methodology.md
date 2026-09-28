# Theme Registry Methodology

This repository now separates **taxonomy**, **current market state**, **research evidence**, and **history**.

## Source of truth

- Theme taxonomy: `registry/themes.json`
- Company-to-theme relationships: `registry/companies.json`
- Current market map: `state/market-theme-map.json`
- Selected active themes: `state/active-themes.json`
- Diffusion candidates: `state/diffusion-candidates.json`
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
