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


## 2026-10-07 群聯原始現金流與核閱限制

群聯H1歸母淨利41,391.228百萬元，但營業現金淨流出14,872.559百萬元；存貨占用57,546.420、應收占用24,777.055百萬元，其他應付增加18,635.409部分抵銷。期末現金31,547.367百萬元高於期初16,275.252，主要另有發債淨收31,250.373，不等於營運已轉成現金。

現金勾稽：營運-14,872.559、投資-1,619.788、籌資31,593.200、匯率171.262百萬元，合計15,272.115，與期末減期初現金一致。固定資產付款1,330.565百萬元已含預付設備款，不重複加總。

群聯Q2基本／稀釋EPS118.57／110.77，H1為187.43／177.01；H1基本股數220,841千股、稀釋235,363千股，稀釋分子為41,662.430百萬元，含可轉債調整。未來共識模型是否使用同口徑股數仍待核對。

核閱報告為保留結論：2026年部分權益法投資10,695.102百萬元及H1相關獲利6,341.997百萬元係依被投資公司未經會計師核閱資料認列；這是核閱範圍限制，不能直接推論造假或實際錯報。報告另述未核閱子公司6%資產是2025比較期，不冒充2026比例。

來源：https://www.phison.com/wp-content/uploads/2026/08/2026-Six-Months_EN.pdf（2026-08-13），從公司財報下載頁取得。文字及跨表加總已核，未宣稱逐頁視覺驗證。企業SSD獨立收入、未來股數及後續現金回收仍待追蹤。


## 2026-10-07 年度預估來源再查

10/7直接擷取Fintel威剛年度預估頁遇reCAPTCHA，未操作驗證或繞過；另查公開報告索引3260，四筆僅法說memo、產業與AI摘要，未取得可核對年度模型。這是本次來源限制，不能說市場不存在EPS預估。

來源：https://fintel.com.tw/sfo/tw/3260，頁面發布日未知，10/7取閱。下一步：尋找其他已授權公開具名年度模型；若必須使用此頁驗證，先取得必要核准，未以聚合摘要填值。 下次工作查核10/14，未宣稱公司會在當日發布資料。


## 2026-10-07 19:10 已完成商業連結與剩餘歸因

AI_STORAGE-gap-03的威剛AI產品／平台商業連結已由既有研究完成。現行research_focus移除重做此題，接續gap-01企業SSD獨立收入與利潤；產品連結不等於全部公司營收都來自AI，也不將已解問題另計新結案。


## 2026-10-07 20:12 威剛歷史年度共識來源補齊

已取得玉山證券7/15官方頁轉載的CMoney法人平均：威剛2026／2027 EPS119.01／44.33元。這是有日期歷史共識，非玉山單一券商預估、非10月最新共識；樣本數、基本／稀釋與預估股數未揭露，2028仍缺。

官方頁的發布日及資料日皆為2026-07-15，表頭為2026／2027 EPS(F)，註記CMoney法人平均。當前只驗收歷史本值取證，previous／change_pct、樣本數及股本定義均留空；不以6/25同頁系列的119.76／44.33直接計revision，因樣本及股本可比性未核。

8/10 CMoney搜尋彙整具名玉山145.26元，但原文條目／報告日期／股數尚未核，僅保留查找線索。2028無可採值。MarketScreener可讀頁的EPS與股數欄空白，屬該來源內容限制，不宣稱市場無預估。

下一步：鎖定玉山8月原報、年度分母及正常化盈利情境；AI_STORAGE-gap-04保持進行中，企業SSD獨立盈利與存貨現金驗收仍分開追蹤。

