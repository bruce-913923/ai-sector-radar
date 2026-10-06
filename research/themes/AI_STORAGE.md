# Enterprise SSD／AI Storage

研究資料基準：2026-10-02；首次整理發布：2026-10-03（Asia/Taipei）。本研究不改變市場強弱分類，也不是買賣建議。

## Current thesis
企業SSD、KV cache與AI平台帶來可見的儲存需求，群聯已披露廣義AI ecosystem占比；威剛現階段仍需拆分記憶體循環與AI專屬曝險。高成長不能掩蓋存貨、非經常收益及分類過寬的風險。

待驗證假說：AI訓練/推論資料、模型checkpoint與KV cache提升高容量低延遲SSD需求，控制器韌體與客製化可增加附加價值；模組商能否持續受惠需看成本、庫存與終端組合。

研究狀態：Updated；Thesis：Thesis Intact

## Causal chain
- **需求 — Confirmed**：AI推論KV cache等需求有原廠產品供貨依據，企業儲存不只依賴PC換機。 [來源](https://investors.micron.com/news/press-release/2026/Micron-Technology-Inc--Reports-Record-Fiscal-Fourth-Quarter-and-Full-Year-2026-Results/default.aspx)（2026-09-30）
- **訂單 — Partial**：群聯AI ecosystem已有收入；尚缺eSSD獨立客戶合約、設計導入到訂單金額。 [來源](https://www.phison.com/wp-content/uploads/2026/08/2Q26_Phison-Earnings-Call_EN_Official_uploaded-version.pdf)（2026-08-13）
- **供需 — Partial**：NAND供應與價格影響備貨與毛利，未核對同日NAND報價或全市場缺口。 [來源](https://www.phison.com/wp-content/uploads/2026/08/20260813_PHISON-8299_2Q26-Consolidated-Financial-Report-Announcement_Eng_Official.pdf)（2026-08-13）
- **產能／稼動率 — Unverified**：群聯是控制器/方案商、威剛是模組品牌，不能套用NAND晶圓廠稼動率；專屬出貨量缺。
- **ASP／產品mix — Partial**：群聯38%廣義AI ecosystem mix已披露，非eSSD單一占比；威剛AI mix未知。 [來源](https://www.phison.com/wp-content/uploads/2026/08/2Q26_Phison-Earnings-Call_EN_Official_uploaded-version.pdf)（2026-08-13）
- **營收 — Confirmed**：兩家公司Q2營收已核對，但AI enterprise單獨營收仍不可完整拆分。 [來源](https://www.phison.com/wp-content/uploads/2026/08/20260813_PHISON-8299_2Q26-Consolidated-Financial-Report-Announcement_Eng_Official.pdf)（2026-08-13）
- **毛利／營益率 — Partial**：群聯65.3%、威剛42.1%是整體季度毛利；庫存成本、產品組合與漲價影響需拆。 [來源](https://www.xpg.com/en/news/1326)（2026-07-28）
- **EPS — Unverified**：季度EPS不是年度revision；群聯另含權益法投資收益，年度共識仍缺。 [來源](https://www.phison.com/wp-content/uploads/2026/08/2Q26_Phison-Earnings-Call_EN_Official_uploaded-version.pdf)（2026-08-13）
- **市場預期 — Unverified**：缺可靠同日市場預期/擁擠度，不能用公司願景判定正預期差。
- **評價 — Unverified**：缺可比forward EPS及同日估值，保留未知。

## Leader / beneficiaries
- 8299 群聯（Leader）：控制器/韌體及企業SSD與AI平台具體，38%為廣義AI分類。[來源](https://www.phison.com/wp-content/uploads/2026/08/2Q26_Phison-Earnings-Call_EN_Official_uploaded-version.pdf)
- 3260 威剛（High Beta）：模組/記憶體循環實績強；AI企業儲存專屬收入仍未知。[來源](https://www.xpg.com/en/news/1326)

## Fundamental confirmation
- 2026-08-13：群聯Q2營收67,888百萬元、毛利率65.3%、營業利益26,370百萬元、TIFRS EPS118.57；存貨91,792百萬元、週轉297天，仍有價格與庫存風險。 [原始來源](https://www.phison.com/wp-content/uploads/2026/08/20260813_PHISON-8299_2Q26-Consolidated-Financial-Report-Announcement_Eng_Official.pdf)
- 2026-08-13：群聯AI ecosystem收入占38%，分類同時涵蓋enterprise SSD、aiDAPTIV、AI PC、networking、server及boot drive，不能稱純enterprise SSD占38%。權益法投資收益貢獻EPS14.22；研發與平台費用增加。 [原始來源](https://www.phison.com/wp-content/uploads/2026/08/2Q26_Phison-Earnings-Call_EN_Official_uploaded-version.pdf)
- 2026-07-28：威剛Q2營收38,143百萬元、營業利益12,765百萬元、毛利率42.1%、EPS32.39；營收季增46.15%，營業利益季增僅3.96%，不可將記憶體漲價全歸因AI SSD。 [原始來源](https://www.xpg.com/en/news/1326)
- 2026-09-30：美光指出7600 Gen5/9650 Gen6 SSD供貨AI KV cache應用、6600 ION放量；屬全球終端需求證據，不是群聯或威剛已接到相同訂單。 [原始來源](https://investors.micron.com/news/press-release/2026/Micron-Technology-Inc--Reports-Record-Fiscal-Fourth-Quarter-and-Full-Year-2026-Results/default.aspx)

## Catalysts
- Gen5/Gen6企業SSD量產導入
- AI平台客戶部署與企業收入細分
- NAND供應/價格與庫存去化

## EPS / consensus revisions
季度實際EPS與年度consensus revision是不同指標。本次未取得同口徑、同年份、有日期的前次/本次年度預估配對，全部維持null／Unconfirmed；不得捏造上修幅度或把當季EPS年化。

## Contradictory evidence
- 群聯38% AI ecosystem混合多種產品，不等於純企業SSD收入。
- 群聯存貨週轉297天，較去年221天高；庫存及NAND價格反轉仍可能侵蝕獲利。
- 群聯權益法投資收益貢獻季度EPS14.22，不能將118.57直接年化。
- 威剛Q2營收季增46.15%但營業利益僅季增3.96%，成長與獲利彈性並不相同。
- 群聯簡報收入表YoY欄276.5%與新聞稿279.5%不一致；以67,888/17,890重算約279.5%，保留原始差異待後續確認。
- 公司稱AI帶來長期結構成長屬策略看法，不能消除NAND景氣循環。

## Open questions
- 群聯enterprise SSD與其他AI ecosystem產品的收入和毛利如何拆分？
- 存貨金額與週轉能否隨銷售同步下降？
- 威剛AI企業儲存占比和客戶認證是否可驗證？
- NAND成本/報價與非經常收益各貢獻多少獲利？

## Research focus
- 追enterprise SSD獨立收入
- 追存貨與現金轉換
- 核对威剛AI商業連結
- 補年度EPS revision和估值

## Change log
- 2026-10-03：首次建立AI Storage baseline，對照群聯與威剛不同商業機制。 加入9/30美光終端需求證據、群聯廣義AI mix與庫存風險、威剛營收/營益不同步反證。 保留待驗證內容，後續增量更新。


## Forward outlook update — 2026-10-04

Enterprise SSD需求與QLC應用支持成長，client端仍弱；控制器和模組廠能否受惠要看企業級營收占比及成本，不能把NAND漲價一律視為利多。

- Horizon: 2026Q4–2027Q3
- Direction: Improving (research assessment, not price forecast)

- TrendForce預期enterprise SSD需求強、Q4漲幅加速，PCIe6.0與高容量QLC構成下一段產品升級。
  - Type: 產業預測／新產品; timing: 2026Q4–2027; source date: 2026-09-30; source: https://www.trendforce.com/presscenter/news/20260930-13258.html
- 同份報告指出消費端库存與成本壓力、模組廠採購保守；須核對群聯/威剛實際企業級mix及庫存收益。
  - Type: 產業反證／成立條件; timing: 2026Q4–2027Q1; source date: 2026-09-30; source: https://www.trendforce.com/presscenter/news/20260930-13258.html

### Change log
- Added source-dated forward outlook; existing causal-chain confidence and unresolved questions retained. This is not completion of all fundamental/EPS gaps.


## 2026-10-05 逐公司增補

AI儲存需求與記憶體報價循環要拆開：群聯具控制器／韌體和企業平台價值，38%廣義AI收入不能等同企業SSD；威剛營收仍受DRAM與模組循環影響。群聯三年EPS共識逐年回落，威剛H1營運現金為負，均要求以正常化毛利、產品貢獻和收現衡量展望，而非只看高峰年度EPS。

### 群聯

企業級SSD、控制器／韌體與AI平台支持需求，但9/23共識EPS2026／2027／2028為409.86／336.15／243.73元，預期2027較2026下降約18%、2028再降約27.5%。AI需求成長不代表高峰利潤可永久維持，應驗收產品價值與NAND循環、庫存成本及研發投入。

2026Q2：TIFRS基本EPS118.57，Non-TIFRS119.10分開；H1公司公告EPS187.43，不能用兩個季度四捨五入EPS直接相加取代。

2026Q2：廣義AI生態收入38%包括企業SSD、aiDAPTIV、AI PC、網通、伺服器及開機碟，非純企業SSD。研發15,099百萬元、營業費用17,965百萬元。存貨91,792百萬元、週轉297天，應收38,769百萬元較Q1 22,750增加。

反證：權益法投資收益貢獻Q2 EPS14.22，扣除此單項約104.35不等完整扣非EPS。庫存雖較Q1週轉315天改善，仍高於去年221天；2027EPS共識分歧132.16–618元，不能用單一高峰年度低本益比判斷便宜。

追蹤：2026/27/28共識409.86/336.15/243.73；存貨297天；下一季企業產品收入、NAND成本、存貨與EPS共識；出貨增加但毛利、現金或正常化EPS惡化；市場預期進一步下修

- 2026-08-13 https://www.phison.com/wp-content/uploads/2026/08/20260813_PHISON-8299_2Q26-Consolidated-Financial-Report-Announcement_Eng_Official.pdf
- 2026-08-13 https://www.phison.com/wp-content/uploads/2026/08/2Q26_Phison-Earnings-Call_EN_Official_uploaded-version.pdf
- 2026-09-23 https://news.cnyes.com/news/print/6613881

### 威剛

記憶體上行循環支撐2026出貨與獲利，但Q2營收季增46.15%時營業利益僅增3.96%，已顯示成本／產品組合吸收部分漲價利益。未來2–4季須驗證企業SSD實際貢獻、存貨回收與正常化毛利，不能把DRAM或消費模組收益全部歸為AI儲存。

2026Q2：營業利益12,765百萬元、歸母淨利10,402百萬元；H1 EPS62.46、加權股數319百萬股，Q2約321百萬股，EPS基準需留意稀釋。

2026H1：核閱合併報告英文原件鏡像：營業現金淨流出8,392.303百萬元；與H1高獲利並存，須追營運資金占用。鏡像8/21上架不是財報核閱日期。

反證：H1營業現金流為負，不能以現金餘額或淨利創高取代收現驗收；季度毛利由Q1約55.7%降至42.1%。具名最新年度EPS來源與2027預估仍待確認，未採網誌混合年份／匿名法人數字。

追蹤：Q2營收38,143百萬元、營益12,765百萬元；H1營運現金負8,392.303百萬元；下一季財報、存貨與產品別月營收；NAND／DRAM價格回落、存貨去化慢或收入持續成長但現金流仍為負

- 2026-07-28 https://www.xpg.com/en/news/1326
- 2026-07-28 https://cdn.financialreports.eu/financialreports/media/filings/72829/2026/RNS/72829_rns_2026-08-21_3cfb975e-9b43-4f05-9d18-baccf172d85c.pdf


## 2026-10-05 估值參照補充（非合理價）

行情固定為2026-10-02，取自既有GitHub Actions結果：https://github.com/bruce-913923/ai-sector-radar/blob/ed9a5f8ca5eb3d00d2733b7363580b7c237fe80c/state/priority-candidates.json

| 公司 | 收盤（元） | 2027 EPS（元） | 預估日期 | 參考本益比 | 預估來源 |
| --- | ---: | ---: | --- | ---: | --- |
| 群聯 8299 | 2095 | 336.15 | 2026-09-23 | 6.23 | https://news.cnyes.com/news/print/6613881 |

以上為收盤÷來源EPS的條件式計算，並非可直接使用的合理倍數或目標價。估計日期不同，不拿名目EPS或倍數直接排名；預估股本、經常性獲利、歷史／同業倍數與完整情境仍須補。沒有調整正式推薦門檻、行情或大盤分類。


## 2026-10-05 商業連結與年度預估來源核對

威剛9/3官方公告確認TRUSTA供應PCIe Gen5企業SSD與DDR5 R-DIMM，並稱已在AIC、神雲／MiTAC、ASRock Rack及技鋼部分伺服器平台通過相容驗證。AI儲存商業連結已有產品與平台層證據；相容名單不等於採購訂單、收入金額或企業SSD獨立利潤。

來源：[公司原文](https://trusta.adata.com/en/news/1/)；發布2026-09-03，2026-10-05查核。

年度預估來源查核：公開聚合頁可見預估，但未提供可核對的原始預估版本日期、具名法人及股本口徑；另查到舊版與生成式摘要，不能當最新共識。 [查核頁面](https://toalpha.tw/stock/3260/estimates)。未將線索寫成已確認年度EPS，估值及收入歸因缺口仍保留。


## 2026-10-05 逐公司產品角色驗收

- 8299：群聯Pascari D206V為企業／資料中心PCIe Gen5 SSD，U.2最高245.76TB；與aiDAPTIV記憶體分層方案、消費型SSD控制器分開。官方高價值應用收入逾80%包含車用、工控、遊戲等，不能全部歸為企業SSD或AI收入；獲獎與規格不是客戶採購金額。 來源：https://www.phison.com/phisons-pascari-enterprise-storage-honored-with-computex-best-choice-golden-award-for-breakthrough-245-76-tb-capacity/（原件日期：2026-05-21；查核2026-10-05）

收入／毛利歸因及客戶驗收問題保留未完成，不以產品目錄代替訂單證據。


## 2026-10-06 威剛歷史估值方法查核

福邦官方3/16早報第2頁採2026預估BVPS177.89元、PBR3倍，非EPS本益比法；乘積533.67元僅為原文參數算術，不冒稱原報告另列目標或當前合理價。舊模型未附淨值橋接、年度股數、目標期限及最新下行情境，仍待補。

此報告論點偏向記憶體漲價與低價庫存，不代表企業SSD獨立收入。後續H1營運現金流負值與Q2毛利下滑仍是主要反證；不得以舊殖利率預期當已公告配息。AI_STORAGE-gap-04維持進行中，待最新EPS／淨值模型與循環壓力測試。

來源：https://www.gfortune.com.tw/Report/%E7%A6%8F%E9%82%A6%E8%82%A1%E5%B8%82%E6%97%A9%E5%A0%B1%2020260316.pdf（2026-03-16）
