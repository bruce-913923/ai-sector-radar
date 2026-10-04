# AI_ASIC — Active Theme Research

- Theme ID: `AI_ASIC`
- As of: 2026-09-29
- Market status: Accelerating
- Thesis status: Thesis Strengthening
- Repository state: `state/active-themes.json` rank 3
- Source of truth: GitHub repository `bruce-913923/ai-sector-radar`

## Current thesis

CSP / hyperscaler 自研 AI ASIC 持續由設計、tape-out 走向量產，形成 NVIDIA GPU 之外的第二條算力成長曲線。對台灣設計服務公司而言，真正需要驗證的不是「ASIC 題材是否存在」，而是專案能否由 NRE / design win 穩定轉成 wafer volume、量產營收與 EPS；同時必須分辨量產 revenue mix 對毛利率的稀釋效果。

## Causal chain

| Stage | Status | Current evidence |
|---|---|---|
| CSP self-designed ASIC demand | Confirmed | Hyperscaler custom silicon demand remains strong; 世芯明確指出北美 AI design demand 強勁，創意新一代 HBM4E IP 已獲客戶 AI ASIC 採用。 |
| Tape-out / qualification | Confirmed | 世芯 3nm AI accelerator 已進入量產；2nm accelerator NRE / tape-out pipeline持續；創意 2nm N2P HBM4E PHY/Controller 已 design-ready 並完成 tape-out。 |
| Mass production / wafer volume | Confirmed | 世芯北美 3nm accelerator 自 2026-05 開始出貨，Q2 持續放量；2026-07、08 月營收大幅年增。 |
| NRE + production revenue | Confirmed | 世芯 Q2 revenue USD 241.7m，較 Q1 USD 132.4m 大增；3nm/2nm 占 Q2 revenue 47%。 |
| Margin / operating leverage | Partial | Q2 gross profit與 net income改善，但量產 revenue mix 使毛利率低於以 NRE 為主的 Q1；營收成長不應直接外推成毛利率同步上升。 |
| EPS | Confirmed | 世芯 2026 EPS FactSet 中位數由 138.85 上修至 139.83。 |
| Market expectations | Confirmed | `state/market-theme-map.json` 將 AI_ASIC 列為 Accelerating，RS 90.32、momentum 77.42，但 breadth 僅 50%。 |
| Valuation / expectation risk | Partial | 市場已高度認知 2027 ASIC 成長；需靠量產節奏、客戶新增與 EPS revision 繼續驗證。 |

## Company evidence

### 世芯-KY 3661 — Leader

- 2026Q2 revenue USD 241.7m，較 Q1 USD 132.4m 大幅增加。
- Q2 gross profit USD 84.2m，較 Q1 USD 66.4m 增加 26.8%；net income USD 51.8m，較 Q1 USD 45.1m 增加 14.9%。
- Q2 3nm/2nm revenue mix 已達 47%，5nm/7nm 另占 40%。
- 北美 3nm accelerator 自 2026-05 開始出貨，公司表示預計持續放量至 Q3。
- 2026-08 revenue NT$8.776bn，YoY +273.61%；7 月亦年增 181.78%，顯示量產收入已開始實際反映。
- 2026-09 公司公開展示 3nm designs in production、2nm designs in development，先進節點執行能力仍在擴張。

### 創意 3443 — High Beta

- 2026-09-22 正式宣布 2nm N2P、16Gbps HBM4E PHY + Controller IP 已完成設計定案，並已獲客戶 AI ASIC 採用。
- HBM4E PHY 已在 TSMC CoWoS-L 上 tape-out；相較既有 N3P 12Gbps HBM4 IP，代表下一代 AI ASIC 的記憶體介面與先進封裝技術路線持續升級。
- 此證據屬於 **design win / technology adoption confirmation**，尚不能直接等同量產 wafer volume 或 2027 revenue 已鎖定。
- 可取得的最近 FactSet 2026 EPS consensus pair 為 2026-07-17 的 47.59 -> 48.02；截至本次研究未找到同等可靠且更新日期更近的 consensus pair，因此不把舊數字當成最新 revision。

## Margin bridge: a key distinction

世芯 Q2 的數字顯示 ASIC 量產模式的核心特性：

- Q1 gross margin 約 50.2%（66.4 / 132.4），公司亦稱 Q1 gross margin >50%，主要受有利 NRE mix 支持。
- Q2 gross margin 約 34.8%（84.2 / 241.7）。
- 但 Q2 gross profit仍由 USD 66.4m 升至 USD 84.2m，net income亦增加。

因此正確因果鏈是：

**量產 wafer volume -> revenue 大幅放大 -> gross margin % 可能因 production mix 下滑 -> gross profit / operating profit / EPS 仍可能因規模放大而上升。**

後續研究不能只看毛利率百分比，而要同時追 gross profit、operating profit、NRE / production mix 與 EPS。

## EPS revision log

