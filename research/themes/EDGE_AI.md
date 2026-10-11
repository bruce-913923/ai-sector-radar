# Edge AI／Industrial AI

資料基準2026-10-02；首次發布2026-10-03（Asia/Taipei）。研究狀態Insufficient Evidence表示已完成有來源的初查，但仍缺關鍵商業/財務證據，不是空白占位，也不是主題已獲驗證或買賣建議。

## Current thesis
工業/邊緣AI有運算平台、SoC產品與研華整體訂單成長佐證，但集團成長與Edge AI獨立商業化仍有差距。重點應從TOPS規格轉向付費部署、設計導入、量產及ROI。

## Research hypothesis
低延遲、隱私與離線需求帶動推論下沉，工業平台/SoC供應商以長期供貨及軟體整合切入；必須驗證實際部署量、客戶重複採購與產品毛利。

## Causal chain
- **需求 — Partial**：研華B/B1.44與產品應用支持需求，但非Edge AI單獨訂單。 [來源](https://www.advantech.com/zh-cn/resources/news/advantech-reports-2q26-eps-of-nt520?eventDate=19&eventType=physical)（2026-07-31）
- **訂單 — Unverified**：缺具名客戶付費部署數/訂單金額與續購。
- **供需 — Partial**：原料/供應成本壓力存在；不能套用資料中心GPU缺貨結論。 [來源](https://www.advantech.com/zh-cn/resources/news/advantech-reports-2q26-eps-of-nt520?eventDate=19&eventType=physical)（2026-07-31）
- **產能／稼動率 — Unverified**：Genio Pro Q3量產是3月計畫，本次未確認完成。 [來源](https://www.mediatek.com/press-room/mediatek-adds-new-genio-platforms-to-bring-ai-processing-to-robotics-drones-and-industrial-iot)（2026-03-10）
- **ASP／mix — Unverified**：缺Edge AI產品ASP、NPU SoC及軟體收入mix。
- **營收 — Partial**：研華Q2集團收入已核對，未分離Edge AI專屬貢獻。 [來源](https://www.advantech.com/zh-cn/resources/news/advantech-reports-2q26-eps-of-nt520?eventDate=19&eventType=physical)（2026-07-31）
- **毛利／營益率 — Partial**：研華毛利及營業利益有實績，但平台與專案成本尚未細分。 [來源](https://www.advantech.com/zh-cn/resources/news/advantech-reports-2q26-eps-of-nt520?eventDate=19&eventType=physical)（2026-07-31）
- **EPS — Unverified**：缺同年年度EPS consensus前後值。
- **市場預期 — Unverified**：TOPS、展示或合作不直接證明市場預期差。
- **評價 — Unverified**：缺專屬盈利與同日forward估值。

## Leader / beneficiaries
- 2395 研華（Leader）：工業邊緣平台與軟體，集團B/B強但Edge AI收入未拆 [來源](https://www.advantech.com/zh-cn/resources/news/advantech-reports-2q26-eps-of-nt520?eventDate=19&eventType=physical)
- 2454 聯發科（Edge AI SoC Platform）：Genio產品平台具體，Q3量產目標及收入需後續驗證 [來源](https://www.mediatek.com/press-room/mediatek-adds-new-genio-platforms-to-bring-ai-processing-to-robotics-drones-and-industrial-iot)

## Fundamental confirmation
- 2026-07-31：研華Q2營收26.126十億元、毛利9.845十億元、營業利益5.127十億元、EPS5.20；B/B1.44。全部是集團口徑，不等同Edge AI或機器人專屬收入。原料成本與供應挑戰仍存在。 [原始資料](https://www.advantech.com/zh-cn/resources/news/advantech-reports-2q26-eps-of-nt520?eventDate=19&eventType=physical)
- 2026-03-17：研華展示Jetson/IGX Thor邊緣平台、機器人控制器及Robotic Suite整合，確認運算/感知平台商業機制，展示未提供單獨訂單金額。 [原始資料](https://www.advantech.com/emt/resources/news/advantech-to-showcase-edge-ai-and-physical-ai-innovations-at-nvidia-gtc-2026)
- 2026-03-10：聯發科發布Genio Pro/420/360供工業、零售、機器人等Edge AI；3月資料稱Genio Pro Q3量產。本次未取得Q3完成量產與收入拆分確認，不能把過期目標当實績。 [原始資料](https://www.mediatek.com/press-room/mediatek-adds-new-genio-platforms-to-bring-ai-processing-to-robotics-drones-and-industrial-iot)

## Catalysts
- Genio量產實績確認
- 工業AI付費部署與重複採購
- 研華產品收入拆分

## EPS / consensus revisions
未取得同年份、可比、有日期的年度consensus前後配對，全部留null。集團季度財務僅是背景，不能全歸因本題材，也不以未來TAM或預算推EPS。

## Contradictory evidence
- 產品展示/算力規格可能先於付費大規模部署。
- 研華集團B/B涵蓋既有工業/嵌入式業務，不是Edge AI訂單比。
- 聯發科Genio僅占多元SoC業務一部分，無法由整體手機表現推論Edge AI。
- 客戶導入週期、軟體支援、功耗與BOM成本可能延緩量產。

## Open questions / Research focus
- Genio Pro Q3量產與付費客戶是否完成？
- Edge AI獨立收入、毛利、部署數如何？
- 研華專案從POC到批量轉換率？
- 客戶ROI與後續重複採購是否成立？

## Change log
- 2026-10-03：首次建立baseline，保留公司別成熟度、來源與證據缺口。首次建立Edge AI／Industrial AI2家公司的商業鏈與驗證狀態。 將產品展示、合作/採用、正式訂單與量產交付分開，保留收入/盈利缺口。
- 2026-10-12：batch2查核聯發科／研華估值股本與Edge AI獨立收入；兩家官方股本已核，但大摩候選三情境（聯發科CB未反映；研華股數、基準重現與RSA缺口）不採用，gap-02仍無直接揭露，三項改waiting_event。詳文末「2026-10-12 batch2」段與history/theme-research/2026-10-12-edge-ai-batch2-ext-2454-2395val-edgeai-revenue.json。


## Forward outlook update — 2026-10-04

工業與邊緣AI需求回升提供成長機會，但需將集團訂單與AI新增收入分開，供應成本仍可能抵消成長。

- Horizon: 2026Q4–2027Q3
- Direction: Improving (assessment, not price prediction)

- 研華Q2訂單出貨比1.44，北美1.92；管理層預期H2實體AI商業需求增加，但這不是全數AI訂單。
  - 訂單／公司指引; 2026H2–2027; source date: 2026-07-31; https://www.advantech.com/zh-cn/resources/news/advantech-reports-2q26-eps-of-nt520?eventDate=19&eventType=physical

### Change log
- Source-dated forward outlook added; forecasts remain forecasts. Original confidence, contrary evidence and unresolved questions retained.


## Company evidence update — 2026-10-04

- 研華 (2395)：2026-09-15 FactSet中位數，2026 20.27、2027 23.89、2028 26.97元；2026前值19.95為同篇提供。未来年度前值/樣本數未知，不跨篇推revision。公司整體EPS不可全歸此題材。https://gfemobile.cnyes.com/news/id/6606461


### Change log
- Added checked company-specific evidence and retained limitations; no priority recommendation changed.


## 2026-10-04 公司別證據與展望

研華是運算平台與整合方案商，聯發科供應晶片平台，兩者全公司EPS都含題材外業務。研華Q2 B/B1.44有訂單支撐，但AI批量轉換率仍未拆；聯發科智慧裝置占53%包含多種終端，而資料中心ASIC指引不能挪作Genio成長。10/4 Genio Pro5100仍標工程樣品，產品發表和已量產收款要分開，這是需要追查的時程落差。

### 研華 2395
9/15中位數2027 EPS23.89元較2026年20.27元成長約17.9%；Q2訂單出貨比1.44支持需求，但需看交付、成本與AI商業化實際貢獻
- Q2營收261.26億元、毛利98.45億元、營益51.27億元、EPS5.20；集團訂單出貨比1.44
- EPS預估（2026／2027／2028）：20.27／23.89／26.97；來源日2026-09-15。名目值不作公司優劣排名。
- 風險：原料成本及供應鏈仍是壓力；集團B/B無法回答AI專案從概念驗證到批量的轉換率與獨立毛利
- 下一步：實績與成長預期已量化，AI專案轉換率／估值及現金回收尚不足
- 來源：2026-07-31 https://www.advantech.com/en-us/resources/news/advantech-reports-2q26-eps-of-nt520；2026-09-15 https://gfemobile.cnyes.com/news/id/6606461

### 聯發科 2454
8/4中位數2027 EPS138.81元高於2026年68.57元，成長重點包括資料中心ASIC，不能把此全公司增幅歸於Genio或邊緣AI
- Q2 TIFRS EPS15.28、毛利率46.2%、營益228.68億元；營益年減22.2%、淨利年減12.3%。調整後EPS15.71另列，不混用
- EPS預估（2026／2027／2028）：68.57／138.81／270.42；來源日2026-08-04。名目值不作公司優劣排名。
- 風險：10/4官網產品供應狀態仍將Genio Pro5100列工程樣品；Genio360／420為商用。3月Q3量產目標、9月已推出宣傳不能單獨證實大量付費出貨；首ASIC Q4生產、第二ASIC2028量產仍需交付／封裝良率驗證；手機疲弱及研發費用抵銷部分新業務成長
- 下一步：官方指引／實績與三年度EPS已補，Genio商用、ASIC收入實現及合理估值仍需驗證
- 來源：2026-07-31 https://www.mediatek.com/hubfs/MediaTek%20Assets/Pdfs/Quarterly%20Earnings%20Release/2026/Quarterly%20Earnings%20Release-2026Q2/Press%20Release.pdf；2026-07-31 https://www.mediatek.com/hubfs/MediaTek%20Assets/Pdfs/Quarterly%20Earnings%20Release/2026/Quarterly%20Earnings%20Release-2026Q2/Transcript.pdf；10/4查閱，發布日未知 https://www.mediatek.com/iot-longevity；2026-08-04 https://m.cnyes.com/news/id/6557957


Genio官方供應表與原Q3生產目標存在待核對落差；待驗證問題轉成有基準／下次檢查日的監測，沒有擅自斷言產品全面延期。


## 2026-10-05 估值參照補充（非合理價）

行情固定為2026-10-02，取自既有GitHub Actions結果：https://github.com/bruce-913923/ai-sector-radar/blob/ed9a5f8ca5eb3d00d2733b7363580b7c237fe80c/state/priority-candidates.json

| 公司 | 收盤（元） | 2027 EPS（元） | 預估日期 | 參考本益比 | 預估來源 |
| --- | ---: | ---: | --- | ---: | --- |
| 研華 2395 | 716 | 23.89 | 2026-09-15 | 29.97 | https://gfemobile.cnyes.com/news/id/6606461 |
| 聯發科 2454 | 4950 | 138.81 | 2026-08-04 | 35.66 | https://m.cnyes.com/news/id/6557957 |

以上為收盤÷來源EPS的條件式計算，並非可直接使用的合理倍數或目標價。估計日期不同，不拿名目EPS或倍數直接排名；預估股本、經常性獲利、歷史／同業倍數與完整情境仍須補。沒有調整正式推薦門檻、行情或大盤分類。


## 2026-10-05 平台角色與商業成熟度

- 2395：研華ASR-D501採高通QCS6490，12 TOPS、低於10W，作為無人機感知／任務電腦，與主飛控分工；產品推出可支持邊緣AI商業角色，但未披露付費部署、訂單或獨立收入。2027 CQ8平台擴充仍為計畫。 來源：https://www.advantech.com/emt/resources/news/asr-d501-grand-launch（2026-09-29）
- 2454：聯發科Genio Pro／420／360具工業、機器人與邊緣運算產品角色；3月Q3量產為原始計畫。9/30官方Genio Pro5100 Yocto PR1仍限定開發評估、不宜用於正式生產；這只證明該軟體版本成熟度，不能據此斷言晶片全數未出貨或Q3量產必然失敗。 來源：https://www.mediatek.com/press-room/mediatek-adds-new-genio-platforms-to-bring-ai-processing-to-robotics-drones-and-industrial-iot（2026-03-10）

[Genio Pro5100 PR1](https://genio-community.mediatek.com/t/genio-pro-5100-pre-release-1/3241)（2026-09-30）僅代表此軟體版本用途；[研華ASR-D501](https://www.advantech.com/emt/resources/news/asr-d501-grand-launch)（2026-09-29）未披露付費部署。


## 2026-10-07 客戶效益與再採購首次專項查核

研華8/1官方MHP案例提供具名落地證據：TREK-60在逾6個鑽探專案使用，公司稱鑽探／灌漿效率提高六倍、整體開挖效率提升逾20%。這些是供應商案例宣稱，沒有投入成本、回收期、訂單金額或重複採購單，尚不能算已驗證財務ROI。

8/12工安與8/26車載案例展示產品架構及效益，但已查頁面沒有具名付費客戶、回收期與再採購數。產品用途、專案採用與後續付費訂單應分開，不能由6個部署專案直接推研華2027營收。

已證明的是具名應用場景與供應商所報部署，不是經獨立稽核的現金回報。MHP部署數不是研華新增訂單筆數，效率六倍也不是投資報酬六倍；未採用文中的絕對零風險宣稱。

來源：
- 2026-08-01 https://www.advantech.com.cn/en/resources/case-study/advantech-empowers-mhp-launching-the-world%E2%80%99s-first-intelligent-geological-safety-system-for-tunneling
- 2026-08-12 https://www.advantech.com/emt/resources/case-study/ai-powered-workplace-safety-monitoring-protects-factory-personnel
- 2026-08-26 https://www.advantech.com/emt/resources/case-study/on-board-intelligence-system

EDGE_AI-gap-04由尚未檢查轉為部分完成：下一步取得客戶端驗收、投入成本／回收期、再採購與聯發科付費部署證據。不把未知填零、不因此調高年度EPS或估值。


## 2026-10-07 聯發科融資與潛在股本

聯發科不應停留在7/31的50億美元融資框架：8/31發行文件已列39億美元零息可轉債，初始轉換價4,513.75元、固定匯率31.643，轉換期自12/9開始。依初始條件全數轉換約增加2,734.04萬股，屬條件式潛在股數，不能算成10月已發行新股或直接扣減EPS。

NVIDIA 8/31官方公告確認35億美元可轉債投資，合作涵蓋NVLink Fusion、邊緣運算及車用；資金與合作不等客戶新增訂單或ASIC收入。發行文件用途為外幣購料，後續需查交割、實際支用及年度稀釋EPS。

- SGX發行文件：https://links.sgx.com/FileOpen/MediaTek%20Inc.%20-%20Final%20Offering%20Circular%20dated%2031%20August%202026.ashx?App=Prospectus&FileID=70978
- NVIDIA官方公告：https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-and-MediaTek-Deepen-Long-Standing-Partnership-to-Build-AI-Edge-to-Cloud-Computing-Platforms/default.aspx

保留7/31指引作歷史基準；後續8/31條件已具體化，不再只停在融資預算。尚未取得交割收據與季度稀釋分母，不冒稱全數已轉股。


## 2026-10-07 研華AI占比與實際部署分開

- 研華8/5法說具名報導指出H1 AI產品收入占比22.5%、全年目標30%，可補足先前只有集團營收的線索。但這包含邊緣伺服器、雲端基礎設施等AI相關產品，尚非獨立Edge AI毛利或機器人收入，不能把占比直接乘集團獲利。

- 8/5官方簡報提供H1事業別：智慧系統營收5.46億美元、毛利率40–45%；嵌入式5.10億美元、毛利率30–35%。兩者均含多種工業／醫療／半導體應用，不能替代AI專屬分部；集團現金週轉82天高於Q1的79天，收入成長仍須追營運資金。

- 同場報導的123件Design Win及預估年營收4.44億美元是專案與潛在貢獻，不能當已付費部署123套或已認列收入；機器人專案逾150件仍被管理層描述為收入貢獻不明顯。原件未提供獨立Edge AI部署數及毛利，相關缺口保留。

來源：[2026-08-05](https://advcloudfiles.advantech.com/investor/Events/Advantech_2Q_2026_Investors_Meeting_English.pdf)；[2026-08-05](https://ec.ltn.com.tw/amp/article/breakingnews/5529602)

原先『只有集團數字』補為已取得AI相關占比及事業別範圍，仍無純Edge AI毛利與付費部署計數。追蹤原始2026全年30%目標，不因新增指標就視為已實現。


## 2026-10-12 batch2：估值股本核對與Edge AI獨立收入查核

範圍：EDGE_AI-2454-valuation-evidence、EDGE_AI-2395-valuation-evidence（同步鏡像PHYSICAL_AI-2395-valuation-evidence）、EDGE_AI-gap-02。未使用9月月營收或未公布的Q3財報；券商PDF均取自第三方轉載站oilgoldalpha（非券商官方入口，頁首有客戶浮水印）。三項都未結案，狀態改為waiting_event。標「推算」者為本站算術，不是公司或券商揭露。

### 聯發科 2454：股本已核，大摩三情境因CB未反映而不採用

| 項目 | 數值 | 出處 |
| --- | --- | --- |
| 已發行普通股（2026-06-30） | 1,603,895仟股 | 115Q2財報中文p.37（英文p.39） |
| 子公司翔發持有庫藏股 | 7,794,085股 | 中文p.38（英文p.40） |
| Q2／H1基本加權 | 1,592,690,268股 | 中文p.51（英文p.55） |
| Q2／H1稀釋加權 | 1,595,922,559／1,596,059,674股 | 同上 |
| 基本EPS | Q2 15.28元、H1 30.44元（TIFRS） | 同上 |
| 8月RSA後已發行 | 1,604,952,613股 | SGX發行文件p.86 |
| CB | US$3.9bn零息、初始轉換價4,513.75元、匯率31.643、2026-12-09起可轉；全轉27,340,393股＝1.675%（推算） | 發行文件p.1、p.14、p.114 |

大摩2026-09-28（Charlie Chan等；原印September 27, 2026 09:43 PM GMT）Risk Reward p.10，三情境都套同一2027e EPS 146.97元：

| 情境 | 價值（元） | 方法 | 原文假設摘要 | 相對10/8收盤4,690元（推算） |
| --- | ---: | --- | --- | ---: |
| 保守 | 3,150 | 21倍2027e | 競爭加劇與份額流失壓縮毛利、新興市場停滯，ASIC／IoT／車用／邊緣AI進展慢 | -32.84% |
| 基準 | 6,188 | 剩餘收益法（股權成本9.2%、中期成長12%、永續3%），隱含42倍 | 中國手機份額35–40%，AI ASIC為重點，2025–28營收CAGR逾50% | +31.94% |
| 樂觀 | 8,500 | 58倍2027e | 取得對中國品牌出貨許可、新興市場回升、ASP上升，IoT／車用／邊緣AI與TPU需求更佳 | +81.24% |

- 重現：剩餘收益表478,709＋3,230,987＋6,156,971＝9,866,667百萬元÷1,594百萬股＝6,189.9元（推算，原印6,188，差0.03%）。模型加權股數1,591–1,594百萬，與官方H1加權差0.1–0.2%。
- 不採用理由：①稀釋股數未含CB約27.34百萬潛在股；②資產負債表長期負債維持6,795百萬元，但現金流量表2026e–28e每年列長期借款增加50,000百萬元，模型內部不一致，也未見約NT$1,234億CB負債；③大摩為該CB唯一Initial Purchaser，且p.14揭露12個月內承銷聯發科證券；④封面Sh out dil 1,565百萬與RIM 1,594不一致。
- 本站if-converted敏感度（推算，不採用）：2027e EPS約144.5元（−1.7%）；套58／42／21倍約8,380／6,068／3,034元；剩餘收益法約6,160元。
- 其他券商只有單一目標價且未納入CB：UBS 9/23 Buy 7,300元（27倍2027–28E平均）、GS 9/1 Buy 7,000元（25倍2H27–1H28E）、JPM 8/31 OW 5,600元（24倍）、麥格理8/31 Outperform 10,000元（PER）。不平均。
- FactSet（鉅亨API）：2027 EPS中位數140.78元（n=26，68.56–185.78，10/8）；目標價中位數5,961元（n=26，4,200–10,369，10/7）。4,690÷140.78＝33.31倍，僅條件式參照。
- AI_ASIC-2454-valuation-evidence問題與完成條件相同，但origin/main內容已分歧（7筆證據、3筆歷史、不同結論），依指示未鏡像、未修改。

### 研華 2395：股本已核，大摩三情境三個缺口未補，不採用

| 項目 | 數值 | 出處 |
| --- | --- | --- |
| 流通在外（2026-06-30） | 869,046仟股（期初865,830＋員工認股3,216），無庫藏股 | 115Q2財報p.7、p.41 |
| Q2基本／稀釋加權 | 868,254／874,245仟股 | p.50 |
| H1基本／稀釋加權 | 867,296／873,146仟股 | p.50 |
| Q2歸母淨利／EPS | 4,517,872仟元；基本5.20、稀釋5.16元（4,517,872÷868,254＝5.203，推算） | p.9、p.49–50 |
| 員工認股權流通 | 7,556仟股（加權履約價188.36元） | p.37 |
| 2025年度分配 | 現金股利9.2元＋資本公積2.0元，無股票股利 | p.42；股東會議事錄p.3 |
| 限制員工權利新股 | 上限4,000,000股（約0.46%，推算），5/29通過、未發行；公司估2027 EPS稀釋0.55元 | 議事錄p.3–4 |

大摩2026-08-06（Derrick Yang等；原印August 6, 2026 01:13 AM GMT）Risk Reward p.7，9/7與10/7更新維持720元與EPS：

| 情境 | 價值（元） | 方法 | 原文假設摘要 | 相對10/8收盤727元（推算） |
| --- | ---: | --- | --- | ---: |
| 保守 | 380 | 16倍2027e EPS 23.77 | edge AI導入放緩、總經不確定 | -47.73% |
| 基準 | 720 | 30倍2027e EPS 23.77（PEG 1.0、2025–28獲利CAGR 30%） | 受惠工業物聯網擴散與edge AI機會 | -0.96% |
| 樂觀 | 950 | 40倍2027e EPS 23.77 | 軟體與平台應用較快成長 | +30.67% |

- 不採用理由：①大摩各年固定864百萬股，少於官方流通在外0.6%、Q2稀釋加權1.2%；②30×23.77＝713.1≠720（−1.0%，推算），保守與樂觀可重現；③未提已通過的RSA。以官方稀釋股數重算約23.50元、376／705／940元，僅本站敏感度。
- 瑞銀股數874百萬與官方吻合、基準744可重現，但8/6 spectrum上下檔900／480未標倍數，9/15目標價改782元（30×26.07，已含RSA費用）後未更新；美銀8/7 800元（951百萬股無法對帳）、大和8/5 700元均為單點。不平均。
- FactSet（鉅亨API）：2027 EPS中位數24.08元（n=17，20.30–27.59，9/29）；目標價中位數750元（n=16，530–803，9/29）。727÷24.08＝30.19倍，僅條件式參照；eps_revisions仍保留9/15快照，不跨來源推算修正。

### Edge AI獨立收入、毛利與部署數（gap-02）

- 研華：官方1H26逐字稿p.5稱edge computing業務約近50%營收（非Edge AI、無金額）；p.9伺服器／雲端產品成長逾100%、邊緣AI運算平台成長30–50%、機器人占比relatively small；p.3與p.10的123件Design Win地區與年營收（US$444m／440m）互相矛盾，且是潛在年營收。115Q2財報p.44收入細分與p.74–75部門資訊只有五個事業群（1H26合計46,511,554仟元），無AI類別。
- 22.5%只有自由時報單一來源（含伺服器／雲端）；中央社2025-11-05稱「邊緣AI業務」2025Q3占17%、2026年中有機會25%，名稱與定義未書面公開。22.5%×1H26營收≈NT$10,465百萬元（推算），只是AI產品量級，不填入獨立Edge AI收入。
- 聯發科：財報p.81單一營運部門；簡報p.19 Smart Edge Platforms占Q2營收53%（含連網、PC、車用、TV、客製服務），逐字稿未提Genio或IoT；Genio Pro 5100官方供應頁10/12仍列Engineering Samples（Last-Modified 10/9），產品頁正式Yocto標2027Q1，PR1僅供評估。沒有付費部署數。
- 結論：兩家都沒有直接揭露的Edge AI收入、毛利或部署數；缺資料不結案，改waiting_event。

### 下一次檢查

- 研華2026-11-04 15:30 Q3線上法說（MOPS已登錄，簡報會後公告）後1–3個交易日：大摩／瑞銀新版三情境的股數、基準重現與RSA處理；簡報與逐字稿是否首度揭露AI金額、毛利或出貨數。
- 聯發科Q3法說日期截至10/12未公告（記null）；每週查MOPS／IR行事曆與轉載站新報告，看具名券商是否把CB納入稀釋股數。
- 兩家2026Q3財報（法定期限2026-11-14前，實際日期依公告）的加權股數、CB會計分類與收入細分附註。

來源：
- 聯發科115Q2財報：https://doc.twse.com.tw/server-java/t57sb01?step=1&colorchg=1&co_id=2454&year=115&mtype=A
- SGX發行文件：https://links.sgx.com/FileOpen/MediaTek%20Inc.%20-%20Final%20Offering%20Circular%20dated%2031%20August%202026.ashx?App=Prospectus&FileID=70978
- 大摩聯發科9/28、9/30：https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2454_MS_20260928.pdf；https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2454_MS_20260930.pdf
- UBS／GS／JPM／麥格理聯發科：https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2454_UBS_20260923.pdf；https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2454_GS_20260901.pdf；https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2454_JPM_20260831.pdf；https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2454_Macquarie_20260901.pdf
- 研華115Q2財報與股東會議事錄：https://doc.twse.com.tw/server-java/t57sb01?step=1&colorchg=1&co_id=2395&year=115&mtype=A；https://doc.twse.com.tw/server-java/t57sb01?step=1&colorchg=1&co_id=2395&year=115&mtype=F
- 大摩研華8/6、9/7、10/7：https://www.oilgoldalpha.com/report-file?path=reports%2Fstocks%2F260806_ms_advantech.pdf；https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2395_MS_20260907.pdf；https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2395_MS_20261007.pdf
- 瑞銀／美銀／大和研華：https://www.oilgoldalpha.com/report-file?path=reports%2Fstocks%2F260806_ubs_advantech.pdf；https://www.oilgoldalpha.com/report-file?path=reports%2Fforeign%2F2395_UBS_20260915.pdf；https://www.oilgoldalpha.com/report-file?path=reports%2Fstocks%2F260807_ml_advantech.pdf；https://www.oilgoldalpha.com/report-file?path=reports%2Fstocks%2F20260805_report_2395%E7%A0%94%E8%8F%AF_Daiwa.pdf
- FactSet（鉅亨API）：https://marketinfo.api.cnyes.com/mi/api/v1/financialIndicator/estimateProfit/TWS:2395:STOCK?type=eps；https://marketinfo.api.cnyes.com/mi/api/v1/financialIndicator/estimateProfit/TWS:2454:STOCK?type=eps
- 研華1H26逐字稿：https://advcloudfiles.advantech.com/investor/Events/Advantech_1H26_Earnings_Call_Transcript_English.pdf；中央社2025-11-05：https://www.cna.com.tw/news/afe/202511050372.aspx
- 聯發科2Q26簡報：https://www.mediatek.com/hubfs/MediaTek%20Assets/Pdfs/Quarterly%20Earnings%20Release/2026/Quarterly%20Earnings%20Release-2026Q2/Presentation.pdf；Genio供應頁：https://www.mediatek.com/iot-longevity
- 行情：https://github.com/bruce-913923/ai-sector-radar/blob/a87323148146abf2a9e806f588c6c07085e7fb8e/state/priority-candidates.json
- 歷史快照：history/theme-research/2026-10-12-edge-ai-batch2-ext-2454-2395val-edgeai-revenue.json
