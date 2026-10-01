# Market Regime / Risk Budget

This layer is the **upstream risk gate** for the research system. It answers one question before theme/company selection:

> What is the current TWII technical regime, and what is the maximum portfolio risk budget allowed by the policy?

The regime is computed deterministically from the `^TWII` benchmark rows already maintained in `data/market_history.json`. LLM narrative, news sentiment, and chat memory do not determine the regime.

## Source of truth

- Policy/config: `config/market-regime.json`
- Current state: `state/market-regime.json`
- Daily benchmark history: `data/market_history.json`
- Historical regime changes: `history/market-regime/`
- Calculator: `scripts/update_market_regime.py`

## Regimes

- **Strong Bull** — close > MA10 > MA20 > MA60, with MA10/MA20 rising over 5 trading days and MA60 non-declining.
- **Bull** — MA20 > MA60, close > MA20, and MA20 is non-declining over 5 trading days, but Strong Bull conditions are not all met.
- **Range** — mixed structure that is neither Bull/Strong Bull nor structurally Bear; also used as a defensive downgrade when a bear setup is waiting for next-open gate confirmation.
- **Bear** — a confirmed S1/S2/S3 gate, or a structurally bearish condition such as a prior-20D-low break below MA20 / sustained weakness below MA60 with falling MA20.

The exact implementation is the calculator code plus the policy config; prose is descriptive and must not override code.

## Risk budget cap

Initial PoC caps:

| Regime | Risk budget cap | Leverage allowed | Hedge bias |
|---|---:|---|---|
| Strong Bull | 100% | yes | low |
| Bull | 80% | yes | low |
| Range | 50% | no | medium |
| Bear | 20% | no | high |

The number is a **maximum exposure policy**, not a required position size and not an investment recommendation. It can be recalibrated after backtesting.

## Bear Phase S1 / S2 / S3

The existing bear-phase logic is kept separate from the broad regime so a warning can exist without pretending a short entry gate has already confirmed.

### Gate

A setup becomes **pending** only when:
1. an S1/S2/S3 shape is true on the trigger day;
2. the trigger day closes down versus the previous close; and
3. trigger-day close < trigger-day MA10.

It becomes **confirmed** on the following trading day only when next-day open <= trigger-day MA10. A confirmed gate forces the regime to Bear for that day.

### S1
- MA20 > MA60
- MA60 < close < MA20
- MA20 5D change < +1.0%
- max high over the latest 5 trading days >= MA20 × 0.98
- Gap >= 3%

**PoC Gap definition:** `close / MA60 - 1`. This is used because S1's reference target is MA60. If the original backtest's `Gap` field used a different exact definition, update the config/calculator before relying on S1 parity.

### S2
- close < MA60
- MA60 5D change < +0.3%
- MA20 5D change < +0.5%

### S3
- MA60 > MA20
- close < MA20
- MA20 5D change < 0%

## Previous-low rule

"Previous low" is implemented as the minimum low of the prior 20 trading days, excluding the current day. A close below that level while below MA20 is a bearish structural condition.

## Update behavior

The GitHub Actions market-data workflow runs after the Taiwan market close and then:
1. refreshes `data/market_history.json`;
2. computes `state/market-regime.json`;
3. appends `history/market-regime/YYYY-MM-DD.json` only when the material regime fingerprint changes;
4. commits the generated state together with the rest of the market data.

Material fingerprint fields are regime, risk-budget cap, pending/confirmed bear gate, confirmed phase(s), and previous-low break.

The ChatGPT scheduled task named `產業追蹤-0-大盤狀態與曝險` is a **review/notification layer**. It reads GitHub state after the Actions job and reports the current regime and delta. GitHub Actions—not the LLM—is authoritative for the technical calculation.

## Watchdog fallback

The normal market-data trigger remains the GitHub Actions schedule at 14:10 Asia/Taipei on weekdays. Because GitHub scheduled events are best-effort and can be delayed or dropped, the ChatGPT scheduled task `產業追蹤-0-大盤狀態與曝險` also acts as an independent 15:00 watchdog.

Watchdog behavior:
1. use TWSE official index history only to determine whether the current Taipei date is an expected TWSE trading date; this check does not classify the regime;
2. read `state/market-regime.json` and `data/latest/rotation.json`;
3. if both are already on the expected trading date, do not write anything;
4. if the expected trading date is today but GitHub state is stale, update `ops/market-data-watchdog.json`;
5. that push is included in the market-data workflow path filters and therefore starts `Update Market Data` without depending on GitHub's scheduled-event dispatcher;
6. after the fallback run, re-read GitHub state and report the deterministic result. The watchdog never edits `state/market-regime.json` directly.

The watchdog trigger file is an operational audit record, not market data. It should only change when a stale-state fallback is actually requested.