| Company | Year | Previous | Current | Change | Source/date | Verification |
|---|---:|---:|---:|---:|---|---|
| 世芯-KY | 2026 | 138.85 | 139.83 | +0.71% | FactSet via Cnyes, 2026-09-21 | Confirmed |
| 世芯-KY | 2027 | — | 186.69 | — | FactSet via Cnyes, 2026-09-21 | Current level confirmed; no previous comparable value in same release |
| 創意 | 2026 | 47.59 | 48.02 | +0.90% | FactSet via Cnyes, 2026-07-17 | Confirmed historical pair; not fresh enough to represent current Sep revision |
| 創意 | 2026 current | — | — | — | No newer reliable consensus pair found in this run | Unconfirmed |

### 世芯 revision continuity

可驗證的 FactSet 2026 EPS 中位數：
- 2026-03-20: 129.50
- 2026-04-08: 130.48
- 2026-08-17: 133.98
- 2026-08-22: 138.85
- 2026-09-21: 139.83

中期趨勢仍是上修，但最近一次上修幅度已較前段溫和。

## Conflicting evidence / disconfirming checks

1. **專案時程風險是真實的。** 世芯 2026Q1 就曾因 tape-out milestone 延後而使當季 revenue 低於預期；先進 ASIC 的單一時程變動可顯著影響季度營收。
2. **量產會稀釋毛利率百分比。** Q2 進入 3nm production ramp 後，gross margin 約由 Q1 50% 降至 35%，不能把 revenue growth 直接等同 margin expansion。
3. **客戶集中度高。** 世芯 Q2 北美占 revenue 51%；大型專案集中使個別客戶或平台時程對營收影響放大。
4. **創意的最新技術突破仍主要是 design win。** HBM4E customer adoption 確認了技術地位，但尚缺可靠公開數據把它直接連到 2027 wafer volume / production revenue。
5. **breadth 只有 50%。** Repo market map 顯示資金與基本面認證並非所有 tracked names 同步，族群內分化值得保留。
6. **市場已提前交易 2027 成長。** 若量產延後、客戶專案取消、NRE轉量產不如預期，EPS revision 可能先於營收反轉。

## What changed vs previous state

這是 AI_ASIC 的第一份 longitudinal baseline。相較 registry 原始 thesis，新增的核心驗證是：

- 世芯 3nm ASIC 已從「預期量產」進入實際出貨與月營收放量；
- 3nm/2nm 已占世芯 Q2 revenue 47%，先進節點不再只是 NRE pipeline；
- 創意 2nm HBM4E IP 已由技術準備進入 AI ASIC 客戶採用；
- 世芯 2026 EPS consensus 繼續上修；
- 同時確認「量產放量會降低毛利率百分比」這項重要反證，避免把營收與 margin 錯誤線性外推。

## Thesis assessment

**Thesis Strengthening**

AI ASIC 的需求 -> tape-out -> production revenue -> EPS 因果鏈正在變得更實體化，尤其世芯已有量產與營收證據、創意已有下一代 IP customer adoption。但目前最需要追蹤的是 **專案時程、wafer volume、客戶集中度，以及 production mix 對 margin / EPS 的真實影響**，而不是只追題材或設計案數量。

## Next checks

- 世芯 9–12 月 revenue 是否延續 3nm accelerator ramp
- 3nm / 2nm revenue mix 與 production wafer volume
- 世芯 NRE vs production revenue mix
- gross profit / operating profit / EPS，而非只看 gross margin %
- 世芯 2026 / 2027 EPS consensus revision
- 創意 HBM4E customer adoption 是否出現量產時程 / wafer volume / revenue evidence
- 創意最新 2026 / 2027 EPS consensus
- 新增 CSP 客戶與客戶集中度變化
- tape-out / qualification delay 或 platform cancellation

## Sources

- GUC 2nm 16Gbps HBM4E IP, 2026-09-22: https://www.guc-asic.com/en/news/all/PR_20260922
- Alchip 2026Q2 financial results, 2026-08-26: https://www.alchip.com/public/index.php/tw/Newsroom/Alchip_2026_Q2_financial_results
- Alchip 2026Q1 financial results, 2026-05-27: https://www.alchip.com/en/Newsroom/Alchip_2026_Q1_financial_results
- Alchip AI Infra Summit 2026 update, 2026-09-14: https://www.alchip.com/en/Newsroom/Alchip_AI_Infra_Summit_2026
- 世芯 2026 EPS FactSet consensus, 2026-09-21: https://news.cnyes.com/news/id/6611574
- 世芯 FactSet revision history: https://www.cnyes.com/twstock/foreignrating.aspx?code=3661
- 創意 FactSet revision history: https://www.cnyes.com/twstock/foreignrating.aspx?code=3443

## Change log

### 2026-09-29
- Created initial AI ASIC research baseline.
- Confirmed 世芯 3nm accelerator transition into real production revenue.
- Confirmed 創意 2nm HBM4E IP customer adoption.
- Recorded 世芯 2026 EPS revision 138.85 -> 139.83 (+0.71%).
- Added production-mix gross-margin dilution and project timing as explicit disconfirming evidence.


