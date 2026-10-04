# BBU — 備援電池模組

資料基準2026-10-02；首次baseline，Insufficient Evidence表示最新產品出貨與收入拆分仍待驗證。

## Current thesis
資料中心備援電池有商業需求，順達/新盛力已有財務與產品佐證；但BBU、一般儲能、UPS與消費電池不能混算。AES最新基線未完成核驗，高壓架構與客戶平台的量產份額亦有缺口。

## Research hypothesis
機櫃功率提升可能提高備援所需放電功率与容量，但配置亦取決於備援秒數、電源架構、電芯/BMS安全及客戶認證，不能只按GPU功率等比例推算收入。

## Causal chain
- 需求: Confirmed — 順達法說明確指出資料中心建設帶動BBU需求。 [來源](https://mopsov.twse.com.tw/nas/STR/321120260729M001.pdf)
- 訂單: Partial — 相關電池收入已有實績；BBU客戶別長約、承諾量未核對。 [來源](https://mopsov.twse.com.tw/nas/STR/321120260729M001.pdf)
- 供需: Unverified — 缺電芯與模組合格產能、供應約束的完整資料。
- 產能／稼動率: Partial — 新盛力有備援模組設計能力，最新HVDC量產與高壓認證未核實。 [來源](https://www.stl-tech.com/product_info.asp?id=89)
- ASP／mix: Partial — 順達Non-IT占比為預期且非BBU專屬，不能直接用作BBU ASP或收入。 [來源](https://mopsov.twse.com.tw/nas/STR/321120260729M001.pdf)
- 營收: Partial — 新盛力Q2和8月收入已核對，未拆出BBU。 [來源](https://www.stl-tech.com/investor.asp)
- 毛利／營益率: Partial — 順達Q2毛利率13.8%低於Q1的20.0%，需求不能替代產品成本分析。 [來源](https://mopsov.twse.com.tw/nas/STR/321120260729M001.pdf)
- EPS: Unverified — 季度/H1實績與業外差異已記錄，年度consensus pair仍缺。
- 市場預期: Unverified — 缺同日預期與擁擠度證據。
- 評價: Unverified — 缺forward EPS与歷史/同業同口徑估值。

## Catalysts
- 高功率BBU客戶認證和重複出貨
- 備援秒數/容量與系統架構規格確認
- 高壓BMS與安規完成驗證

## Fundamental confirmation
- AES-KY取得的原始法說為2025Q3，營收4,129,336千元台幣、毛利率34.94%、EPS9.35元。這是舊財務基線，不是2026實績；本輪尚未取得最新BBU產品/出貨占比與量產資料。 [2025-11-17](https://mopsov.twse.com.tw/nas/STR/678120251114M001.pdf)
- 順達H1營收6,836百萬元台幣、YoY22%，營益646百萬元、YoY79%，EPS3.40元反而YoY-31%，主因業外比較差異。公司看好BBU需求，全年Non-IT超過50%是預期，且Non-IT不全是BBU。 [2026-07-29](https://mopsov.twse.com.tw/nas/STR/321120260729M001.pdf)
- 新盛力提供客製電池備援、電路/機構設計、安規及製造，產品頁列6–300V、12W–25kW設計範圍。不能外推為800V BBU已認證量產。 [查閱2026-10-02](https://www.stl-tech.com/product_info.asp?id=89)
- 新盛力核閱財報Q2營收1,113,260千元台幣、營益167,774千元、EPS2.20元；H1 EPS3.69元。公司總營收/利潤不等於BBU獨立損益。 [2026Q2/H1](https://www.stl-tech.com/upload/ckeditor/files/FinancialStatements-2026Q2.pdf)
- 新盛力8月收入495,100千元台幣、去年同月219,200千元。公司網頁未分產品收入，未據此推算BBU份額。 [2026-08](https://www.stl-tech.com/investor.asp)

## EPS/consensus revisions
三家公司年度consensus前次/本次未核實，留null；季度/H1 EPS、土地與業外分開。

## Contradictory evidence
- 順達H1本業成長但EPS年減，業外/土地收益使EPS比較失真，需分開。
- 順達Q2毛利率下滑，6月底存貨3,956百萬元高於3月底2,783百萬元；需追蹤備料與周轉。
- 新盛力官方產品範圍不能證明800V量產，特定CSP供應份額未原始核實。
- Non-IT/電池模組合併收入不是BBU收入。
- AES僅取到2025Q3原始財務，不當作2026現況或延伸成最新量產結論。

## Leader/beneficiaries
- 6781 AES-KY（Leader）：保留registry Leader，最新BBU收入/出貨占比未完成驗證 [來源](https://mopsov.twse.com.tw/nas/STR/678120251114M001.pdf)
- 3211 順達（High Beta）：H1本業成長與BBU需求已揭露；Non-IT預期非BBU實績 [來源](https://mopsov.twse.com.tw/nas/STR/321120260729M001.pdf)
- 4931 新盛力（Candidate）：備援模組能力與Q2/8月收入確認，客戶/高壓量產待核實 [來源](https://www.stl-tech.com/product_info.asp?id=89)

## Open questions
- 各公司BBU收入、毛利及客戶集中度多少？
- 48/54V與高壓備援的驗證/量產進度如何？
- 功率、備援秒數及電芯數如何影響单機價值？
- 電芯成本、安全與保固責任由誰承擔？
- AES2026財務及BBU出貨實績能否補齊？

## Change log
2026-10-02資料基準：首次建立；未把Non-IT等同BBU或把舊EPS當最新。



## Forward outlook update — 2026-10-04

非IT電池需求支持增量，但BBU經濟貢獻須從混合業務拆開；出貨成長不能掩蓋毛利下滑。

- Horizon: 2026Q4–2027Q3
- Direction: Improving (assessment, not price prediction)

- 順達預估H2營收較H1雙位數成長、全年Non-IT逾50%；Non-IT並非全為BBU，Q2毛利13.8%低於Q1約20%。
  - 公司指引／反證; 2026H2–2027; source date: 2026-07-29; https://mopsov.twse.com.tw/nas/STR/321120260729M001.pdf

### Change log
- Source-dated forward outlook added; forecasts remain forecasts. Original confidence, contrary evidence and unresolved questions retained.
