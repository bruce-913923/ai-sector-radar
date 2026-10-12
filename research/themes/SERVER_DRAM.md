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


## 2026-10-07 南亞科UBS三情境與高峰盈餘風險

UBS 9/18單券商模型預估2026／2027／2028 EPS76.97／116.41／125.68元，2029／2030降至41.15／11.87。位元出貨增加仍可能被ASP回落抵銷，低遠期本益比不能直接當便宜；年度稀釋股數與NTM淨值權重尚待調節。

9/18 UBS原件18頁，p1日期及p10 finalized 07:51GMT已核；p2三情境和p6年度股數目視。12個月保守／基準／樂觀目標380／640／800元，圖中2027年底BVPS190／231.35／200，隱含P/B2.0／2.8／4.0。640÷231.35=2.766取一位為2.8，不用647.78替換原目標；樂觀BVPS低於基準的原因原件未說明，保留限制。首頁3.16倍是NTM淨值基準，不能直接乘年底231.35。

情境2026／2027 ASP年增：保守320%／40%、基準370%／51%、樂觀390%／65%；營益率分別72%／73%、77%／77%、79%／80%。這些全為券商假設，非已實現價格或公司保證。

2027／2028／2029／2030 ASP假設3.31／2.70／1.15／0.72美元每Gb；位元出貨繼續增加，EPS卻在2029／2030降至41.15／11.87。10/7 GitHub已生成收盤514元對2027 EPS116.41為4.42倍，對2030 EPS11.87則43.30倍，顯示『低PE』高度依賴週期年份。原三情境價格距離−26.07%／+24.51%／+55.64%，未含股息，並非本站報酬承諾。

官方8/5核閱原件文字：Q2基本／稀釋EPS14.66／14.12，分母3,423.161／3,553.586百萬；H1 23.38／22.48、3,261.791／3,391.986百萬。UBS預估basic／diluted相同，2027後3,450百萬只是與期末普通股接近，未納明認股權／酬勞潛在稀釋調節；2026平均3,407亦需按私募時點橋接。

官方財報已在瀏覽器封鎖前取得全文文字；後續dot雲端browser被站方安全封鎖，停止該步，未宣稱官方原圖已驗。UBS關鍵原圖則已完成。華邦本輪未完成估值原件審查，不變更其結論；美光事件本輪未新增查核，不猜停產。

來源：
- UBS：https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2408_UBS_20260918.pdf（2026-09-18）
- 官方核閱財報：https://www.nanya.com/tw/Activity?Action=Get_IRFinancialReport_FileName&Id=130（2026-08-05）
- 10/7既有行情：https://github.com/bruce-913923/ai-sector-radar/blob/629e349be3872bc5ded337a5fa033be2ea964631/state/priority-candidates.json

股數及NTM權重／情境淨值說明仍待補，估值待辦保留in_progress。原FactSet與新UBS數字分列；前版日期未明，不自行算跨來源revision。


## 2026-10-07 19:10 摘要用詞更正

報價回落可能使獲利及EPS下降；舊結構摘要「EPS分母下修」用詞不精確，已更正。EPS本身是本益比計算的分母，但EPS的股數分母不會僅因報價下跌而機械減少。本次沒有改原始價格、模型數字或預測版本。


## 2026-10-07 20:28 南亞科外部情境採用

南亞科採用UBS9/18同份原報的380／640／800元公司級外部三情境，期限約至2027年9月；按原報條件引用，不稱已全部重建。2027基準權益／股數可核；NTM淨值權重、樂觀淨值低於基準及年度稀釋調節仍保留，整筆估值任務未結案。

選同一UBS9/18原報與12個月期限，不拼接券商極值，也不把低高峰P/E視為便宜。保守／基準／樂觀ASP年增假設2026為320%／370%／390%、2027為40%／51%／65%；相應營益率2026為72%／77%／79%、2027為73%／77%／80%。相對10/7既有514元，價差約−26.07%／+24.51%／+55.64%，不含股息。

2027原模型權益798,187百萬元÷3,450百萬普通股≈231.3586元，與原表231.35近似。640÷231.35≈2.766倍，2.8是取整；原首頁3.16倍屬NTM，640÷3.16隱含202.5316並非已取得原始時間權重，不能任意插值。樂觀BVPS200低於基準231.35的差異未解，不編造原因。