## Forward outlook update — 2026-10-04

3nm量產延續與2nm新設計進展形成下一段成長機會；收入mix、tape-out及客戶集中使季度波動仍大。

- Horizon: 2026Q4–2027Q3
- Direction: Improving (research assessment, not price forecast)

- 創意2nm HBM4E IP已design-ready並獲客戶採用，但公告沒有量產營收時程；2027增量需客戶投片及交付驗證。
  - Type: 新產品／客戶採用; timing: 2026Q4–2027；量產時間未揭露; source date: 2026-09-22; source: https://www.guc-asic.com/en/news/all/PR_20260922
- 世芯3nm加速器5月開始交付並預期延續Q3；此歷史指引是後續月營收基準，不能直接保證Q4或2027成長。
  - Type: 法說指引／出貨; timing: 2026Q4–2027，待後續指引; source date: 2026-08-26; source: https://www.alchip.com/public/index.php/tw/Newsroom/Alchip_2026_Q2_financial_results

### Change log
- Added source-dated forward outlook; existing causal-chain confidence and unresolved questions retained. This is not completion of all fundamental/EPS gaps.


## 2026-10-04 公司別證據與展望

三家分屬設計服務／量產供應與平台型客製晶片。創意Q2量產占比高、收入季增21%但毛利額季減4%，顯示設計案結構與量產成本決定獲利；世芯3nm專案延續仍要看時程；聯發科Q4首ASIC生產與2026資料中心逾20億美元為公司指引，2027市占目標不是保證收入。不能用三家名目EPS高低排名，也不能將設計採用當2027量產訂單。

### 世芯-KY 3661
9/21中位數預估2027 EPS186.69元較2026年139.83元成長約33.5%；3nm量產後續延續與2nm案時程仍需逐項驗收
- 既有官方底稿Q2收入2.417億美元、Q1為1.324億美元；金額為美元，不轉寫成台幣。原文全文本次取回失敗，未新增未核實EPS
- EPS預估（2026／2027／2028）：139.83／186.69／260.93；來源日2026-09-21。名目值不作公司優劣排名。
- 風險：量產帶動收入卻可能稀釋毛利率；客戶／專案集中及設計時程仍會造成季度波動
- 下一步：三年度EPS直接來源已補，Q2原件重取及最新毛利／專案驗證仍待完成
- 來源：2026-09-21 https://gfe-desktop.cnyes.com/news/id/6611574?exp=a

### 創意 3443
7/17預估2027 EPS92.64元為舊快照；先進製程設計及量產是成長路徑，但Q2產品組合已使收入增加而利潤率下降
- Q2收入138.96億元，其中NRE/IP23.10億、量產服務115.86億；毛利率21.5%低於Q1的27.2%，EPS11.61低於12.28
- EPS預估（2026／2027／2028）：48.02／92.64／145.31；來源日2026-07-17。名目值不作公司優劣排名。
- 風險：營收季增21%，毛利額卻季減4%、營益季減8%；不能把量產放大直接推成EPS上修。7月共識需刷新
- 下一步：兩種收入及財務轉換已補，最新年度預估與2027專案量仍需核對
- 來源：2026-07-30 https://www.guc-asic.com/upload/2026_07_30/8_20260730150614vk7g0sPpn4.pdf；2026-07-17 https://news.cnyes.com/news/print/6537924；10/4查閱，發布日未知 https://www.guc-asic.com/en/investor/financial

### 聯發科 2454
8/4中位數2027 EPS138.81元高於2026年68.57元，成長重點包括資料中心ASIC，不能把此全公司增幅歸於Genio或邊緣AI
- Q2 TIFRS EPS15.28、毛利率46.2%、營益228.68億元；營益年減22.2%、淨利年減12.3%。調整後EPS15.71另列，不混用
- EPS預估（2026／2027／2028）：68.57／138.81／270.42；來源日2026-08-04。名目值不作公司優劣排名。
- 風險：10/4官網產品供應狀態仍將Genio Pro5100列工程樣品；Genio360／420為商用。3月Q3量產目標、9月已推出宣傳不能單獨證實大量付費出貨；首ASIC Q4生產、第二ASIC2028量產仍需交付／封裝良率驗證；手機疲弱及研發費用抵銷部分新業務成長
- 下一步：官方指引／實績與三年度EPS已補，Genio商用、ASIC收入實現及合理估值仍需驗證
- 來源：2026-07-31 https://www.mediatek.com/hubfs/MediaTek%20Assets/Pdfs/Quarterly%20Earnings%20Release/2026/Quarterly%20Earnings%20Release-2026Q2/Press%20Release.pdf；2026-07-31 https://www.mediatek.com/hubfs/MediaTek%20Assets/Pdfs/Quarterly%20Earnings%20Release/2026/Quarterly%20Earnings%20Release-2026Q2/Transcript.pdf；10/4查閱，發布日未知 https://www.mediatek.com/iot-longevity；2026-08-04 https://m.cnyes.com/news/id/6557957



