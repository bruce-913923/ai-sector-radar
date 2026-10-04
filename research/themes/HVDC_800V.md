# HVDC_800V — 800V高壓直流供電

研究日2026-10-02。首次baseline；Insufficient Evidence不代表商業關係不存在，而是訂單至獲利未核實。Thesis狀態是研究判斷，不是投資建議。

## Current thesis
800VDC已出現平台路線、供應商產品與元件qualification，具實質商業連結；但由展示到客戶採用、訂單、收入與獲利仍缺逐層證據，不能把架構趨勢當成四家公司的已實現獲利。Thesis Intact僅指待驗證假說仍成立。

## Research hypothesis
混合式導入可能先於原生800V機房，轉換電源、保護元件和連接系統的受惠時點不同；需量化採用率與每家公司新增價值扣除舊產品被取代。

## Causal chain
- 需求 — Partial: 高密度運算驅動供電架構轉換的需求邏輯有平台方佐證，但各終端部署量未核對。 [2026-08-11](https://blogs.nvidia.com/blog/800-vdc-power-architecture-ai-factory/)
- 訂單 — Unverified: 產品展示與qualification不足以確認四家公司各自的客戶承諾量、取消條款或積壓訂單。
- 供需 — Unverified: 參與者增加不能直接解讀為缺貨；缺交期、實際需求與合格產出同口徑比較。
- 產能／稼動率 — Unverified: 未取得800V專用產線、稼動率與合格良率；其他電源產能不可直接代入。
- ASP／mix — Unverified: 架構升級的單機價值、取代原AC/DC產品及價格競爭尚未量化。
- 營收 — Unverified: 尚無可核對的四家公司800VDC獨立已認列收入；未以整體AI成長替代。
- 毛利／營益率 — Unverified: 產品效率與客戶節電不等於供應商毛利，認證、材料與研發成本須另驗證。
- EPS — Unverified: 未取得2026同年度consensus前後pair及可歸因800V的獲利橋接。
- 市場預期 — Unverified: 未重估市場排名，尚缺同日期可觀察預期與持倉資料。
- 評價 — Unverified: 缺同日期forward EPS與估值比較，不作低估或Positive Gap判斷。

## Catalysts
- 平台路線所列2026下半年power rack是否實際交付及客戶驗收
- 2027 row power center供應與專案建置進度
- 供應商揭露800V訂單、出貨與收入占比

## Fundamental confirmation
- NVIDIA公布混合AC/800VDC至原生DC的分階段路線；power rack預期2026下半年、row power center預期2027。屬供應路線，不是已實現收入。 [2026-08-11](https://blogs.nvidia.com/blog/800-vdc-power-architecture-ai-factory/)
- 台達官方展會頁列800VDC in-row power、DC-DC shelf及e-Fuse；產品存在可核對，未取得800V獨立訂單與收入。 [來源未顯示精確日期；查閱2026-10-02](https://www.deltaww.com/en-US/landing/Computex-2026)
- Wolfspeed與光寶公告合作及SiC技術在800VDC sidecar/compute rack PSU完成qualification；未披露客戶承諾量。 [2026-08-06](https://investor.wolfspeed.com/news/news-details/2026/Wolfspeed-and-LITEON-Partner-to-Support-Hyperscale-AI-Data-Center-Deployments-with-800-VDC-Power-Solutions/default.aspx)
- 貿聯公告開發800VDC連接器、線纜及busbar，應用power/compute rack；本來源較舊，不代表2026最新量產狀態。 [2025-10-14](https://www.bizlinktech.com/news/bizlink-advances-800-vdc-power-solutions-for-ai-infrastructure-with-nvidia)
- 康舒官方公司貼文展示1MW 800V DC power rack；精確發布日未核對，產品規格與效率屬公司陳述，非本研究獨立測試。 [來源未顯示精確日期；查閱2026-10-02](https://www.linkedin.com/posts/acbel-polytech-inc._gtc-acbel-gtc2026-activity-7439980675283259392-kJS8)

## EPS/consensus revisions
四家公司2026年度EPS consensus前值、本值、變動幅度皆null；未把產品規格、季度實績或目標價當作年度上修。

## Contradictory evidence
- 混合架構與原生機房採用期不同，不能把供應路線視為全部既有機房立即更換。
- 公開標準允許多供應商參與，無法證明個別台廠獨占或定價權。
- qualification、展示與效率宣稱尚未證明客戶訂單及收入；目前未找到足以推翻架構需求的量化反證，但實現風險仍大。
- 高壓直流導入需保護、安規及互通驗證；產品標稱效能不等於各負載下實測表現。
- 電源、連接器與busbar的商業機制不同；車用800V不能直接當作資料中心800V證據。

## Leader/beneficiaries
- 台達電 2308 (Leader): Product offering confirmed; orders and economics Unverified
- 光寶科 2301 (Candidate): Partner-reported qualification confirmed; committed orders Unverified
- 貿聯-KY 3665 (High Beta): Development announcement confirmed; latest production status Unverified
- 康舒 6282 (1MW / 800V HVDC Power System): Company product showcase confirmed; orders and independent performance Unverified

## Open questions
- 2026下半年實际驗收數量、供應商與重複下單證據是多少？
- 四家公司的800V收入、ASP與毛利，如何與既有電源/連接產品分開？
- 認證延遲、SiC供應與客戶機房改造會否使量產遞延？
- 新增800V產品有多少是取代舊產品，有多少是增量？

## Research focus
- 查最新法說與公開重大訊息的客戶量產證據
- 建立四家公司800V產品到收入的歸因表
- 核對預定時程與已交付實績的差距
- 補2026同年度EPS consensus比較，無來源維持null

## Change log — 2026-10-02
- 首次建立HVDC_800V四家公司研究底稿與Dashboard摘要。
- 拆開混合/原生架構、產品展示、qualification與已認列收入。
- 不足的訂單、獲利、估值保留Unverified；不調整Active Themes或市場分類。


## Forward outlook update — 2026-10-04

800V由驗證走向2027放量的機會比2026即時獲利更重要；採用速度仍由機房架構、客戶驗證及實際部署決定。

- Horizon: 2026Q4–2027Q3
- Direction: Improving (research assessment, not price forecast)

- 台達7/30英譯法說預期HVDC今年量仍小、明年才有較明顯量；±400V與800V須分開，中文原發言優先。
  - Type: 法說指引; timing: 2027; source date: 2026-07-30; source: https://filecenter.deltaww.com/IR/download/calendar/2Q26_Transcript.pdf
- NVIDIA列混合power rack於2026H2、row power center於2027供應的路線；是平台供應時程，不是台廠訂單。
  - Type: 新產品／平台路線; timing: 2026H2–2027; source date: 2026-08-11; source: https://blogs.nvidia.com/blog/800-vdc-power-architecture-ai-factory/

### Change log
- Added source-dated forward outlook; existing causal-chain confidence and unresolved questions retained. This is not completion of all fundamental/EPS gaps.


## Company evidence update — 2026-10-04

- 貿聯-KY (3665)：2026-09-30 FactSet中位數，2026 68.33、2027 120.38、2028 151.89元；2026前值68.98為同篇提供。未来年度前值/樣本數未知，不跨篇推revision。公司整體EPS不可全歸此題材。https://gfemobile.cnyes.com/news/id/6619079


### Change log
- Added checked company-specific evidence and retained limitations; no priority recommendation changed.