[7/15玉山官方整理](https://www.esunsec.com.tw/article/post?postid=AC13344D998C493B993B4D5F5CCEDF13)


## 2026-10-07 20:18 既有問題轉實績監測

AI_STORAGE-gap-02：追存貨與現金轉換

本次保留同一task_id與原驗收條件，補入已存原件的基準，將data_gap／in_progress整理為thesis_monitor／waiting_event；沒有宣稱答案已完整或新增已解項目。未重新讀取外部公告，原last_checked_at（2026-10-07）及研究重查日（2026-10-14）均保留。

- 事件：下一季財報／現金流及法說（日期未核）；精確日期null
- 追蹤：同期間營業現金流、存貨金額與周轉天數、應收回收、備貨與融資現金分拆
- 失效／風險：出貨增加但現金或正常化毛利惡化、去庫慢或報價回落；借款令現金餘額增加不等營運改善。
- 下一步：依原10/14研究查核日追下一期收現與備貨，保留季節性與合併口徑；年度股數缺口仍開放。
- 相關但不等同任務：AI_STORAGE-8299-valuation-evidence、AI_STORAGE-gap-04

資料投影修正：威剛福邦3/16歷史PBR模型的預估BVPS177.89元為2026年度；估值reference_year由誤填2027更正為2026。原始數字與日期不變。


## 2026-10-10 南亞科（2408）記憶體／AI儲存代理增補

南亞科納入AI_STORAGE僅作DRAM／AI記憶體代理，不把記憶體產品冒稱企業SSD或NAND儲存。官方4/13第一季公告表示DDR5約占營收10%，客製化AI UWIO記憶體已開始貢獻營收；官方產品頁亦列LPDDR5/5X系列。官方10/5公告的2026年9月自結合併營收為45,091.089百萬元，月增0.9%、年增576.62%，前9月265,284.971百萬元、年增626.95%。

上述是產品角色與公司合併實績，沒有提供AI儲存／企業SSD獨立收入、客戶訂單、毛利或題材可歸屬EPS。2408產品角色來源task以`not_disclosed_in_checked_sources`結案；AI_STORAGE獨立歸因、年度EPS、股本及估值維持in_progress。

官方來源：
- https://www.nanya.com/tw/IR/16/%E6%96%B0%E8%81%9E%E7%A8%BF?IRId=12105（2026-04-13）
- https://www.nanya.com/tw/IR/16/%E6%96%B0%E8%81%9E%E7%A8%BF?IRId=14187（2026-10-05）
- https://www.nanya.com/tw/Product/List/547/6587（官方LPDDR5/5X產品頁）


## 2026-10-12 群聯enterprise SSD歸因與威剛年度候選查核

本批僅嘗試AI_STORAGE-gap-01（8299）及AI_STORAGE-gap-04（3260）；兩項保持in_progress，未新增已解項目。

### 群聯8299：獨立收入仍缺

已核8/13法說PDF第5頁：38% AI Ecosystem Module合併eSSD、aiDAPTIV、AI PC、AI Networking、AI servers及Boot Drive，不能拆成企業SSD收入。H1財報印刷第33頁（PDF第35頁）收入僅按Flash modules／Controllers／IC／Others，印刷第51頁（PDF第53頁）明列一營運部門；所核原件未提供企業SSD獨立收入、毛利或客戶量產營收貢獻。產品與通路存在不等於收入未發生，也不等於已取得量產金額。

- [8/13法說](https://www.phison.com/wp-content/uploads/2026/08/2Q26_Phison-Earnings-Call_EN_Official_uploaded-version.pdf)：PDF第5頁為38%六類合計；第30頁production屬aiDAPTIV，不能移作eSSD量產金額。
- [8/13 H1財報](https://www.phison.com/wp-content/uploads/2026/08/2026-Six-Months_EN.pdf)：印刷第33／51頁（PDF第35／53頁）確認產品分類與單一營運部門；enterprise SSD收入／毛利／客戶量產營收均null。
- [6/2產品公告](https://www.phison.com/phison-unlocks-a-full-scale-ai-deployment-across-industries-building-an-ecosystem-with-pascari-aidaptiv/)分開Pascari、boot與Gen6控制器，部分產品仍在開發。
- [歐洲通路公告](https://www.phison.com/phison-expands-european-operations-with-regional-office-and-executive-appointments/)有ASBIS等通路合作，但無採購／量產／收入金額；頁日期9/1與正文9/2互異，發布日保持未定。

未來2–4季（2026Q4–2027Q3）的條件機制：Pascari若完成客戶驗證、量產交付且NAND可履約，才可能形成可辨識收入；需獨立ASP、成本層、毛利與收款驗收。38%廣義AI、>80%高價值分類、集團65.3%毛利或展會配置均不代填企業SSD。二手主碟30%以上說法未核原聲，不採用。

### 威剛3260：較新快照僅候選

已核ToAlpha年度頁2026-09-09二手彙總快照：2026 EPS105.24元（3家）、2027 EPS64.24元（2家），2027營收1,551億元、毛利率25.7%。頁面稱券商平均，但未列上游法人、原報日期、basic／diluted及年度加權股數，僅保留未採納候選；不替換7/15 CMoney歷史平均119.01／44.33、不跨來源製造revision。2028與同源同年可比前值仍缺。

[ToAlpha年度表](https://toalpha.tw/stock/3260/eps)以2026-09-09為共識快照日，非各券商原報日；[估值詳細年度列](https://toalpha.tw/stock/3260/valuation)交叉確認TWD與2026／2027家數3／2。2027候選營收1,551億元、毛利率25.7%、母公司淨利223億元均為全公司二手彙總；毛利額null，不當企業SSD盈利。

正式future_eps保留7/15玉山官方CMoney歷史平均2026／2027為119.01／44.33，2028為null；全年度previous／previous_date／previous_source／change_pct與分母未知，未把105.24／64.24或8/10單家145.26與歷史平均混算revision。

[公開報告索引](https://www.oilgoldalpha.com/)所見3260條目未得具名年度模型；[Twelve Data分析頁](https://twelvedata.com/markets/823221/stock/twse/3260/analysis)的current／7 days ago無預估絕對日期及分母，未推算前值日期。

未來2–4季（2026Q4–2027Q3）仍依已公布Q2／H1：營收季增46.15%與營益僅增3.96%、營運現金為負，檢查NAND／DRAM成本、低價庫存收益、產品mix與收現。現行估值保留3/16歷史PBR模型；保守／基準／樂觀均unsupported，EPS／倍數／合理價null，當前行情與期限unknown。

下一步：企業SSD獨立分項與客戶量產金額、3260具名年度原報／年度basic-diluted股數／2028與可比前版；10/19是研究查核日，非預定公司公告。既有9月營收與其他公司的歷史資料保留，本批未新增或採用9月營收、未公告Q3、行情／regime／技術門檻及排程。


## 2026-10-12 合併補充：EPS同源配對、群聯候選情境、威剛增資後股本與企業SSD揭露

本段為合併：以e6a5fd7（history/theme-research/2026-10-12-AI_STORAGE-gap01-gap04-043626.json）為底，保留上段全部內容，只追加本Lead的batch2外部研究（證據取得於2026-10-12T03:30:00+08:00，合併於2026-10-12T09:13:00+08:00）。範圍僅AI_STORAGE-gap-04與gap-01；未使用9月營收或未公布Q3財報，不涉市場分類與技術門檻。行情用既有GitHub Actions 2026-10-08收盤（群聯2,060元）：https://github.com/bruce-913923/ai-sector-radar/blob/a87323148146abf2a9e806f588c6c07085e7fb8e/state/priority-candidates.json

### 群聯（8299）年度EPS同源配對

| 預估者 | 統計量 | 年度 | 前值（日期） | 現值（日期） | 變動（計算） |
| --- | --- | ---: | ---: | ---: | ---: |
| 大摩 | 券商自家 | 2026 | 340.55（7/2） | 372.94（8/14） | +9.51% |
| 大摩 | 券商自家 | 2027 | 132.63（7/2） | 132.16（8/14） | −0.35% |
| 大摩 | 券商自家 | 2028 | 55.93（7/2） | 56.37（8/14） | +0.79% |
| 凱基 | 券商自家 | 2026 | 388.99（日期未印） | 478.31（9/21） | +22.96% |
| 凱基 | 券商自家 | 2027 | 298.61（日期未印） | 414.28（9/21） | +38.74% |
| FactSet | 中位數 | 2027 | 309.75（9/21） | 336.15（9/23，n=10） | +8.52% |

- 凱基同報告p.1／p.4的2026F為478.35，與p.2圖2的478.31不同，兩者照錄。FactSet 8/13同系列為359.86／249.84／136.82（2026 n=13）；2028中位數136.82→243.73但平均數反向、n=4，不計修正。既有eps_revisions條目未改值，FactSet 2027前值以新增條目補充。
- 大摩、凱基均為基本口徑約221百萬股，與官方6/30流通221,165千股、H1基本加權220,841千股一致；稀釋加權235,363千股高6.58%（推算）。

### 群聯估值：大摩三情境僅列候選，未採用

| 情境 | 價值（元） | 原報倍數 | 情境EPS | 相對10/8收盤2,060 |
| --- | ---: | --- | --- | ---: |
| 保守 | 1,250 | 9倍2027e | 未揭露 | -39.32% |
| 基準 | 2,588 | 20倍2027e（剩餘收益法） | 132.16 | +25.63% |
| 樂觀 | 3,400 | 26倍2027e | 未揭露 | +65.05% |

- 正式採用由AI_STORAGE-8299-valuation-evidence task審核；本段不改該task狀態，群聯valuation維持in_progress。
- 限制：大摩2027e EPS 132.16較FactSet中位數336.15低約60.68%（推算），凱基為414.28，不平均；5/27通過的私募上限18百萬股（約8.14%，推算）尚未定價；CB／ECB全轉約9.7百萬股（推算），現價低於全部轉換價。MOPS 8/14–10/12無重大資本事件。來源為oilgoldalpha第三方轉貼（Adam Chen report浮水印）。
- 交叉參考：凱基9/21目標2,900元（≈7.0倍2027F，推算，單一目標）；FactSet目標價中位數2,900（n=11，9/30）。

### 威剛（3260）：保留ToAlpha未採納結論，補FactSet與增資後股本

- 鉅亨FactSet：2026E 189.88（n=1，9/26）、2027E 43.8（n=1，7/20），無2028、無同源前值；目標價中位數464.92（n=4）→480.23（n=1）屬樣本退出。ToAlpha頁10/12再取閱顯示資料日10/8，2026E 105.24標3家但高＝低，且頁載淨利÷EPS隱含約396百萬股（推算），與實際約325百萬股不符，支持上段「未採納」。
- 福邦5/8：2026 P/B 2.7倍目標599元（BVPS未印，反推221.85為推算），屬增資前單一目標。
- 官方股本（H1核閱財報）：6/30已發行333,809,875股、流通324,642,875股；H1基本／稀釋加權319,204／328,010千股；歸母權益39,363,650千元，BVPS約121.25元（推算）。
- 增資後事件（MOPS）：第九次CB 30億元（轉換價410.2）、現增2,000萬股@290元（催繳至11/9）、RSA 200萬股、上半年現金股利18元（9/21除息）；私募案5/22未通過。推算股本約345.9–353.8百萬股，既有候選均未反映。gap-04維持in_progress。

### 企業SSD獨立收入（gap-01）

- 與上段結論一致：群聯官方未拆企業SSD。補充中文版財報（PDF p.33／48）產品別金額——2Q26模組60,839,115、控制晶片4,123,598、積體電路2,177,299、其他748,244千元；1Q26簡報同樣只有AI生態系38%。上段提到的「二手主碟30%以上說法」，出處之一為AllMind第三方機器逐字稿，品質有限、讀法歧義，同樣不採用。
- 威剛：H1核閱財報收入細分（中文PDF p.59）僅地區×認列時點，部門僅電子與生技（p.95–96）；8/6法說p.17產品別DRAM 61%、SSD 32%，無企業SSD／TRUSTA類別；董事長4Q26 TRUSTA≥5%目標僅見第三方備忘錄。
- 狀態差異：上段維持in_progress（10/19）；本批建議改為waiting_event、下次查核2026-11-09，但Supervisor為不覆蓋另一writer排程，維持in_progress（2026-10-19），理由是兩家已公布官方書面已查盡，下一次可能揭露為3Q26法說／財報（日期未核）。

### 合併change log
- 2026-10-12：合併e6a5fd7後追加群聯EPS同源配對、大摩候選情境（未採用）、威剛FactSet／股本／增資後事件、兩家企業SSD揭露查核；快照：history/theme-research/2026-10-12-ai-storage-batch2-ext-merge-8299pairs-3260shares-essd.json

來源：https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F8299_MS_20260814.pdf；https://www.oilgoldalpha.com/report-file?path=reports%2F20260702_MS_NAND_Industry.pdf；https://www.oilgoldalpha.com/report-file?path=reports%2Flocal%2F8299_KGI_20260921.pdf；https://news.cnyes.com/news/print/6575155；https://news.cnyes.com/news/print/6612400；https://news.cnyes.com/news/print/6613881；https://marketinfo.api.cnyes.com/mi/api/v1/financialIndicator/estimateProfit/TWS:8299:STOCK?type=eps；https://marketinfo.api.cnyes.com/mi/api/v1/financialIndicator/estimateProfit/TWS:3260:STOCK?type=eps；https://www.gfortune.com.tw/Report/%E7%A6%8F%E9%82%A6%E8%82%A1%E5%B8%82%E6%97%A9%E5%A0%B1%2020260508.pdf；https://www.phison.com/wp-content/uploads/2026/08/2026-Six-Months_EN.pdf；https://doc.twse.com.tw/server-java/t57sb01?step=1&colorchg=1&co_id=8299&year=115&mtype=A；https://www.phison.com/wp-content/uploads/2026/06/1Q26_Phison-Earnings-Call_EN_Official_uploaded-version.pdf；https://allmind.ai/earnings/event/2944905；https://doc.twse.com.tw/server-java/t57sb01?step=1&colorchg=1&co_id=3260&year=115&mtype=A；https://mopsov.twse.com.tw/nas/STR/326020260806M001.pdf；https://blog.fugle.tw/post/earnings-call-3260-2026-03-05；https://mopsov.twse.com.tw/mops/web/t05st01


# AI_STORAGE 展望監測續查報告

Task：`AI_STORAGE-outlook-monitor-01`；theme：`AI_STORAGE`；台灣公司範圍：群聯 8299、威剛 3260。產業來源為 Kioxia、TrendForce、Sandisk 與其他原廠官方索引。Inspector 基底：`b1cdd425a9ba82947e9e42c5b6779983dced0e6b`；Inspector 時間：2026-10-12T14:27:19+08:00；Lead 整合完成：2026-10-12T14:41:00+08:00。

原始缺口是 9/30 TrendForce 基準之後，企業 SSD 需求／合約價加速及 PCIe6.0、高容量 QLC 升級是否有新的實現證據。本批只處理此 task。Lead 與兩位 Evidence Agent 的 repo／GitHub 均唯讀；已等兩份完整報告交回，僅生成本報告與增量提案。Root 是 batch sole writer；未宣稱取得全球 WRITE_LEASE，也未 commit／push／發布。

## 判定與採用

**新增證據 assessment 為 partial；實際需求／合約價實現為 unknown；建議維持 waiting_event，新增 resolved 數為 0。** Kioxia 10/9 官方 LD4 送樣直接支持 QLC 技術升級的部分進度，但不滿足量產、付費交付或第四季價量的實績驗收。未核得有日期的直接需求下滑、交付延期或認證失敗反證；bounded 查核未見新資訊也不算反證。

| 面向 | 判定 | 新增內容與限制 |
|---|---|---|
| Kioxia LD4 送樣事件 | supported | 官方10/9確認向部分客戶提供功能檢查樣品；樣品規格可能與量產不同 |
| 高容量 QLC 升級方向 | partial | 15.36／30.72TB為公告送樣階段規格，122.88TB只是架構可擴展上限，不能写成已出貨容量 |
| PCIe6 後基準新商業進展 | unknown | LD4公告未列為PCIe6；所查Micron等本期索引與日期防誤判沒有取得可採本期增量 |
| 企業 SSD 實際需求、合約價加速 | unknown | 無企業SSD專屬實際bit量、成交價／ASP、同口徑QoQ與前值；預測及公開研究摘要不代填 |
| 群聯／威剛收入與獲利傳導 | unknown | 原廠送樣、展示或市場願景不能橋接兩家企業SSD paid units、收入、毛利或收款 |
| 基準反證 | 未核得直接反證 | consumer／spot市場弱需求與庫存須和enterprise拆開；不由無新post推論衰退 |

## 使用來源、發布日期与定位

1. [Kioxia LD4 官方公告](https://www.kioxia.com/en-jp/business/news/2026/20261009-1.html)，真實發布日 **2026-10-09**，HTML正文與註1（本次取閱L81–94，PDF頁碼null）。新產品為E1.L、BiCS FLASH generation 8 QLC、讀密集與高密度1U應用；目前只向選定客戶送功能檢查樣品。容量單位為TB（10^12 bytes），15.36／30.72為公告規格，122.88為架構上限。介面原文混列PCIe5.0／Gen4 x4／16GT/s，本批不採性能推論，也不寫成PCIe6量產。客户名、付費量、訂單額、量產日期、ASP、產品收入／毛利全部null。
2. [Kioxia OCP 公告](https://americas.kioxia.com/en-ca/business/news/2026/ssd-20261008-1.html)，發布 **2026-10-08**，HTML正文（L77–88，PDF頁碼null）。公司提供定性AI儲存需求敘事與10/12–15展示安排；展示完成、客戶驗收與訂單皆未由本次公告證實。和10/9是同一家公司的相关資料，不當兩個独立需求投票。
3. [TrendForce 10/7 Bulletin 公開報告頁](https://www.trendforce.com/research/download/RP261007NY)，publication_date **null**；report label、Last Modified及官方目錄日期為 **2026-10-07**，checked_at另存。公開HTML L40–47只有目錄摘要；4頁付費PDF未讀，[下載要求登入](https://www.trendforce.com/login?redirect=https://www.trendforce.com/research/download/RP261007NY)。只採較新研究存在與讀取範圍，不把CSP非LTA訂單／議價摘要或未讀內文當實際企業SSD量價。另10/1 outlook目錄已查，全文亦未讀，詳Evidence報告。
4. [Sandisk 10/7 官方部落格](https://www.sandisk.com/company/newsroom/blogs/2026/nand-flash-finds-new-value-in-volume)，發布 **2026-10-07**，HTML L165–219。它重申 [8/13 Investor Day](https://investor.sandisk.com/events/event-details/2026-sandisk-investor-day) 的預測；[原講者PDF](https://investor.sandisk.com/static-files/d358f35b-da68-4517-a2d6-ca220dc96f42) 共8頁，p.3–6模型、p.1前瞻声明。只作來源年代與模型重申記錄，不新增模型數字，不當10月實際需求或成交價，亦不當独立驗證。
5. [Phison Press Releases](https://www.phison.com/category/press-releases/)／[官方Blog](https://phisonblog.com/) 與 [ADATA News公司類](https://www.adata.com/global/news/)：動態頁publication_date均 **null**，取閱時間 **2026-10-12T14:35:59+08:00**。所查可見企業產品列表無可採10/1–查核時新商業post；已存6/2、5/21、9/3不重添。[TRUSTA news](https://trusta.adata.com/news/)直讀timeout／502／TLS取閱限制另列，不把失敗當無公告。9月營收標題排除，未新增其數字。
6. [Micron newsroom](https://www.micron.com/about/press/news) 與 [Solidigm releases](https://news.solidigm.com/releases/)：動態頁publication_date均 **null**，同樣獨立記checked_at。Micron IR抽取及Solidigm部分篩選頁有來源限制。新近crawled的[9650量產博客](https://www.micron.com/about/blog/storage/ssd/micron-9650-ssd-the-worlds-first-pcie-gen6-ssd-reaches-a-new-shipping-milestone)原HTML JSON-LD datePublished為 **2026-02-11**，另兩篇G9博客是 **2025-07-29／2025-08-05**，只作日期guard，排除本期新增商業證據。9/30美光已存基準不重收。

Samsung 10/8官方集團preliminary guidance已查但未拆enterprise SSD，不採Q3數字。零售SSD價格、10月轉述9/30基準及未核口語Q3說法亦不採。完整來源、14個需求側queries與產品側domain／date篩選queries、成功／取閱失敗範圍均保存在兩份Evidence報告。未使用oilgoldalpha券商PDF，無EPS／估值新增。

## 未來2–4季機制與仍缺資料

2026Q4–2027Q3若高容量QLC與Gen6產品從送樣走到客戶驗證、採購與付費交付，才可逐步檢驗實際容量／單位、合約價／ASP與收入。群聯的控制器／韌體和Pascari、威剛的TRUSTA須各自有直接產品分項與客戶金額；不能把原廠需求、廣義AI分類或記憶體價格循環整段歸因兩家公司。盈利傳導還需NAND成本、庫存層、產品毛利與收款，不能只看價格上升。沿用main既有Q2／H1底稿，不把舊數字重新收集成本批新實績。

仍unknown/null：enterprise SSD實際bit需求、企業合約價／ASP及加速的可比前值；Gen6本期新增付費交付；LD4具名客戶、量產日期、paid quantities／訂單額；122.88TB實際產品交付；群聯／威剛獨立企業SSD收入、毛利与現金回收。沒有2027／2028本task新EPS、營收或毛利模型；旧年度預估與8299候選估值維持原樣。

## 狀態、下次條件與合併

原task仍 `waiting_event`，原result的 `assessment=unknown` 保留；新增 `result.evidence_updates` 記 **partial** 並明列需求價格實現unknown。建議 **2026-10-16** OCP之後研究複查（不是公司公告日）；產品Evidence的10/19也是研究日期建議，Lead選較早10/16檢查新公告，Root保留其他writer原排程。只有官方直接量產／認證／客戶驗收／付費交付及企業SSD實際價量才重判，展示本身不結案。

另 [Sandisk 9/29通知](https://investor.sandisk.com/node/8381/pdf)（PDF p.1）確認 **2026-10-29 13:30 Pacific Time** FY2027Q1法說；[Kioxia官方動態列表](https://www.kioxia-holdings.com/en-jp/news.html)確認 **2026-10-30 18:45 JST** FY2026Q2財報。這些是已公告未來事件安排，非實績；事件後再讀實際公告，不預填。Kioxia動態頁發布日null、列表項9/30與checked_at分開。

本提案只append task evidence／history、theme sources／latest_changes、8299／3260公司evidence與本題材coverage的outlook／monitoring evidence，以及notebook；原result由Root保留於prior_results，不覆寫status／next_check_at、EPS、估值、其他公司或題材。RC只附加更嚴格澄清。本題沒有本組內question／RC相同的鏡像；不把AI_ODM、SERVER_DRAM等相邻題材結論同步。

在此Inspector基底，AI_STORAGE共有8個task、6個未resolved；本批處理其中1個，**另外5個未resolved task未處理**，仍依各自排程（gap-01／gap-02／gap-04及8299／2408估值）。最近3小時其他writer窗口已由Root fresh Inspector判定通過；Lead本批沒有寫入／併發衝突。真正commit SHA、Actions及Pages均 **待Root發布驗證**，本報告不宣稱已完成發布。

## 完整Evidence檔案

- `work/continuation/AI_STORAGE/evidence_demand.md`／`evidence_demand.json`
- `work/continuation/AI_STORAGE/evidence_product.md`／`evidence_product.json`
- 增量：`work/continuation/AI_STORAGE/deltas.json`

歷史增量：history/theme-research/2026-10-12-AI_STORAGE-storage-final.json。
