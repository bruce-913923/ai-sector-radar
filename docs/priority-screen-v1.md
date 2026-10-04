# Priority screen v1
Owner-approved initial technical baseline, 2026-10-04. This is a research observation list, not a trade instruction or a validated return forecast.

## Source and responsibility
- config/priority-screen-v1.json fixes the technical baseline. scripts/update_priority_candidates.py reads existing raw history only; no market-price download or regime mutation.
- Stage 3 reviews ALL registry company links and research tasks. Stage 5 reads the current technical candidates and maintains state/priority-assessments.json, separately from the Active-only expectation-gap universe.
- Every assessment company has ticker, fundamental and risk. Each gate needs status, summary, directly reviewable sources, reviewed_at and valid_until. Missing/expired/future-dated evidence cannot pass.
- Fundamental statuses: verified_improvement, leading_evidence, unknown, fail. Risk statuses: acceptable, caution, unknown, block. Both first two fundamental statuses plus acceptable/caution risk and a technical pass qualify for priority observation. A caution must name the risk, not hide it. Unknown material evidence blocks qualification; high P/E alone is not a veto.
- Each trading-day Stage 5 must actually review current technically passing companies, including recent material disclosures and contradictory evidence; only after that review set assessments.as_of to that market date. Never roll this date or extend validity merely to make a job pass. Usual gate validity is at most seven days, shorter around known events; material invalidating news overrides it immediately.
- Official daily recommendation history requires current market date, same-day research as_of, and Asia/Taipei time >=15:00. Later legitimate catch-up is allowed. Other evaluations are clearly labelled previews, not historical recommendations.
- Update Priority Candidates runs after successful Update Market Data and upon authorized changes to assessment/config/registry/rules. Research writes to priority-assessments trigger reevaluation without touching market data.
- Deterministic output: state/priority-candidates.json. Append-only snapshots: history/priority-candidates/. Current state may retain the latest same-day evaluation; prior published versions survive in append-only files.
- Stage 5 reports technical pass, research pending, risk blocked and fully qualified counts separately. Never relax gates to meet a daily minimum.

## Approved technical definition
Use valid stock rows aligned to benchmark trading dates; missing history/current rows or zero current volume is not a pass.
A trigger is either close crossing from at/below previous MA20 to above current MA20, or close exceeding the preceding 20-session highest close after the immediately preceding 10-session high did not exceed the older 20-session high (sessions -30 through -11).
At evaluation, latest trigger is within five sessions, at least two sessions including trigger have elapsed, every close since that trigger remains at/above its fixed trigger level, MA20 has risen over three sessions, five-session stock return exceeds TWII, and close is 0–9% above MA20. MA60 is not a mandatory gate. Failed criteria return to waiting, without asserting fundamentals have broken.
This is the initial rule selected after a 60-session candidate-density replay. It has NOT been validated as a profitable/out-of-sample strategy.

## Display and honest history
Display the latest five trading dates' actual published recommendations, one card per issuer. Refresh latest_qualified_date only for actual requalification, preserve first date and consecutive sessions, and mark whether it still qualifies. Do not backfill old recommendations with today's financial research.
Before first live run show the dated current preview and missing gates; an empty real-history list is expected. Preserve expectation-gap research separately; Positive Gap alone never implies priority eligibility.
