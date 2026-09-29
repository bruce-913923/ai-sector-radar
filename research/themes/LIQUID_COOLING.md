# LIQUID_COOLING — Active Theme Research

- Theme ID: `LIQUID_COOLING`
- As of: 2026-09-29
- Market status: Mature
- Thesis status: Thesis Strengthening
- Repository state: `state/active-themes.json` rank 1
- Source of truth: GitHub repository `bruce-913923/ai-sector-radar`

## Current thesis

AI server rack power density continues to rise, pushing cooling architecture from air cooling toward direct liquid cooling, cold plates, manifolds and CDU / heat-exchanger related components. Current evidence still supports demand and shipment growth, but the market theme has already entered a mature phase, so valuation/crowding and execution risk matter more than in the early cycle.

## Causal chain

| Stage | Status | Current evidence |
|---|---|---|
| Demand | Confirmed | AI server liquid-cooling demand remains strong across GPU and ASIC platforms; 雙鴻 explicitly attributes growth to rising AI liquid-cooling share, while 高力 liquid-cooling shipments recovered in Q3 after platform transition. |
| Orders | Confirmed | Key suppliers continue reporting AI liquid-cooling shipment visibility; 雙鴻 expects GPU / ASIC products to lift 11–12月 operations, while 高力 is adding capacity for thermal products. |
| Supply / demand | Partial | Demand remains strong, but capacity expansion is accelerating and platform transitions can create quarterly shipment gaps. |
| Capacity / utilization | Confirmed | 奇鋐 continues expanding production capacity; 高力 is adding short-term leased capacity and planning new plants for 2027. |
| ASP / product mix | Partial | Higher-value liquid-cooling mix supports earnings, but a reliable industry-wide ASP series is still unavailable. |
| Revenue | Confirmed | 奇鋐、雙鴻、高力 all show strong YoY revenue growth tied materially to AI / thermal products. |
| Margin | Confirmed / Partial | 奇鋐 margin expansion is clearly visible; 高力 liquid-cooling / thermal growth is strong, but mix includes fuel-cell thermal products, so theme-pure margin attribution is only partial. |
| EPS | Confirmed | 奇鋐 and 雙鴻 2026 FactSet consensus are still being revised upward; 高力 lacks a fresh, directly comparable reliable consensus revision pair in this run. |
| Market expectations | Confirmed | `state/market-theme-map.json` classifies LIQUID_COOLING as Mature with RS 96.77, breadth 100% and heat 1.46. |
| Valuation | Partial | Mature / crowded state raises sensitivity to shipment delays, margin misses and EPS revision deceleration. |

## Company evidence

### 奇鋐 3017

- 2026-08 revenue: NT$19.481bn, YoY +54.34%, MoM +4.79%; 1–8月累計 YoY +76.1%.
- 2026Q2 gross margin 32.57%, operating margin 27.44%, up from Q1 gross margin 29.77% / operating margin 24.51%.
- 2026 EPS FactSet median: 104.03 -> 104.82, +0.76%.
- 2027 EPS median in the same 2026-09-22 FactSet release: 156.83; no previous comparable value was included.

**Read-through:** revenue growth and margin expansion are both visible, so the liquid-cooling / AI mix thesis is not only a revenue story. However, the stock/theme is already in a Mature market state, so the next confirmation must come from continued earnings revision rather than price momentum alone.

### 雙鴻 3324

- 2026-08 revenue: NT$3.141bn, YoY +67.18%; 1–8月 revenue NT$24.156bn, YoY +81.01%.
- Company explanation: growth came from rising market share in AI-server liquid-cooling systems.
- Management previously indicated ASIC and GPU new products should make 11–12月 the operational peak for 2026.
- 2026 EPS FactSet median: 56.41 -> 56.93, +0.92%.
- 2027 EPS median in the same 2026-09-15 release: 73.15.
- Next-generation platform qualification / shipment timing remains an execution checkpoint rather than a fully realized result.

### 高力 8996

- 2026-08 revenue: NT$1.204bn, YoY +112.84%, MoM +30.48%; 1–8月 YoY +115.03%.
- Company disclosure says 1–8月 plate heat-exchanger revenue grew 18.73% YoY, while thermal-energy products grew 158.14% YoY.
- Q2 liquid-cooling shipments were temporarily affected by customer platform transition; Q3 shipments recovered, providing a useful real-world example that platform changeovers can interrupt an otherwise strong annual trend.
- 2026Q2 EPS was 2.16; this is reported actual EPS, **not** a consensus revision signal.
- A fresh, reliable FactSet-style prior/current EPS consensus pair was not found in this run, so 高力 EPS revision remains **Unconfirmed**.

**Read-through:** 高力 has the highest recent revenue growth among the three, but its thermal-energy exposure also includes fuel-cell demand. Theme attribution must therefore separate AI liquid cooling from non-AI thermal growth rather than treating all revenue as liquid-cooling evidence.

## EPS revision log

