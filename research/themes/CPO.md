# CPO — Silicon Photonics／共封裝光學

研究日2026-10-02。首次baseline；Insufficient Evidence表示台廠量產收入、良率與獲利仍有缺口。

## Current thesis
CPO交換器已有架構商生產公告，FAU、光源與精密封裝具實際技術需求；但台廠多處在不同試產/客戶導入階段。上詮CPO相關收入成長仍伴隨合併虧損，不能把技術突破直接等同獲利拐點。

## Research hypothesis
縮短信號電路徑可改善高速互連功耗；若光耦合、良率、熱管理、可靠度與維修成本達標，CPO可能擴大採用。交換器Scale-out與XPU光I/O的時程不可混用。

## Causal chain
- 需求: Confirmed — NVIDIA宣布CPO交换器進入生產，架構需求具商業起點。 [來源](https://nvidianews.nvidia.com/news/vera-rubin-full-production-agentic-ai-factory)
- 訂單: Partial — 上詮已交付多種MCM CPO封裝，但design-in與交付不等於長約量產訂單。 [來源](https://mopsov.twse.com.tw/nas/STR/336320260902M001.pdf)
- 供需: Partial — FAU、雷射與封裝均有布局；未核對合格產能缺口與跨廠供給。 [來源](https://www.browave.com/uploads/images/115%20%E6%B3%95%E8%AA%AA(%E4%B8%AD)1150310.pdf)
- 產能／稼動率: Partial — 上詮自動線仍有建置/試產，聯鈞ELSFP規劃試產；資本支出不代表有效產出。 [來源](https://mopsov.twse.com.tw/nas/STR/345020260818M001.pdf)
- ASP／mix: Unverified — 尚缺同規格FAU/ELS/封裝ASP與客戶認證後量產良率。
- 營收: Partial — 上詮SiPh/CPO packaging有收入，但合併9%類別不能全部視為純CPO量產。 [來源](https://mopsov.twse.com.tw/nas/STR/336320260902M001.pdf)
- 毛利／營益率: Partial — 上詮Q2合併毛利接近零、本業虧損，尚未證明規模經濟。 [來源](https://mopsov.twse.com.tw/nas/STR/336320260902M001.pdf)
- EPS: Unverified — 缺各公司年度consensus pair，不能用題材潛力填補。
- 市場預期: Unverified — 尚缺同日可觀測預期；預測TAM不當作已實現訂單。
- 評價: Unverified — 未取得可比較forward EPS與估值，虧損公司須另看現金消耗。

## Catalysts
- 高密度FAU良率與自動線實際產出
- ELSFP/光引擎完成認證與重複訂單
- CPO交換器客戶驗收及部署
- 可靠度、可維修性與成本改善

## Fundamental confirmation
- NVIDIA公告Spectrum-X Ethernet Photonics的CPO交換器已進入生產；Vera Rubin生產出貨另預告秋季開始。架構商進入生產不等於每家台廠已大量獲利。 [2026-05-31](https://nvidianews.nvidia.com/news/vera-rubin-full-production-agentic-ai-factory)
- 上詮Q2營收429百萬元台幣、YoY-26%，營益虧損92百萬元、EPS-0.22元；SiPh/CPO packaging占9%、該類收入YoY52%。部分新FAU/自動化線依客戶進程於Q3微量、Q4後貢獻，非全數大量商轉。 [2026-09](https://mopsov.twse.com.tw/nas/STR/336320260902M001.pdf)
- 聯亞提供SiPh雷射磊晶/光源服務，H1營收與獲利改善；但無法由合併資料辨識CPO專屬收入，不把可插拔矽光子訂單全部移入CPO。 [文件日期未確認；查閱2026-10-02](https://mopsov.twse.com.tw/nas/STR/308120260828M002.pdf)
- 光聖簡報把高密度Scale-out光纖布線與Scale-up CPO ELS模組分列，ELS仍標示預期2026。已有傳統/資料中心業務財務，CPO量產實績仍需另驗證。 [文件日期未確認；查閱2026-10-02](https://mopsov.twse.com.tw/nas/STR/644220260908M001.pdf)
- 訊芯官方把光收發模組、CPO及SiP列入產品範圍；本輪未核對CPO獨立收入、良率與大客戶量產承諾。產品範圍不等於量產業績。 [文件日期未確認；查閱2026-10-02](https://www.shunsintech.com/tw/)
- 波若威3月法說提供CPO FAU、PM光纖/ELSFP與高密度Fiber Shuffle規格，預期2026H2開始量產；未取得更新證據，不當作已實現。 [2026-03-10](https://www.browave.com/uploads/images/115%20%E6%B3%95%E8%AA%AA(%E4%B8%AD)1150310.pdf)
- 聯鈞ELSFP平台對應CPO/NPO，8月說明仍屬規劃試產。COSA與800G TRX已有不同商業基礎，不能以其收入證明ELSFP量產。 [2026-08-18](https://mopsov.twse.com.tw/nas/STR/345020260818M001.pdf)
- NVIDIA七月說明Spectrum-6同時支援可插拔與共封裝光學，兩種架構並存。 [2026-07-21](https://blogs.nvidia.com/blog/nvidia-spectrum-six-arrives-in-gigascale-ai-factories/)

## EPS/consensus revisions
六家公司年度consensus前次/本次未核實，留null。季度虧損/盈餘不是年度revision。

## Contradictory evidence
- 上詮H1營收811百萬元台幣、YoY-18%，營益虧損248百萬元、EPS-1.18元；CPO類別成長未抵銷其他業務與成本壓力。
- 上詮SiPh/CPO packaging占比含不同技術服務，不等於全部終端CPO大量出貨。
- NPO、可插拔SiPh與CPO可共存，不能把整個矽光子市場算作CPO市場。
- 聯鈞ELSFP試產、光聖expected2026、波若威H2目標，都還需最新實績。
- 訊芯官網列產品不足以驗證CPO收入與獲利。
- XPU光I/O、CPO交換器與FAU自身支援頻寬屬不同層級，不能互相替代量產時間。

## Leader/beneficiaries
- 3363 上詮（Leader）：FAU/光學封裝已有相關收入，新線時程及本業亏損需追蹤 [來源](https://mopsov.twse.com.tw/nas/STR/336320260902M001.pdf)
- 3081 聯亞（High Beta）：SiPh光源有商業基礎，CPO純收入待拆分 [來源](https://mopsov.twse.com.tw/nas/STR/308120260828M002.pdf)
- 6442 光聖（Candidate）：布線與CPO ELS分列，ELS實績待核對 [來源](https://mopsov.twse.com.tw/nas/STR/644220260908M001.pdf)
- 6451 訊芯-KY（Candidate）：產品範圍包含CPO，量產收入與良率未確認 [來源](https://www.shunsintech.com/tw/)
- 3163 波若威（Candidate）：FAU/Shuffle/ELSFP套件，H2量產目標待更新 [來源](https://www.browave.com/uploads/images/115%20%E6%B3%95%E8%AA%AA(%E4%B8%AD)1150310.pdf)
- 3450 聯鈞（ELSFP External Laser Source Candidate）：ELSFP規劃試產，不能當作成熟量產 [來源](https://mopsov.twse.com.tw/nas/STR/345020260818M001.pdf)

## Open questions
- 上詮Q4依客戶進程的貢獻是否如期，何時改善營益及現金流？
- 各公司CPO、NPO與可插拔SiPh的收入如何分開？
- 光源與FAU可靠度/良率是否足以支持大規模部署？
- 客戶design-in何時變成量產驗收與重複訂單？
- 維修成本及不同光學架構的選擇是否推遲滲透？

## Change log
2026-10-02：首次建立，分離生產公告、design-in、試產與營收；未更改市場排名。



## Forward outlook update — 2026-10-04

CPO下一段關鍵是小量交付轉成可重複量產收入；現階段商轉進度不足以保證扭虧。

- Horizon: 2026Q4–2027Q3
- Direction: Insufficient Evidence (assessment, not price prediction)

- 上詮預計Q3小量、Q4依客戶需求放量及泰國小量商業生產；Q2營收4.29億元年減26%、EPS負0.22元是反證基準。
  - 公司指引／反證; 2026Q4–2027; source date: 2026-09-02; https://mopsov.twse.com.tw/nas/STR/336320260902M001.pdf

### Change log
- Source-dated forward outlook added; forecasts remain forecasts. Original confidence, contrary evidence and unresolved questions retained.


## 2026-10-04 逐公司證據補齊

CPO投資鏈包含FAU、外部光源及封裝，商業化時間不同。上詮已有小規模封裝收入但本業虧損，聯鈞ELSFP及光聖ELS仍待量產驗收；訊芯單季轉盈受金融評價利益影響。應逐家公司跟蹤實際收入與本業轉盈，不能以技術展示或合併EPS替代。

本節是增量研究；前文舊基準保留為研究歷史，最新數值以本節來源日期及口徑為準。

### 聯亞（3081）

- 展望：800G／1.6T向矽光子光源升級可增加CW雷射磊晶需求；2027成長仍取決於基板取得、新設備良率及客戶認證，不能將產能倍數直接當作出貨倍數。
- 實績：Q2營收12.21億元、營業利益5.73億元、EPS 4.62元；H1 EPS 7.75元。簡報Q1 EPS重列為3.13元，與較早除權前3.44元不能直接混用。
- 商業路徑：公司提供SiPh LD、EML及高功率雷射平台，列MOCVD／微影升級及18個月原料庫存、長約策略；專屬1.6T收入未拆。
- 反證：新光證券9/21轉述2027 EPS 41.36元與營收102億元共識，未交代樣本／統計方式；原料配額與折舊吸收仍待核對，不把該預估標為FactSet中位數。
- 後續驗證：追蹤2027基板年度供貨量、設備利用率與新增折舊；月營收上升若伴隨毛利連續下滑，需重估EPS成長。
- 年度EPS：2026 19.66元（券商公開文章轉述市場共識；統計方式未揭露，2026-09-21）；2027 41.36元（券商公開文章轉述市場共識；統計方式未揭露，2026-09-21）
- 估值：同日價格、股數與合理倍數尚待驗收，未產生目標價
- 財務來源層級：公司公開法說原件
- 來源：[文件日期未確認，10/4查閱](https://mopsov.twse.com.tw/nas/STR/308120260828M002.pdf)；[2026-09-21](https://www.skis.com.tw/Report/industry/20260921.html)；[2026-09-21](https://www.skis.com.tw/Report/industry/20260921.html)

### 光聖（6442）

- 展望：短中期獲利基礎是資料中心高密度光纖布線；CPO外部雷射光源屬另一產品階段，應等驗收及分項營收後才加進成長模型。
- 實績：H1營收63.87億元、營業利益18.94億元、毛利59.50%、EPS 19.07元；這是合併實績，不能全數歸因CPO或1.6T光源。
- 商業路徑：官方簡報展示6,912芯光纖互連及CPO ELS，後者仍標預期2026。高芯數改善產品組合的機制成立，CPO量產貢獻尚未量化。
- 反證：光被動布線、光主動、RF及其他應用混合；外部EPS模型差異很大，未取得可追溯且口徑一致的2027具名原始報告，不採單一平台的130元作共識。
- 後續驗證：分開追高芯數布線營收、光纖材料供應、CPO ELS認證與首次正式收入；舊布線成長不能代替CPO驗收。
- 年度EPS：尚無本次可採信的具名年度預估；不將論壇或不明模型填為共識
- 估值：同日價格、股數與合理倍數尚待驗收，未產生目標價
- 財務來源層級：公司公開法說原件
- 來源：[文件日期未確認，10/4查閱](https://mopsov.twse.com.tw/nas/STR/644220260908M001.pdf)

### 波若威（3163）

- 展望：1.6T FR／DR光纖套件及跳線可受惠互連密度升級；但先要證明CPO／高速被動元件的實際收入能改善本業，現在不能以業外推高的EPS證明量產成功。
- 實績：Q2營收5.92億元、營益僅0.102億元，業外淨收入0.838億元。8/14更正公告將Q2 EPS由1.09改0.93、H1由4.12改3.50元，本次採更正後數字。
- 商業路徑：3/10官方簡報已有1.6T FR／DR套件及客製跳線；公司身處被動互連，而非雷射磊晶。下半年量產計畫仍待新一季收入佐證。
- 反證：Q2毛利15.19%低於去年17.19%，營益率1.72%低於6.10%；業外占稅前獲利約89%，不能把合併EPS視作可持續本業獲利。
- 後續驗證：核對CPO被動元件驗收、產品營收及毛利；比較本業營益而非僅稅前或EPS，同時固定更正後股數口徑。
- 年度EPS：尚無本次可採信的具名年度預估；不將論壇或不明模型填為共識
- 估值：同日價格、股數與合理倍數尚待驗收，未產生目標價
- 財務來源層級：MOPS公告／財報之公開轉載；完整原件待補
- 來源：[2026-08-14](https://m.esunsec.com.tw/news/instant-detail.aspx?id=%7BFD729475-F456-4D52-B68D-F5A051AD1FB6%7D)；[2026-08-14](https://5850web.moneydj.com/z/zf/zufzVIP_658E941B-AEEF-4984-8EE1-C912A536443D_E_.djhtm)；[2026-03-10](https://www.browave.com/uploads/images/115%20%E6%B3%95%E8%AA%AA(%E4%B8%AD)1150310.pdf)

### 聯鈞（3450）

- 展望：COSA雷射封裝與800G光收發模組擴產支撐較近的成長；ELSFP外部光源仍是試產規劃，須與已貢獻的產品分開，2027取決於新品驗收與產能轉換。
- 實績：Q2營收29.77億元、營益6.31億元、EPS 2.09元；H1營運現金流10.22億元。7月AI光通訊占45.5%、功率半導體50.4%，並非全公司都是CPO。
- 商業路徑：2026機器設備支出預估16億元，COSA產能近年擴增；800G TRX推進量產，ELSFP規劃試產，兩者商業確定性不同。
- 反證：H1應收帳款22.65億元較年底16.07億元增加；擴產折舊、可轉債稀釋與功率半導體混合影響EPS。論壇所稱2027 EPS17元未取得可信具名原件，留待查證。
- 後續驗證：分別追COSA稼動率、800G TRX收入、ELSFP正式驗收及30億元可轉債條件，避免把試產當量產。
- 年度EPS：尚無本次可採信的具名年度預估；不將論壇或不明模型填為共識
- 估值：同日價格、股數與合理倍數尚待驗收，未產生目標價
- 財務來源層級：公司公開法說原件
- 來源：[2026-08-18](https://mopsov.twse.com.tw/nas/STR/345020260818M001.pdf)

### 上詮（3363）

- 展望：未來2–4季價值取決於FAU自動化及光學封裝由微量轉成付費量產，並使本業轉盈；目前實績仍屬投資期，不能只因CPO技術完成就判定獲利已兌現。
- 實績：Q2營收4.29億元、年減26%，營業損失0.92億元、EPS負0.22元；H1 EPS負1.18元。SiPh／CPO封裝占Q2營收9%、年增52%，規模尚小。
- 商業路徑：公司預計Q3微量、Q4依客戶進程貢獻，2026至2027Q2 FAU生產及測試機台投資15.38億元；泰國Q4小量商轉仍待完成證據。
- 反證：Q2毛利僅約0%，傳統跳線占78%；產品成長不能抵銷所有開發費與折舊。現金增資使資金增加，並非本業現金創造改善。
- 後續驗證：驗證Q4實際FAU出貨、客戶驗收、分項毛利及本業損益，若只有樣品或設備到位而無收入，量產假說仍未成立。
- 年度EPS：尚無本次可採信的具名年度預估；不將論壇或不明模型填為共識
- 估值：同日價格、股數與合理倍數尚待驗收，未產生目標價
- 財務來源層級：公司公開法說原件
- 來源：[2026-09-02](https://mopsov.twse.com.tw/nas/STR/336320260902M001.pdf)

### 訊芯-KY（6451）

- 展望：光收發模組及CPO封裝可能提高產品組合，但2027成長需要由SiP／傳統模組拆出高速光學收入、認證與利潤，官網產品列表不足以證明CPO大量獲利。
- 實績：MOPS財報轉載：Q2營收20.15億元、營益0.522億元、基本EPS0.68元／稀釋0.65元；H1基本EPS負0.72元。兩種EPS不能混用。
- 商業路徑：公司官網確認SiP、光收發模組與CPO能力；最新官網財報列表本次僅取得2025，Q2完整原件及法說產品拆分仍待補。
- 反證：Q2業外淨收入2.057億元高於營益0.522億元，包含金融資產評價利益1.922億元；H1本業仍虧損0.282億元，單季EPS轉正不等於CPO商業模式已驗證。
- 後續驗證：查Q3後本業營益是否維持正數、剔除金融評價後獲利、CPO量產客戶及收入；補財報原件與現金流。
- 年度EPS：尚無本次可採信的具名年度預估；不將論壇或不明模型填為共識
- 估值：同日價格、股數與合理倍數尚待驗收，未產生目標價
- 財務來源層級：MOPS公告／財報之公開轉載；完整原件待補
- 來源：[2026-08-27](https://www.moneydj.com/kmdj/news/newsviewer.aspx?a=e6b70494-76c6-43a1-81b9-afec114fb579)；[文件日期未確認，10/4查閱](https://www.shunsintech.com/tw/FinanceReport.html)；[文件日期未確認，10/4查閱](https://www.shunsintech.com/tw/)

### 研究待辦處理

已逐一讀取並更新這三個題材的研究待辦；只有光互連逐公司角色辨識完成，量產、分項收入、可靠年度EPS與估值等綜合缺口保持未結案。


## 2026-10-05 估值參照補充（非合理價）

行情固定為2026-10-02，取自既有GitHub Actions結果：https://github.com/bruce-913923/ai-sector-radar/blob/ed9a5f8ca5eb3d00d2733b7363580b7c237fe80c/state/priority-candidates.json

| 公司 | 收盤（元） | 2027 EPS（元） | 預估日期 | 參考本益比 | 預估來源 |
| --- | ---: | ---: | --- | ---: | --- |
| 聯亞 3081 | 2925 | 41.36 | 2026-09-21 | 70.72 | https://www.skis.com.tw/Report/industry/20260921.html |

以上為收盤÷來源EPS的條件式計算，並非可直接使用的合理倍數或目標價。估計日期不同，不拿名目EPS或倍數直接排名；預估股本、經常性獲利、歷史／同業倍數與完整情境仍須補。沒有調整正式推薦門檻、行情或大盤分類。


## 2026-10-05 上詮：券商模型分歧與量產驗收

上詮成長取決於FAU從試產進入可獲利量產。群益9/30估2026／2027／2028 EPS為-0.53／5.08／8.23元；高盛9/8則為0.82／17.49／49.80元。2027營收模型分別39.48與97.45億元，差距反映放量假設尚未收斂，不能平均成共識，也不是EPS由17.49下修至5.08。先追蹤Q4收入、本業轉盈與2027客戶驗收。

- 群益：2027營收39.48億元、毛利率29.33%；以股本11.36億元計算EPS。原件9/30：https://www.oilgoldalpha.com/report-file?path=reports%2Flocal%2F20260930_3363_%E7%BE%A4%E7%9B%8A%E6%8A%95%E9%A1%A7_r26.pdf
- 高盛：2027營收97.45億元、FAU占58%；預估股數與群益未完全對齊。原件9/8：https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F3363_GS_20260908.pdf
- 反證：群益供應鏈訪查提出NPO可能先放量，CPO因整合良率及測試瓶頸延至2028年後；與FAU快速成長模型存在時程風險，尚非已證實延後。
- 估值：兩家模型分歧且股本未完全對齊，不指定單一共識EPS或合理倍數。群益700元與高盛833元是券商目標，不是本站推薦價；高盛採2030年模型折現，不能當2027全年EPS倍數。
- 研究待辦：對齊股數、平台別FAU收入與兩模型差異；追蹤量產吞吐量、毛利與本業損益。年度EPS來源查找結案，未來成長監測不結案。