10/5公告前九月營收265,284.971百萬元，減原報取整Q1／Q2，Q3約133,649百萬元，約高於UBS預估0.66%；季度值是推算約數。全年402,823模型扣累計，Q4尚需約137,538百萬元，是達標差額而非新增預測。收入支持不等毛利86.1%、ASP季增50%或EPS26.44已驗證，更不能驗收Q4產業漲價。

SERVER_DRAM-2408-valuation-evidence保留進行中：已完成外部情境採用與基準淨值橋接；NTM權重、樂觀淨值差異及年度稀釋仍待核，未另造已解小卡增加完成數。H2股數固定期末值僅診斷性假設，不以此差異逕判券商錯誤。

- [UBS原件](https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2408_UBS_20260918.pdf)
- [10/5公司自結營收轉載](https://www.moneydj.com/kmdj/news/newsviewer.aspx?a=e3f66ceb-8f22-469f-8917-98ef67f340f5)


## 2026-10-12 batch2 外部研究：華邦估值、南亞科UBS淨值／稀釋、伺服器DRAM拆分

研究時間：2026-10-12T01:07:00+08:00；基準commit：3993971。不使用2026年9月營收或未公布Q3財報；不含市場分類與技術門檻。

### 華邦電 2344 — 估值任務維持進行中（大摩三情境僅作外部參考）

- 官方股本（[115Q2核閱財報](https://doc.twse.com.tw/server-java/t57sb01?step=1&colorchg=1&co_id=2344&year=115&mtype=A) p.4、37、45，2026-08-06）：6/30已發行4,500,000仟股、無庫藏股；Q2／H1基本加權4,500,000仟股，稀釋4,504,215／4,504,598仟股；Q2 EPS5.40、H1 7.65；歸母權益165,009,628仟元（BVPS約36.67元，推算）。
- 期後股本事件（MOPS 115/08/03）：海外ECB4全數轉換，約+220.49百萬股（推算），轉換後約4,720.5百萬股（推算，待正式登記）。9/16董事會另決議國內CB4／CB5上限180億元（轉換價未定）及約353.92億元全現金收購Infineon NOR／F-RAM事業（占歸母權益69.7%）。
- FactSet 2027 EPS50.05合理性：×4,500百萬股≈2,252億元歸母淨利（推算），與MS 2027e淨利2,242億元、營收4,951億元（淨利率45.3%）一致，**不是單位或股數錯誤**；但屬ECB4轉換前股本，以約4,720.5百萬股計EPS約稀釋4.7%（推算）。最新FactSet（rateDate 10/02）2027中位數50.27（n=9，32.04–69.97）、2028 69.94僅n=2。
- [MS 8/16](https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2344_MS_20260817.pdf)（第三方轉載）P/B三情境，期限12–18個月；**僅作外部情境參考（收購與ECB4轉換前），未採用為結案依據**：

| 情境（參考） | 價值（元） | 原文倍數 | 推算倍數（÷100.18） | 原文假設 | 相對10/8收盤177.0（僅參考） |
|---|---:|---:|---:|---|---:|
| 保守 | 118 | 1.2x 2027e BVPS | 1.18 | NOR跌價、DRAM回到供過於求、製程轉換放慢 | −33.33% |
| 基準 | 288 | 2.9x 2027e BVPS（5.7x 2026e） | 2.875 | 上行週期利潤率擴張；DRAM ASP 2026e +284%／2027e +37%，NOR +153%／+39% | +62.71% |
| 樂觀 | 342 | 3.4x 2027e BVPS | 3.41 | NOR大漲、DRAM持續大漲、25nm占營收逾80% | +93.22% |

- 股本：MS 2027e淨利224,234÷EPS49.83＝4,500.0百萬股，與官方6/30一致；但ECB4已於8/3全數轉換，轉換後約4,720.5百萬股（推算，差約4.9%），**股本不可比**。推算P/B端點影響約+0.2%～+0.4%、EPS約−4.7%，只是診斷，不代替以轉換後股本建模的券商情境。
- 未結案理由（Supervisor審核）：(1) 股本不可比；(2) 9/16 Infineon收購（約353.92億元）與CB4／CB5（上限180億元）未入模型；(3) 基準2.9倍遠高於0.5–1.5倍歷史區間且只有一家三情境。下次檢查2026-10-26：收購後具名三情境、CB4／CB5定價、ECB4轉換後股本登記。
- 限制與反證：第三方轉載；MS季度BVPS只累加EPS（2Q26 33.0 vs 官方36.67，推算），未扣股利／未含OCI；基準2.9倍高於MS所引2017年以來0.5–1.5倍歷史區間上緣；報告早於Infineon收購與國內CB計畫；只有MS一家完整三情境，FactSet目標價中位數233（n=10）只作交叉檢查，不平均。行情取自[GitHub Actions 10/8](https://github.com/bruce-913923/ai-sector-radar/blob/a87323148146abf2a9e806f588c6c07085e7fb8e/state/priority-candidates.json)。

### 南亞科 2408 — UBS淨值與稀釋核對（任務改waiting_event）

- (iii) 已以[官方核閱財報](https://www.nanya.com/tw/Activity?Action=Get_IRFinancialReport_FileName&Id=130)核對：6/30股本3,450.206百萬股；私募351.578百萬股（基準日2026-04-08）；員工認股權流通135.286百萬單位、加權履約價32.77元；Q2稀釋增量121.276＋9.149百萬股。UBS basic＝diluted、未納入這些稀釋；推算2027E EPS約112.17元（−3.64%）、全數履約BVPS約223.85元（−3.2%）。UBS 2026平均3,407百萬股可由季EPS加總重現（推算）。
- (i) NTM淨值時間權重：UBS p.8只說依長期ROE與股權成本訂NTM P/BV；p.2現價525元＝2.59倍，隱含NTM BVPS約202.70，與640÷3.16＝202.53一致（推算），但多種組合可重現，**原件未說明**。
- (ii) 樂觀BVPS200低於基準231.35：p.2三列皆標BVPS 12/27E、無註腳，**原件未說明**，不以日期基礎不同解釋。另UBS 2Q26權益較官方低5,887.5百萬元，原因未說明。
- 380／640／800元外部三情境維持採用，任務等待UBS新版或原始管道版本，不自行插值。

### 伺服器DRAM營收占比與價格敏感度（gap-03，waiting_event）

- 南亞科：[2025年報](https://www.nanya.com/tw/Activity?Action=Get_IRannualreport_FileName&Id=25) FY2025資料中心與伺服器約5%（含RDIMM、BMC、NIC）；[2Q26簡報](https://www.nanya.com/Content/InvestorCalendar/5722_20260710_2Q26_Investor%20Conference_CN.pdf) p.17 1H26「AI基礎設施及伺服器」逾20%（含eSSD／SmartNIC／BMC，口徑不同，不能當伺服器DRAM四倍）；[1Q26簡報](https://www.nanya.com/Content/InvestorCalendar/5692_20260413_1Q26_Investor%20Conference_CN.pdf) p.19 DDR5約占營收10%。財報收入細分無應用別。
- 華邦：[2Q26簡報](https://www.winbond.com/export/sites/winbond/about-winbond/investor/investor-conference/2Q26-investor-conference_CH_Final.pdf) CMS 53%、記憶體應用電腦15%（不同分母），資料中心只列為CMS需求動能；[2025年報](https://www.winbond.com/export/sites/winbond/about-winbond/investor/financial-information/annual-report/report/2025-Winbond-Annual-Report_ZH.pdf) p.71利基DRAM為64Mb–8Gb SDR至DDR4，應用描述含服務器與資料中心，但未列DDR5／RDIMM，伺服器占比未揭露。
- 敏感度：UBS只有整體DRAM ASP情境（無每10%表），凱基7/30為DRAM＋Flash合併調整；本站靜態推算整體ASP±10%：南亞EPS約±1.94元／季、華邦CMS約±0.57元／季，**不是伺服器拆分**。
- 未來1–2季機制：[TrendForce 9/30](https://www.trendforce.com/presscenter/news/20260930-13258.html) 4Q26一般DRAM合約價季增10–15%，伺服器DRAM仍供不應求但部分供應商因LTA落後；南亞LTA約50%產能、華邦約五成1–2年長約。不驗收Q4實績。
- 等待：南亞科Q3法說（Evidence Agent稱10/12 15:00，以公司公告為準）、華邦3Q26法說、TrendForce更新。

### Change log — 2026-10-12 batch2
- SERVER_DRAM-2344-valuation-evidence：in_progress → in_progress（官方股本與50.05合理性已核；MS三情境僅參考，股本不可比、收購／CB未入模型，不結案）。
- SERVER_DRAM-2408-valuation-evidence：in_progress → waiting_event（稀釋已核對；NTM權重與樂觀BVPS差異原件未說明）。
- SERVER_DRAM-gap-03：in_progress → waiting_event（兩家皆未揭露純伺服器DRAM占比與伺服器專屬敏感度）。
- 新增華邦FactSet 10/02及MS 8/16 EPS列；coverage：2344估值→in_progress、2408估值→in_progress。

## 2026-10-12 SERVER_DRAM 2408 公司scope補查（gap-01/02/04；partial，0 resolved）

基準commit 7f68f50567f5a5f06481cfbd7b7a2efbb540ce02；僅南亞科2408三個scope，不新增9月營收、未公告Q3、估值/EPS或其他公司。
- gap-01：南亞科2Q26官方簡報（2026-07-10，PDF pp.6–7、12、14、16–17；https://www.nanya.com/Content/InvestorCalendar/5722_20260710_2Q26_Investor%20Conference_CN.pdf）顯示公司整體位元出貨季持平、ASP季增>60%、庫存低水位、AI基礎設施/伺服器廣義營收>20%及多年度LTA；1Q26簡報（2026-04-13，pp.14、16–17；https://www.nanya.com/Content/InvestorCalendar/5692_20260413_1Q26_InvestorConference_CN.pdf）/新聞稿（lines79–82；https://www.nanya.com/tw/IR/16/%E6%96%B0%E8%81%9E%E7%A8%BF?IRId=12105）確認四大客戶與多元DRAM穩定供應協議。具名法說鏡像（2026-07-10，lines157–176、348–352；https://www.investing.com/news/transcripts/earnings-call-transcript-nanya-technology-posts-q2-2026-profit-surge-on-pricing-93CH-4786239?ampMode=1）說固定量/價與按市場價LTA及供應緊時難滿足double-booking/pull-in。美系CSP、純Server DRAM客戶/產品/期間/數量分母、取消/重複單與部署均Unknown。

- gap-02：Capital Futures轉載工商時報授權稿（原始2026-07-10、轉載2026-07-11，lines111–124；https://www.capitalfutures.com.tw/zh-tw/financial/globalarticle?category=all&contentid=c26071100152）稱LTA約供應量50%，期限一季至數年，價格/供應量依客戶產品組合、需求規模及合作模式協商、無制式合約；非Server DDR5分母。2Q26簡報同上（pp.7、13、15、17）與1Q26簡報（2026-04-13，pp.13、17、20；https://www.nanya.com/Content/InvestorCalendar/5692_20260413_1Q26_InvestorConference_CN.pdf）僅支持整體ASP、庫存、廣義AI/伺服器>20%及DDR5約10%營收。年報（2026-04-23，printed pp.97、99、113；https://www.nanya.com/tw/Activity?Action=Get_IRannualreport_FileName&Id=25）一至兩個月為製程cycle time，不是客戶交期。Server DDR5價格/公式、lead time/SLA、產品分母、take-or-pay、預付款、floor/ceiling、庫存量/天數/金額與毛利均Unknown。

- gap-04：TrendForce原始稿（2026-06-02，HTML lines10–21；https://www.trendforce.com/presscenter/news/20260602-13074.html）估前三大供應商HBM wafer-input占總DRAM wafer input約18/22/30%（2025/26/27），bit supply約8/9/13%，分母不同。TrendForce轉述Samsung（2026-09-29，lines5–20；https://www.trendforce.com/news/2026/09/29/news-samsung-sees-hbm-taking-nearly-30-of-industry-dram-capacity-in-2027-up-from-20-currently）稱產業HBM wafer capacity約20%→2027近30%；轉述Micron（2026-08-12，lines17–24；https://www.trendforce.com/news/2026/08/12/news-micron-flags-hbm4e-as-start-of-custom-hbm-era-hbm-market-could-tilt-toward-dual-or-single-suppliers）稱HBM3E:DDR bit約1:3、HBM4/HBM4E近1:4。南亞科官方2Q26新聞稿（2026-07-10，lines77–84；https://www.nanya.com/en/IR/16/Press%20Release?IRId=13150）及Fab5A公告（2026-08-05，lines75–85；https://www.nanya.com/en/IR/16/Press%20Release?IRId=13160）未揭露HBM/一般DRAM allocation；公司node/die/yield/TSV、產品/客戶/訂單及EPS橋均Unknown，產業比率不得套用2408。

下一步：等待公司原始披露補產品×客戶×期間×數量/價額/分母、Server DDR5交期及HBM/一般DRAM wafer allocation；三項維持partial/in_progress。

## 2026-10-12 Q4合約價基準追蹤（SERVER_DRAM-outlook-monitor-01；waiting_event／unknown）

題材今日由 Codex 組移交 Claude 組（第四批）。證據截止 2026-10-12 12:51（台北）；未使用9月營收；南亞科2026Q3法說（MOPS 列10/12 15:00）當時尚未舉行、未公告，未使用。

- **基準原文核對**：[TrendForce 9/30](https://www.trendforce.com/presscenter/news/20260930-13258.html) 附表（頁圖目視）4Q26F conventional DRAM 季增10~15%、HBM blended 15~20%；3Q26E conventional 13~18%。正文（文字層）：server DRAM 4Q26仍供不應求，部分供應商因 LTA 計價機制漲幅落後市場平均；**server 單獨漲幅%已查無揭露**。
- **實績**：[DRAMeXchange 合約價公開頁](https://www.trendforce.com/price/dram/dram_contract) 最新仍為2H Aug（Last Update 2026-08-31）；10月／4Q26合約價未公開。TrendForce 10/8 筆電稿與10/12 News（CXMT 年底推 4F² DDR5 RDIMM，上市不等於量產）都沒有修正 Q4 預估。
- **券商預估（皆 oilgoldalpha 第三方鏡像，不是實績）**：
  - [麥格理 10/7](https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2408_Macquarie_20261007.pdf) p.1（頁圖目視）：4Q26與2027續漲但幅度明顯收斂；推測南亞科3Q ASP 跳升大於大廠，因部分半年約在3Q前重訂（券商推測）。無 Q4 數字、無 server 分項。
  - [大和 10/7](https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2408_Daiwa_20261008.pdf) p.2 key assumptions（頁圖目視）：南亞科4Q26E ASP 季增+7.5%、位元−5.0%（公司混合口徑，**不能和10–15%直接比較，不判偏離**）。
  - [元富 10/2](https://www.oilgoldalpha.com/report-file?path=reports%2Fsectors%2F20261002_%E5%85%83%E5%AF%8C%E6%8A%95%E9%A1%A7_sector_2027%E8%A8%98%E6%86%B6%E9%AB%94%E7%9F%BD%E6%99%B6%E5%9C%93%E7%94%A2%E6%A5%AD%E5%B1%95%E6%9C%9B.pdf) p.8（頁圖目視）：4Q26F 傳統型 DRAM Up 10–15%（原估5–10%），來源標 Trendforce，屬轉述、不是獨立來源；p.7 LTA 表：南亞科約50%產能（季至多年）、美光有價格上下限、三星／Hynix 只設下限（券商整理）。
- **判斷**：方向與基準一致（續漲、幅度收斂），無反證；但沒有實績、未到觀察終點，結果維持 unknown，status 維持 waiting_event。
- **下次檢查**：2026-10-19，或南亞科Q3法說公告後（Supervisor 另批）、TrendForce／DRAMeXchange 公布10月／4Q26合約價時，先到者為準。

### Change log — 2026-10-12 b4
- SERVER_DRAM-outlook-monitor-01：waiting_event → waiting_event；assessment unknown → unknown（舊 result 存 prior_result）；next_check 2026-10-07（已到期）→ 2026-10-19；append latest_evidence 7筆、history 1筆。coverage 不變。

## 2026-10-12 南亞科2026Q3自結／法說事件批（SERVER_DRAM；6 task，0 resolved）

**事件與時點**：南亞科2026-10-12公布2026Q3自結合併財務（**未經會計師核閱**）。公司IR法說行事曆（IRId=5298）新聞稿與中文簡報伺服器Last-Modified 13:58（台北），PDF建立時間新聞稿12:14、簡報13:51；15:00–16:00線上法說（會前另有記者會）。MOPS兩次會後重查（16:04、16:35）：法說檔欄仍「內容檔案於當日會後公告」、10/12重訊查無、Q3財報查無。以下Q3數字一律為2026Q3自結、未經會計師核閱，公司2026-10-12公布。**未使用9月營收。**

- **實績**（[新聞稿](https://www.nanya.com/Content/InvestorCalendar/6729_20261012_%e6%96%b0%e8%81%9e%e7%a8%bf_%e5%8d%97%e4%ba%9e%e7%a7%91%e6%8a%802026%e5%b9%b4%e7%ac%ac3%e5%ad%a3%e8%b2%a1%e5%8b%99%e5%a0%b1%e5%91%8a.pdf)、[簡報](https://www.nanya.com/Content/InvestorCalendar/6729_20261012_3Q26_Investor%20Conference_CN.pdf)，頁圖目視）：營收133,649百萬元（季增61.9%）、毛利率85.7%、淨利87,627百萬元、EPS 25.40（加權3,450百萬股）、前三季EPS 49.28（3,325百萬股）、BVPS 118.99。ASP「季增超過六十位數百分比」、位元「季減中個位數百分比」；簡報p.7註(1)：ASP上漲主因**長期合約重新簽訂**。
- **gap-03（waiting_event／partial）**：「AI基礎設施(含伺服器、網路、儲存及系統管理)占營收超過20%」未標期間，與1H26「AI基礎設施及伺服器」口徑改寫，不串時間序列；純伺服器DRAM／RDIMM占比與敏感度**not_disclosed_in_checked_sources**。DDR5約10%為法說媒體轉述再確認；「明年衝四成」僅見標題。華邦未處理。
- **outlook-monitor-01（waiting_event／unknown）**：公司Q4只說平均售價「預期可望延續」；媒體轉述Q4續漲、無幅度、LTA覆蓋率50–70%（分母未說明）、舊LTA 6月底到期7月重定價。方向一致無反證，但混合ASP不代替合約價，等TrendForce 10月／4Q26實績。
- **gap-01／02（in_progress／partial）**：無具名CSP、Server DDR5價格、交期、庫存或LTA分母；媒體轉述美系／美西客戶AI ASIC記憶體小量出貨（未具名、未稱CSP）、客戶希望把3個月約延長到3年（協商中）。
- **gap-04（in_progress／partial）**：無HBM／一般DRAM wafer allocation；新廠「全產能5萬片（2030）」與8/5「5A最大約45,000片」差異未說明；屏東3D封測未稱HBM，WoW鍵合目前不在公司內部做（媒體轉述）。
- **valuation（waiting_event／partial）**：Q3股本橋（推算）——UBS 2026平均3,407百萬股較全年基本推算3,356.77高1.50%；Q3 EPS較UBS 3Q26E 26.44低3.93%（費用與稅率，非股數）；UBS 2Q26權益差5,887.5百萬元已數字對帳（推算：UBS於2Q26另扣股利5,135，官方FY2025股利已在Q1認列、Q2保留盈餘變動＝Q2淨利；UBS原件未說明原因）。NTM淨值權重、樂觀BVPS仍未解；麥格理、大和皆單一TP；新增「客戶／策略夥伴入股（協商中）」監控。
- **FactSet中位數**（鉅亨API，rateDate 10/08）：2026／2027／2028＝74.69／116.41／129.71元；與9/18並列，不計修正率。
- **下次檢查**：gap-01／02／04與valuation維持2026-10-19（他人既定日期，Supervisor不覆蓋；MOPS會後檔／逐字稿上線、入股或股本事件重訊為事件觸發，可提前）；gap-03、outlook-monitor-01於2026-10-19（或華邦法說日期、TrendForce 10月合約價先到）。