| Company | Year | Previous | Current | Change | Source/date | Verification |
|---|---:|---:|---:|---:|---|---|
| 奇鋐 | 2026 | 104.03 | 104.82 | +0.76% | FactSet via Cnyes, 2026-09-22 | Confirmed |
| 奇鋐 | 2027 | — | 156.83 | — | FactSet via Cnyes, 2026-09-22 | Current level confirmed; previous comparable value not in same release |
| 雙鴻 | 2026 | 56.41 | 56.93 | +0.92% | FactSet via Cnyes, 2026-09-15 | Confirmed |
| 雙鴻 | 2027 | — | 73.15 | — | FactSet via Cnyes, 2026-09-15 | Current level confirmed; previous comparable value not in same release |
| 高力 | 2026 | — | — | — | No fresh reliable prior/current consensus pair found | Unconfirmed |

## Conflicting evidence / disconfirming checks

1. **Platform transition risk is already observable.** 高力 Q2 liquid-cooling shipments slowed during customer platform transition before recovering in Q3; this shows that strong annual demand does not guarantee smooth quarterly shipments.
2. **Capacity expansion can normalize scarcity.** If new liquid-cooling capacity grows faster than GPU / ASIC rack deployment, supplier pricing power may weaken before end demand actually contracts.
3. **Not all thermal growth is AI liquid cooling.** 高力 also benefits from fuel-cell thermal demand; using consolidated revenue without segment attribution would overstate liquid-cooling momentum.
4. **Qualification timing remains material.** Next-generation GPU / ASIC cold-plate and system qualification can shift revenue between quarters.
5. **Market expectations are already high.** LIQUID_COOLING is Mature with heat 1.46 in the repo market map, so flat EPS revisions can be a meaningful weakening signal even if absolute revenue remains strong.
6. **Competitive supply remains a watch item.** Additional China / global suppliers and customer second-sourcing can pressure ASP or share once capacity catches up.

## What changed vs previous state

This file was created earlier on 2026-09-29 as the initial baseline. The same-day incremental update adds:

- direct source validation for 奇鋐 and 雙鴻 revenue / EPS revisions;
- 高力 as the third company required by the Active Theme research agenda;
- explicit separation of 高力's AI liquid-cooling exposure from fuel-cell thermal growth;
- a concrete platform-transition counterexample from 高力 Q2 -> Q3;
- exact FactSet dates and prior/current EPS values rather than generic monthly attribution.

The thesis remains stronger than the original registry narrative, but the evidence also reinforces why a Mature theme should be judged on **earnings revision durability and execution**, not only revenue growth.

## Thesis assessment

**Thesis Strengthening**

Demand, shipment growth and earnings revisions remain positive. 奇鋐 shows the cleanest margin confirmation, 雙鴻 shows strong liquid-cooling revenue exposure and positive EPS revision, while 高力 provides very high growth but with less pure theme attribution and a demonstrated platform-transition interruption.

The thesis would move toward **Thesis Intact / Weakening** if:
- EPS consensus stops rising for multiple checks;
- platform transitions cause repeated shipment misses rather than timing shifts;
- ASP or gross margin rolls over as capacity expands;
- liquid-cooling revenue growth materially decelerates across more than one leader.

## Next checks

- Monthly revenue: 奇鋐 / 雙鴻 / 高力
- Rubin / next-generation GPU and ASIC liquid-cooling qualification / shipment timing
- Cold plate / manifold / CDU / heat-exchanger capacity and utilization
- ASP / product mix
- Gross margin and operating margin
- 2026 / 2027 EPS consensus revision direction
- Customer diversification / second sourcing
- Separate 高力 AI liquid-cooling growth from fuel-cell thermal growth
- Evidence of competitive pricing pressure or lead-time normalization

## Sources

- 奇鋐 2026-08 revenue (company announcement via Yahoo/CNA): https://tw.stock.yahoo.com/news/%E5%85%AC%E5%91%8A-%E5%A5%87%E9%8B%90-2026%E5%B9%B48%E6%9C%88%E5%90%88%E4%BD%B5%E7%87%9F%E6%94%B6194-81%E5%84%84%E5%85%83-%E5%B9%B4%E5%A2%9E54-064242986.html
- 奇鋐 margin history: https://www.wantgoo.com/stock/3017/profitability/profit-margin
- 奇鋐 FactSet EPS consensus, 2026-09-22: https://anuenews.cnyes.com/news/id/6612647
- 雙鴻 2026-08 revenue / liquid-cooling explanation (CNA), 2026-09-08: https://www.cna.com.tw/news/afe/202609080168.aspx
- 雙鴻 FactSet EPS consensus, 2026-09-15: https://news.cnyes.com/news/id/6606868
- 高力 2026-08 revenue / product growth: https://www.moneydj.com/kmdj/news/newsviewer.aspx?a=eb067e4e-f8fd-4dfb-ad3e-63dbdaeaa232
- 高力 Q2 platform transition / Q3 recovery: https://www.ttv.com.tw/finance/view/092026070936334D8BEEBC5E425A94C7B31766B4B9226ACE/588

## Change log

### 2026-09-29 — incremental update
- Added 高力 company evidence and theme-purity caveat.
- Re-verified 奇鋐 and 雙鴻 revenue / EPS revisions with dated sources.
- Added exact 2026 EPS revision changes: 奇鋐 +0.76%, 雙鴻 +0.92%.
- Added platform-transition evidence as a direct disconfirming check.
- Thesis status remains Thesis Strengthening.

### 2026-09-29 — initial baseline
- Created initial research baseline.
- Recorded current Mature market status and Thesis Strengthening assessment.
- Added initial causal-chain validation, EPS revision baseline and disconfirming evidence.
