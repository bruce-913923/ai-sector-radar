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

