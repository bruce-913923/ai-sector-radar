# 2026-10-05 產品別供需與反證

9/30產業原文支持伺服器DRAM供給偏緊，但一般DRAM季漲10–15%不是伺服器專屬漲幅；LTA限制個別供應商漲幅，PC／手機需求疲弱與主動採購並存。HBM和一般DRAM爭奪產能是方向性證據，台股公司的伺服器獲利歸因仍屬部分確認。

- [TrendForce 9/30](https://www.trendforce.com/presscenter/news/20260930-13258.html)：一般DRAM季漲10–15%、NAND15–20%皆為Q4預測；伺服器LTA、PC／手機成本壓力與企業SSD需求不可混算。
- [TrendForce 9/29](https://www.trendforce.com/presscenter/news/20260929-13255.html)：2027 HBM混合ASP預估年增121%，包含高價產品組合；8-Hi少用晶粒但每Gb成本可能較12-Hi高10–20%，不是每種記憶體都同幅漲價。
- 未取得取消率、逐供應商LTA、精確晶圓排擠及台股產品獲利歸因。分類釐清任務結案1項，其餘三項保持部分確認。

---
# SERVER_DRAM — Active Theme Research

- Theme ID: `SERVER_DRAM`
- As of: 2026-10-02
- Market status: Accelerating
- Thesis status: Thesis Strengthening
- Repository state: `state/active-themes.json` rank 3
- Source of truth: GitHub repository `bruce-913923/ai-sector-radar`

## Current thesis

AI-server deployment, higher memory content per server, and improving CPU availability are supporting server DDR5 demand. At the same time, HBM and other advanced products continue to compete for DRAM production resources, keeping server DRAM supply tight. The industry thesis is well supported, but Taiwan-listed names such as 南亞科 and 華邦電 are cycle proxies rather than pure server-DRAM suppliers, so company-level earnings attribution must remain Partial where product-mix evidence is incomplete.

## Causal chain

| Stage | Status | Current evidence |
|---|---|---|
| CSP / AI server demand & memory content | Confirmed | TrendForce reports stronger procurement by CSPs and server OEMs as CPU availability improves and agentic-AI workloads raise RDIMM demand. |
| Server DDR5 procurement / LTA / orders | Confirmed | US cloud providers are placing additional orders; add-on demand is lifting LTA price bands and special-deal pricing. |
| HBM crowd-out of DRAM capacity | Confirmed | TrendForce states HBM continues to crowd out conventional DRAM capacity, keeping supplier inventories low. |
| Supplier inventory / lead time / supply-demand | Confirmed | Supplier inventory remains low and server DRAM is expected to stay undersupplied in 4Q26. |
| Contract price / ASP | Confirmed | Conventional DRAM contract prices are projected +10–15% QoQ in 4Q26; Server DIMM prices are projected to rise by more than 10% QoQ. |
| Taiwan proxy product mix | Partial | 南亞科 states AI infrastructure and server-related products exceeded 20% of 1H26 revenue; 華邦電 has broader memory exposure, so direct server-DRAM sensitivity is less pure. |
| Revenue | Partial | Strong DRAM pricing is supporting Taiwan memory makers, but consolidated revenue cannot be attributed solely to Server DRAM. |
| Gross margin / operating margin | Partial | 南亞科 Q2 ASP rose more than 60% QoQ and margin expanded sharply, but the result reflects a broad DRAM mix rather than only server products. |
| EPS / consensus | Confirmed | 南亞科 and 華邦電 both have verified 2026 FactSet EPS upward revisions. |
| Market expectations | Confirmed | Market Theme Radar classifies SERVER_DRAM as Accelerating with RS 67.74, momentum 87.10, breadth 100%, heat 0.64. |
| Valuation / expectation risk | Partial | Current market state is constructive, but the thesis must distinguish server strength from consumer-memory weakness and from Taiwan proxies' broader product mixes. |

## Catalysts

- Additional US CSP server-memory orders
- Continued agentic-AI / general-server RDIMM demand
- HBM capacity allocation constraining conventional DRAM supply
- 4Q26 Server DIMM contract-price increases
- Lower supplier inventories
- Higher-value server / AI mix at Taiwan memory proxies

## Fundamental confirmation

### Industry

TrendForce's 2026-09-30 updates provide the strongest current confirmation:

- Some CSPs are actively purchasing additional server DRAM, reducing supplier inventory.
- Improving server CPU availability is supporting higher RDIMM procurement.
- Front-end DRAM flexibility plus packaging/testing constraints prevent supply from fully matching demand.
- Server DRAM is expected to remain undersupplied in 4Q26.
- Conventional DRAM contract prices are forecast to rise 10–15% QoQ in 4Q26.
- Server DIMM contract prices are forecast to rise by more than 10% QoQ.
- LTA mechanisms may cause some suppliers' price increases to lag the market average.

### 南亞科 2408 — Cycle Proxy

- 2026Q2 DRAM ASP increased by more than 60% QoQ.
- 2026Q2 EPS was 14.66; 1H26 EPS was 23.38.
- Products used in AI infrastructure and servers represented more than 20% of 1H26 revenue.
- This confirms meaningful server/AI exposure, but not a pure Server DRAM revenue mix.

### 華邦電 2344 — Cycle Proxy

- 2026 EPS consensus has been revised upward.
- Product exposure is broader across specialty/commodity memory; a clean server-only revenue bridge was not verified in this run.
- Company-level Server DRAM sensitivity therefore remains Partial rather than Confirmed.

## EPS / consensus revisions

| Company | Year | Previous | Current | Change | Source/date | Verification |
|---|---:|---:|---:|---:|---|---|
| 南亞科 | 2026 | 62.92 | 66.98 | +6.45% | FactSet via Cnyes, 2026-09-18 | Confirmed |
| 南亞科 | 2027 | — | 110.23 | — | FactSet via Cnyes, 2026-09-18 | Current level confirmed; no same-release prior value |
| 華邦電 | 2026 | 24.87 | 25.37 | +2.01% | FactSet via Cnyes, 2026-09-08 | Confirmed |
| 華邦電 | 2027 | — | 50.05 | — | FactSet via Cnyes, 2026-09-08 | Current level confirmed; no same-release prior value |

## Contradictory evidence

1. **LTA limits pass-through speed.** TrendForce explicitly notes that pricing mechanisms in long-term agreements can make some suppliers' contract-price increases lag the market average.
2. **Consumer memory is not the same market.** Weak PC/smartphone demand can coexist with strong Server DRAM. The thesis must not infer a whole-memory-cycle reversal from client weakness.
3. **Taiwan names are imperfect proxies.** 南亞科 and 華邦電 have broader product portfolios, so industry pricing strength does not translate one-for-one into server-only earnings.
4. **Overbooking / pull-forward risk remains open.** Additional CSP orders need to be checked against sustained deployment, lead times and cancellation behavior.
5. **China capacity impact is still Unverified for high-end Server DDR5.** New Chinese DRAM output should not be assumed to pressure server DDR5 until actual product capability, qualifications and customer orders are observable.
6. **HBM crowd-out can change.** If advanced-capacity additions accelerate enough, the current scarcity mechanism could weaken even with healthy demand.

## Open questions

- Can Server DDR5 price increases persist from 4Q26 into 1H27, or are they partly replenishment/pull-forward?
- Are lower supplier inventories accompanied by persistently long lead times and low cancellation rates?
- How much of 南亞科 / 華邦電 earnings sensitivity actually comes from server products versus client/specialty DRAM?
- How restrictive are LTAs on realized ASP increases for the suppliers serving major CSPs?
- Does new Chinese DRAM capacity begin to qualify for and penetrate Server DDR5 rather than mainly client/legacy markets?

## What changed vs previous state

This is the first longitudinal SERVER_DRAM research baseline because SERVER_DRAM became an Active Theme in the 2026-10-02 GitHub state. The industry-level thesis is strongly supported by current CSP procurement, low supplier inventories, HBM capacity crowd-out and rising Server DIMM contract prices. The key limitation is company attribution: Taiwan-listed proxies benefit from the cycle, but their earnings cannot yet be mapped one-to-one to Server DRAM.

## Thesis assessment

**Thesis Strengthening**

The industry causal chain from demand to procurement, supply tightness, pricing and EPS expectations is strengthening. The thesis would weaken if add-on orders reverse, LTAs cap realized pricing for longer than expected, supplier inventories rebuild, lead times normalize quickly, or new capacity materially closes the server DDR5 supply gap.

## Sources

- TrendForce 4Q26 memory price outlook, 2026-09-30: https://www.trendforce.com/presscenter/news/20260930-13258.html
- TrendForce DRAM Market Bulletin, 2026-09-30: https://www.trendforce.com/research/download/RP260929DY
- TrendForce Server DIMM Price, 2026-09-30: https://www.trendforce.com/research/download/RP260930XF
- 南亞科 2026Q2 ASP / server-AI mix: https://www.moneydj.com/kmdj/news/newsviewer.aspx?a=62fd8cb3-0cae-42fb-ac03-c676d3a20533
- 南亞科 FactSet EPS consensus, 2026-09-18: https://gfemobile.cnyes.com/news/id/6610540
- 華邦電 FactSet EPS consensus, 2026-09-08: https://gfe-desktop.cnyes.com/news/id/6600446

## Change log

### 2026-10-02
- Created initial SERVER_DRAM second-layer research baseline.
- Confirmed CSP add-on demand, low supplier inventory, HBM crowd-out and 4Q26 Server DIMM price increases.
- Recorded 南亞科 2026 EPS revision 62.92 -> 66.98 (+6.45%).
- Recorded 華邦電 2026 EPS revision 24.87 -> 25.37 (+2.01%).
- Marked Taiwan-company server exposure as Partial rather than over-attributing the industry thesis.
- Thesis state set to Thesis Strengthening.


## Forward outlook update — 2026-10-04

Q4供給偏緊支持價格，但2027延續性取決於CSP部署、一般DRAM產能配置及LTA；不能將產業漲價直接等同台股代理公司的EPS。

- Horizon: 2026Q4–2027Q3
- Direction: Improving (research assessment, not price forecast)

- TrendForce預估Q4 conventional DRAM合約價季增10–15%，server仍供不應求；各供應商LTA條款會使實現價格落後。
  - Type: 產業報價預測; timing: 2026Q4; source date: 2026-09-30; source: https://www.trendforce.com/presscenter/news/20260930-13258.html
- 2027產能繼續移往server是供給配置線索；是否延伸為下一年台廠獲利，需下一季mix及價格驗證。
  - Type: 產業預測／供需; timing: 2027; source date: 2026-09-30; source: https://www.trendforce.com/presscenter/news/20260930-13258.html

### Change log
- Added source-dated forward outlook; existing causal-chain confidence and unresolved questions retained. This is not completion of all fundamental/EPS gaps.


## 2026-10-04 公司比較與證據補強

兩家公司都是記憶體景氣代理，並非等量的伺服器DRAM純標的。南亞科官方已有AI基礎設施／伺服器合計逾20%收入，但Q2量持平、主要受ASP推升；華邦以客製化記憶體與Flash為主，電腦應用15%不能全算伺服器。遠期EPS預期遠高於目前季度，需要報價、稼動與股本共同驗證；2028中位數並非兩家都繼續大幅提高，不能把低遠期本益比當無風險便宜。

### 南亞科 2408
9/18中位數預估2027 EPS110.23元較2026年66.98元高約64.6%；2028僅110.41元，顯示來源未假設永遠高速增長
- 2026Q2：Q2 EPS14.66、H1 EPS23.38，兩者分母分別為34.23億／32.62億加權平均股數；ASP季增逾60%、位元出貨持平
- 年度EPS：2026年66.98元／2027年110.23元／2028年110.41元；來源日2026-09-18
- 風險：高獲利由價格大升推動，出貨量未同步成長；如果報價回落，EPS分母可能快速下修。新廠2028計畫較遠，不能當近期已完成供給
- 下一步：ASP、位元出貨與加權股數；基準：Q2 ASP季增逾60%、位元持平、EPS14.66；2027預估110.23；若ASP或出貨偏離成長路徑，或新增股數壓低每股利益，重估遠期EPS及合理倍數
- 來源：2026-07-10 https://www.nanya.com/tw/IR/16/%E6%96%B0%E8%81%9E%E7%A8%BF?IRId=13150；2026-09-18 https://gfe-desktop.cnyes.com/news/id/6610540/print

### 華邦電 2344
9/8中位數2027 EPS50.05元較2026年25.37元近倍增；平均每季需12.51元，約為Q2 EPS5.40的2.32倍，只是預期強度試算，不是季節分配預測
- 2026Q2：Q2營收598.43億元、毛利率66.2%、歸母淨利243.17億元、EPS5.40；應用比例通訊29%、消費28%、車用工業28%、電腦15%
- 年度EPS：2026年25.37元／2027年50.05元／2028年48.73元；來源日2026-09-08
- 風險：2028 EPS中位48.73低於2027年的50.05，並非持續倍增；各年樣本不同亦須核對。高報價維持、滿載及產品組合是獲利前提；特定伺服器DRAM歸因不足；官方電腦相關15%涵蓋範圍較廣，不能冒充已核對純伺服器受惠
- 下一步：價格、產品組合與實際EPS成長；基準：Q2毛利66.2%、EPS5.40；2027年度中位50.05；若實現價格／產品組合／產量無法支持利潤提高，需下修預估，不能僅以產業缺貨維持高EPS
- 來源：2026-08-06 https://www.winbond.com.tw/hq/about-winbond/news-and-events/news/news00582.html?__locale=zh_TW；2026-09-08 https://news.cnyes.com/news/print/6600446


### 待辦結果
- SERVER_DRAM-gap-03：南亞科AI基礎設施與伺服器合計逾20%；華邦記憶體電腦應用15%，不是伺服器專屬。已補公司產品組合，精確伺服器DRAM利潤敏感度仍不足。
- EPS來源全部改為直接URL，補足2028；數值有日期，不將預估當實績。


## 2026-10-05 估值參照補充（非合理價）

行情固定為2026-10-02，取自既有GitHub Actions結果：https://github.com/bruce-913923/ai-sector-radar/blob/ed9a5f8ca5eb3d00d2733b7363580b7c237fe80c/state/priority-candidates.json

| 公司 | 收盤（元） | 2027 EPS（元） | 預估日期 | 參考本益比 | 預估來源 |
| --- | ---: | ---: | --- | ---: | --- |
| 南亞科 2408 | 526 | 110.23 | 2026-09-18 | 4.77 | https://gfe-desktop.cnyes.com/news/id/6610540/print |
| 華邦電 2344 | 179 | 50.05 | 2026-09-08 | 3.58 | https://news.cnyes.com/news/print/6600446 |

以上為收盤÷來源EPS的條件式計算，並非可直接使用的合理倍數或目標價。估計日期不同，不拿名目EPS或倍數直接排名；預估股本、經常性獲利、歷史／同業倍數與完整情境仍須補。沒有調整正式推薦門檻、行情或大盤分類。


## 2026-10-05 公司角色與來源時點複核

- 2408：南亞科官方H1 AI基礎設施與伺服器產品收入合計逾20%，可證明商業曝險，但無純伺服器DRAM拆分。Q2銷量持平、ASP大幅上升，當期收入改善主要由價格而非出貨量驅動；AI／WoW仍屬拓展計畫。 來源：https://www.nanya.com/tw/IR/16/%E6%96%B0%E8%81%9E%E7%A8%BF?IRId=13150（2026-07-10；查核2026-10-05）
- 2344：華邦Q2客製化記憶體53%是合併營收分母，電腦15%是記憶體產品應用分母，兩者不能直接相乘推算伺服器收入。CUBE官方2026年2月資料明定行動／邊緣／嵌入式AI用途，不能拿CUBE高頻寬規格證明資料中心HBM或伺服器DDR5訂單。 來源：https://www.winbond.com.tw/hq/about-winbond/news-and-events/news/news00582.html?__locale=zh_TW（2026-08-06；查核2026-10-05）

[CUBE官方產品資料](https://www.winbond.com/productResource-files/CUBE_20260212.pdf)（2026-02-12）定位邊緣AI，不能代替伺服器DDR5／HBM收入證據。純伺服器損益敏感度仍待補。


## 2026-10-06 增量：9月收入與Q4預測分開驗收

華邦電10/5官方公告9月合併自結28,248.909百萬元、月增3.44%、年增256.67%，前九月180,427.134百萬元；範圍含新唐與其他子公司，未經會計師查核。南亞科公司公告轉載9月45,091.089百萬元、前九月265,284.971百萬元、單月年增576.62%。其官網本次瀏覽遭阻擋，因此數字明列公開公告轉載來源，不假稱直接讀到原站全文。

兩者都沒有把伺服器DRAM收入／ASP獨立拆出，而且9月屬Q3。原9/30 TrendForce對Q4一般DRAM合約價季增10–15%的預測，不能用這組9月總營收結案。SERVER_DRAM-outlook-monitor-01保留原基準、waiting_event、結果unknown，下一步查Q4產品別合約價與位元出貨。

來源：
- 華邦官方（10/5）：https://www.winbond.com.tw/hq/about-winbond/news-and-events/news/news00591.html?__locale=en
- 南亞科公告轉載（10/5）：https://www.moneydj.com/kmdj/news/newsviewer.aspx?a=e3f66ceb-8f22-469f-8917-98ef67f340f5
