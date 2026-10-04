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


## 2026-10-05 逐公司補充

BBU的價值來自電芯、電池管理、安全認證與機櫃功率整合，功率升級未必立即帶來EPS。AES本次從舊2025Q3基準補到2026H1；順達半年本業改善卻Q2毛利回落，IT與Non-IT要分開；新盛力獲利與營收成長但現金被應收／存貨占用。三家公司都需驗收客戶認證、實際量產、收款及稀釋，而非只彙總BBU概念。

### AES-KY（6781）

AI資料中心功率與備援需求支持電池模組升級，但目前沒有足以核對的2027具名最新EPS與BBU單獨收入；先以2026H1營收93.38億元、EPS23.45元建立實績基準，追客戶認證、出貨及毛利。8/7公司明確說媒體展望屬法人自行推估，不能寫成公司承諾。

2026H1：營收9337.903百萬元、毛利37.63%、營益25.76%、EPS23.45元。毛利3,513.483百萬元、營業利益2,405.359百萬元、歸母淨利2,002.864百萬元；本列是半年累計，不能誤標Q2單季。

反證：8/7澄清法人所述全年創高及2027成長並非公司財測；最新Q2完整現金流及BBU／LEV產品歸因仍待核對。

驗收：H1毛利37.63%、營益25.76%；BBU獨立收入未知；下一次產品組合揭露及Q3財報；偏離條件：BBU客戶認證延後、產品組合未改善或毛利下滑

未完成：從2025Q3舊基準補到2026H1自結公告；完整核閱現金流、年度EPS與估值仍缺。

- 2026-08-06 https://pchome.megatime.com.tw/news/cat2/20260806/9700006781202608062.html
- 2026-08-07 https://anuenews.cnyes.com/news/print/6564115

### 順達（3211）

2026H2管理層預期總營收較H1雙位數增長，Non-IT全年占比超過50%；需要BBU恢復拉貨與高規格出貨兌現。Non-IT還有其他應用，不能直接等於BBU；IT則受筆電漲價及記憶體短缺拖累，並非各產品同步成長。

2026H1：營收6836百萬元、毛利16.9%、營益9.5%、EPS3.4元。營業利益646百萬元、年增79%，EPS卻年減31%，業外由去年649百萬元轉為負35百萬元。Q2營收3,491百萬元，毛利13.8%、營益6.5%，均低於Q1 20.0%／12.5%。

反證：Q2存貨3,956百萬元較Q1 2,783增加42.1%，存貨天數93比79、應收天數97比93；收入增長前要檢查備貨和回收。A7土地公允價值及租售收益不是BBU經常獲利。

驗收：H1營收6,836百萬元；Q2毛利13.8%、存貨93天；後續月營收、Q3實績及Non-IT產品拆分；偏離條件：H2未達雙位數增長、BBU遞延未恢復或存貨天數上升

未完成：已讀官方H1／Q2產品展望及財務；年度具名最新EPS、BBU獨立收益與估值仍缺。

- 2026-07-29 https://mopsov.twse.com.tw/nas/STR/321120260729M001.pdf

### 新盛力（4931）

公司核閱報告列AI算力中心／伺服器鋰電備援模組為主要業務，Q2營業利益轉正且8月營收年增125.9%，支持出貨改善；未來成長需由持續訂單、產品認證與現金回收共同驗證，不把6–300V產品能力外推800V已量產。

2026Q2：營收1113.26百萬元、毛利23.33%、營益15.07%、EPS2.2元。Q2營業利益167.774百萬元、H1 EPS3.69；H1營業現金流46.542百萬元低於歸母淨利241.636百萬元，固定資產付款105.853百萬元。

反證：H1應收占用現金349.291百萬元、存貨占用302.241百萬元；期末存貨859.277百萬元高於去年底563.940。現金增加主要另有發債籌資，不等同營運收現改善；可轉債可能影響未來稀釋EPS。

驗收：8月495.100百萬元、去年同月219.200；H1營運現金46.542百萬元；9月公告與Q3財報／可轉債轉換資訊；偏離條件：應收與存貨成長持續超過營收、毛利逆轉或高壓認證未完成

未完成：核閱實績、現金風險與最新可見月營收已補；年度EPS可靠來源、客戶／BBU拆分、估值尚缺。

- 2026-08-11 https://www.stl-tech.com/upload/ckeditor/files/FinancialStatements-2026Q2.pdf
- 2026-10-05取閱 https://www.stl-tech.com/investor.asp


## 2026-10-05 現金流與EPS模型日期再核對

BBU受惠機櫃功率升級，但三家公司獲利轉現金的進度不同。AES H1營業現金流30.43億元高於20.03億元歸母淨利，部分來自應收與預付款釋放；順達仍須驗收毛利回升與存貨去化，新盛力H1營業現金流僅0.47億元、低於2.42億元歸母淨利。高壓認證與擴產計畫須接到實際出貨、毛利和收現，不能用近期重刊的舊EPS模型代替驗證。

- AES正式財報202602_6781_AI1.pdf於8/31上傳，已讀第1–15頁；第10頁另以原件畫面核對正負號。H1營業現金流3,042.726百萬元、固定資產現金付款430.579百萬元；應收釋放482.503百萬元，預付款釋放533.196百萬元，存貨占用442.312百萬元。Q2營收4,808.058百萬元、毛利39.06%、營益27.26%、EPS12.81元。穩定原件查詢：https://doc.twse.com.tw/server-java/t57sb01?step=1&colorchg=1&co_id=6781&year=115&mtype=A
- AES 5/12國泰證期2026／2027 EPS46.96／59.19元：歷史模型，尚缺Q2後更新，不宣稱目前共識。https://newtalk.tw/news/view/2026-05-12/1034621
- 順達2027 EPS21.97元及前值20.42元已在7/31報導出現。券商未具名，原件未取得；9/29同值重刊不算新上修，暫不進可靠預估表或估值。https://www.ftnn.com.tw/news/565848
- 新盛力9/8報導2026 EPS有機會挑戰9元，屬未具名門檻而非點估，2027值維持未知。https://www.moneydj.com/KMDJ/news/newsviewer.aspx?a=27cb17b2-439f-48b4-998d-c7057966840a
- 年度EPS更新、BBU專屬獲利及估值仍未結案；保持原技術與推薦門檻。
