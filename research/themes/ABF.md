# ABF — Active Theme Research

- Theme ID: `ABF`
- As of: 2026-10-02
- Market status: Accelerating
- Thesis status: Thesis Strengthening
- Repository state: `state/active-themes.json` rank 2
- Source of truth: GitHub repository `bruce-913923/ai-sector-radar`

## Current thesis

GPU / AI ASIC package 面積、I/O、HBM 數量與載板層數持續提升，使高階 ABF 單顆價值量上升。需求、稼動率、AI mix、售價、毛利與擴產仍互相驗證；截至 2026-10-02，南電 2026 EPS consensus 再度上修，但市場強度也進一步升高，因此下一階段需更嚴格比較 earnings revision 與已反映的價格預期。

## Causal chain

| Stage | Status | Current evidence |
|---|---|---|
| Demand | Confirmed | AI GPU / ASIC / HPC 帶動高階載板需求，欣興 2026H1 AI 產品占比已逾 60%，公司預期 H2 可接近 70%。 |
| Orders | Confirmed | 欣興與景碩擴產皆明確對應高階 AI / 策略客戶需求。 |
| Supply / demand | Confirmed | 欣興載板稼動率已逾 90%，並持續透過價格調整反映成本與需求；材料瓶頸仍存在。 |
| Capacity / utilization | Confirmed | 欣興 2026Q2 載板稼動率逾 90%；景碩規劃 2027 年 ABF 月產能由約 4,000 萬顆升至 5,000 萬顆。 |
| ASP / mix | Confirmed | 欣興表示 ABF 價格採滾動式調整；2026Q2 ABF 營收占比 52%，季增 22%、年增 51%。 |
| Revenue | Confirmed | 景碩 2026-08 營收 48.10 億元，年增 40.58%，連續五個月創新高。 |
| Margin | Confirmed | 欣興 2026Q2 毛利率約 24.8%，較 Q1 明顯提升；公司說明主要來自售價、稼動率、良率與產品 mix 改善。 |
| EPS | Confirmed | 南電 2026 EPS FactSet 中位數持續上修。 |
| Market expectations | Confirmed | `state/market-theme-map.json` 將 ABF 列為 Accelerating，RS 83.87、momentum 96.77、breadth 100%。 |
| Valuation | Partial | 基本面改善已被市場辨識；需要持續確認 EPS revision 是否追得上股價與擴產預期。 |

## Company evidence

### 欣興 3037 — Leader

- 2026Q2 ABF 載板營收占比 52%，季增 22%、年增 51%。
- 2026Q2 載板稼動率逾 90%。
- 2026Q2 毛利率約 24.8%；改善來自售價調整、稼動率提升、良率及產品組合改善。
- 2026 年資本支出上修至 537 億元，其中約 80%–85% 投向 ABF。
- 公司表示 AI 產品占比 2026H1 已超過 60%，H2 可望接近 70%。

### 南電 8046 — High Beta

最新可驗證 FactSet consensus 顯示 2026 EPS 中位數持續上修，2027 中位數亦處於高成長預期。這是目前 ABF 主線中最乾淨的 EPS revision 訊號之一。

### 景碩 3189 — Candidate

- 2026-08 營收 48.10 億元，年增 40.58%，連續五個月創單月新高。
- 規劃 2027 年 ABF 月產能由約 4,000 萬顆提高至 5,000 萬顆，增幅約 25%。
- 新增產能主要鎖定高階 AI 載板；公司預計依後續客戶訂單再決定設備投資。

## EPS revision log

| Company | Year | Previous | Current | Change | Source/date | Verification |
|---|---:|---:|---:|---:|---|---|
| 南電 | 2026 | 17.25 | 17.61 | +2.09% | FactSet via Cnyes, 2026-09-18 | Confirmed |
| 南電 | 2027 | — | 44.11 | — | FactSet via Cnyes, 2026-09-18 | Current level confirmed; no reliable previous comparable value retained |
| 欣興 | 2026 | — | — | — | No reliable current consensus pair found in this run | Unconfirmed |
| 景碩 | 2026 | — | — | — | No reliable current consensus pair found in this run | Unconfirmed |

| 南電 | 2026 | 17.68 | 17.85 | +0.96% | FactSet via Cnyes, 2026-10-02 | Confirmed |
| 南電 | 2027 | — | 45.79 | — | FactSet via Cnyes, 2026-10-02 | Current level confirmed; no same-release prior value |

### 南電 revision continuity

- 2026-08-28: 2026 EPS median 17.08
- 2026-09-15: 17.25
- 2026-09-18: 17.61

這不是單點跳升，而是至少數週連續上修。

## Conflicting evidence / disconfirming checks

1. **擴產本身也是反證來源。** 欣興與景碩都在增加高階 ABF 產能；若新增供給速度超過 AI ASIC / GPU 實際拉貨，供需缺口可能比市場預期更早緩解。
2. **高稼動率不等於永久缺貨。** 目前 >90% 利用率支持短期緊俏，但 2027 新產能開出後仍需重新驗證。
3. **材料瓶頸可同時推升成本。** 玻纖布、CCL、貴金屬等緊張雖可支持報價，但若轉嫁不完全，毛利改善可能受限。
4. **景碩擴產仍以訂單為條件。** 公司表示會依 2027–2029 客戶產能配置與訂單決定後續設備投資，代表目前部分遠期需求仍非完全鎖定。
5. **市場已進入 Accelerating。** 價格與基本面同步走強後，之後需要 EPS / margin 再上修才能維持正向 expectation gap。

## What changed vs previous state

這是 ABF 的第一份 longitudinal baseline。相較 registry 原始 thesis，新增的關鍵驗證是：

- 高階載板需求已反映到 >90% 稼動率；
- AI mix 上升已反映到售價與毛利率；
- 2027 擴產已有明確規模；
- 南電 EPS consensus 出現連續上修。

因此目前不是只有「規格升級」敘事，而是已進入訂單 / 稼動率 / margin / EPS 都開始互相驗證的階段。

## Thesis assessment

**Thesis Strengthening**

ABF 目前是三條 Active Themes 中因果鏈最完整的一條：需求、稼動率、擴產、價格、毛利與 EPS revision 都已有公開證據。但下一階段的核心不是再確認「AI 需要 ABF」，而是確認新增產能是否仍低於 2027 實際需求，以及 EPS revision 是否繼續高於市場已反映的預期。

## Next checks

- 欣興 / 南電 / 景碩月營收
- ABF 利用率是否維持 90% 以上
- 高階 ABF ASP / rolling price adjustment
- 2027 新產能開出節奏與客戶綁定程度
- 毛利率 / 營益率是否延續改善
- 南電、欣興、景碩 2026 / 2027 EPS consensus revision
- 新增供給是否導致交期縮短或價格壓力
- AI GPU / ASIC package 面積、HBM 數與層數變化

## Sources

- 欣興 2026-07-29 法說摘要（自由財經）: https://ec.ltn.com.tw/article/breakingnews/5521744
- 欣興 2026-07-29 法說摘要（經濟日報）: https://money.udn.com/money/story/5612/9658253
- 欣興資本支出 / ABF 投資（TechNews）: https://finance.technews.tw/2026/07/29/emib-t-advanced-packaging-substrate/
- 景碩 2026-09-07 月營收與 2027 ABF 產能規劃（MoneyDJ）: https://www.moneydj.com/kmdj/news/newsviewer.aspx?a=92681c6f-4a07-4bbe-ad9f-aef937dd4c18
- 南電 FactSet EPS consensus 2026-09-18（鉅亨）: https://gfemobile.cnyes.com/news/id/6609959
- 南電 FactSet revision history（鉅亨）: https://www.cnyes.com/twstock/foreignrating.aspx?code=8046

## Change log

### 2026-09-29
- Created initial ABF research baseline.
- Validated demand -> utilization -> pricing/mix -> margin -> EPS chain.
- Recorded 南電 2026 EPS revision 17.25 -> 17.61 (+2.09%).
- Added capacity expansion as a primary disconfirming check rather than treating expansion as automatically bullish.


### 2026-10-02 — incremental update

- Market Theme Radar keeps ABF at **Accelerating** with RS 96.77, momentum 100, breadth 100%, heat 0.87.
- FactSet consensus for 南電 2026 EPS moved from **17.68 to 17.85 (+0.96%)** on 2026-10-02; 2027 median is now 45.79.
- This extends the prior upward revision sequence rather than replacing it.
- Fundamental chain remains intact: high-end demand, >90% utilization evidence, rolling price adjustment, mix improvement and margin improvement are still the key confirmations.
- The main new risk is expectation/crowding: all three representative ABF stocks are now in an overheated market state, so future research should test whether 2027 orders, ASP and EPS revisions continue to outrun price expectations.
- Thesis status remains **Thesis Strengthening**.

Source:
- https://news.cnyes.com/news/id/6620078


## Forward outlook update — 2026-10-04

高階ABF的未來成長看2027擴產能否配合客戶平台放量，並維持售價及獲利；規劃產能與客戶洽談尚非全部訂單鎖定。

- Horizon: 2026Q4–2027Q3
- Direction: Improving (research assessment, not price forecast)

- 景碩規劃2027月產能由4,000萬顆增至5,000萬顆；後續設備投資仍依2027–2029訂單決定，需追正式承諾。
  - Type: 產能／公司說法經媒體轉述; timing: 2027; source date: 2026-09-07; source: https://www.moneydj.com/kmdj/news/newsviewer.aspx?a=92681c6f-4a07-4bbe-ad9f-aef937dd4c18
- 南電2027 EPS共識中位數45.79元、2028為87.41元；是10/2預估，不是保證或全族群獲利。
  - Type: 法人預估; timing: 2027–2028; source date: 2026-10-02; source: https://news.cnyes.com/news/id/6620078

### Change log
- Added source-dated forward outlook; existing causal-chain confidence and unresolved questions retained. This is not completion of all fundamental/EPS gaps.


## Company EPS coverage — 2026-10-04

ABF三家登錄公司全部列示，數字為公司整體FactSet consensus median，單位TWD/share，並非ABF單一產品獲利。

- 欣興 (3037), 2026-10-02: 2026 20.95, 2027 39.24, 2028 65.08. 2026前值20.63來自同篇報導；2027/2028前值和樣本數未披露。
  - https://gfe-desktop.cnyes.com/news/id/6620076?exp=a
- 南電 (8046), 2026-10-02: 2026 17.85, 2027 45.79, 2028 87.41. 2026前值17.68來自同篇報導；2027/2028前值和樣本數未披露。
  - https://news.cnyes.com/news/id/6620078
- 景碩 (3189), 2026-09-30: 2026 11.42, 2027 25.94, 2028 55.51. 2026前值11.17來自同篇報導；2027/2028前值和樣本數未披露。
  - https://news.cnyes.com/news/id/6618534

三家預估日期不同，不能據EPS絕對值比較估值或優劣；未跨報導推算revision，也未引用來源頁標示異常的歷史EPS表。未來成長需要由各公司營收、產能、mix、毛利與後續共識變動驗證。


## 2026-10-04：三家公司官方實績與未來預期對照

### 產業結論

高階ABF需求已反映在三家公司第二季營收與毛利改善，未來股價論證仍取決於2027高成長EPS預期能否實現。欣興需拆分業外利益，景碩需排除光學業務混算，南電需核對庫存與收款；擴產計畫不等於遠期訂單已鎖定。

訂單／供需改為「部分確認」：已實現營收、毛利改善與公司擴產，不能代替2027客戶最低採購量或產能預留承諾。先前底稿的「訂單已確認」語氣過強，此處修正並保留歷史紀錄。

### 未來成長與當期支撐

#### 欣興（3037）

市場預估2027年EPS 39.24元，較2026年20.95元成長87.3%；需由高階載板出貨、產品組合與經常性利潤驗證，非公司保證。EPS為不同日期的法人共識中位數，未來股本口徑尚待獨立驗證；不能按成長百分比直接排名推薦。

- 2026年EPS預估：20.95元；資料日期2026-10-02；[來源](https://gfe-desktop.cnyes.com/news/id/6620076?exp=a)
- 2027年EPS預估：39.24元；資料日期2026-10-02；[來源](https://gfe-desktop.cnyes.com/news/id/6620076?exp=a)
- 2028年EPS預估：65.08元；資料日期2026-10-02；[來源](https://gfe-desktop.cnyes.com/news/id/6620076?exp=a)

- 第二季合併營收428.90億元、毛利率24.8%、EPS8.45元
- 範圍：合併；ABF約占第二季營收52%，不能把所有公司獲利歸為ABF
- 主要限制：第二季業外收入淨額89.25億元，大於營業利益66.51億元；EPS8.45元不能直接年化成經常性ABF獲利
- [官方實績來源，發布2026-07-29](https://mopsov.twse.com.tw/nas/STR/303720260729M001.pdf)
- 推薦研究仍在進行：三家公司第二季官方實績已逐一核對；2027訂單綁定、ABF專屬利潤、股本口徑與合理估值情境仍未完整

#### 南電（8046）

市場預估2027年EPS 45.79元，較2026年17.85元成長156.5%；需由高階載板出貨、產品組合與經常性利潤驗證，非公司保證。EPS為不同日期的法人共識中位數，未來股本口徑尚待獨立驗證；不能按成長百分比直接排名推薦。

- 2026年EPS預估：17.85元；資料日期2026-10-02；[來源](https://news.cnyes.com/news/id/6620078)
- 2027年EPS預估：45.79元；資料日期2026-10-02；[來源](https://news.cnyes.com/news/id/6620078)
- 2028年EPS預估：87.41元；資料日期2026-10-02；[來源](https://news.cnyes.com/news/id/6620078)

- 第二季合併營收135.75億元、毛利率24.75%、EPS3.5元
- 範圍：合併；財報分部依地理區域，未單獨揭露ABF毛利或獲利
- 主要限制：上半年應收款與存貨現金流占用分別16.66、16.44億元；需求成長仍須核對收款與庫存去化
- [官方實績來源，發布2026-08-06](https://www.nanyapcb.com.tw/nypcb/images/InvestorRelations/FinancialReport/115Q2.pdf)
- 推薦研究仍在進行：三家公司第二季官方實績已逐一核對；2027訂單綁定、ABF專屬利潤、股本口徑與合理估值情境仍未完整

#### 景碩（3189）

市場預估2027年EPS 25.94元，較2026年11.42元成長127.1%；需由高階載板出貨、產品組合與經常性利潤驗證，非公司保證。EPS為不同日期的法人共識中位數，未來股本口徑尚待獨立驗證；不能按成長百分比直接排名推薦。

- 2026年EPS預估：11.42元；資料日期2026-09-30；[來源](https://news.cnyes.com/news/id/6618534)
- 2027年EPS預估：25.94元；資料日期2026-09-30；[來源](https://news.cnyes.com/news/id/6618534)
- 2028年EPS預估：55.51元；資料日期2026-09-30；[來源](https://news.cnyes.com/news/id/6618534)

- 第二季合併營收124.96億元、毛利率26.09%、EPS2.57元
- 範圍：合併含載板與光學；第二季載板外部收入103.82億元，占合併83.08%，載板仍未拆ABF與BT
- 主要限制：合併含光學業務；2026Q2加權平均股數5.09865億股，高於2025Q2的4.54876億股，跨年EPS須核對稀釋
- [官方實績來源，發布2026-07-31](https://www.kinsus.com.tw/upload/media/ir/financial-information/financial-report/115/115Q2.pdf)
- 推薦研究仍在進行：三家公司第二季官方實績已逐一核對；2027訂單綁定、ABF專屬利潤、股本口徑與合理估值情境仍未完整

### 必須保留的會計與歸因差異

- 欣興第二季營業利益66.51億元，業外收入淨額89.25億元；EPS8.45元不能直接年化為ABF經常性獲利。業外組成與可持續性是下一步查核事項。
- 南電第二季營業利益28.99億元；上半年營業現金流29.97億元，應收款與存貨分別占用16.66、16.44億元。營收增加不代表現金同幅到位；地理分部也不是ABF產品分部。
- 景碩第二季載板外部收入103.82億元，占合併營收83.08%；其餘主要為光學，載板內仍未拆ABF／BT。第二季加權平均股數5.09865億股，去年同期4.54876億股；比較未來EPS須核對增資稀釋。
- 景碩財報文字抽取的部分損益表列名有位移，本次不採用該列營業利益值；營收、毛利、EPS則由合併表、每股盈餘附註和部門收入交叉核對。未可靠讀取的欄位保留null。

### 後續驗證與結案

三家公司第二季比較已完成。第三季及2027預期另立持續追蹤：高階ABF量產與訂單、毛利與經常性獲利、增資口徑及估值區間。沒有來源支撐的本益比與合理價保持未完成，不從第三方目標價反推倍數。

### 本次實際變更

- 補入三家公司官方同季比較及前瞻EPS連結
- 新增業外利益、光學合併範圍與股本差異等反證
- 將遠期訂單確認度改為部分確認
- 結清同季公司比較待辦，新增第三季實績驗證追蹤；保留其他未解缺口


## 2026-10-04：市場預期、估值參考與驗證差距

以repo的2026-10-02收盤價除以各自已收錄的2027 EPS共識中位數，欣興1305÷39.24＝33.26倍、南電1460÷45.79＝31.88倍、景碩1050÷25.94＝40.48倍。這是現價對預估的參考倍數，不是合理價，也不能直接判斷便宜；EPS發布日期不同且股本／經常性口徑仍需核對。

新光證券9/30產業研究區分三家獲利來源，並引述2027供需缺口34%的機構模型；供需假設涉及良率、產品規格及投產節奏，不能視為已發生的缺貨率，也不能把不同機構的27%與34%當同口徑上修。
[產業研究來源](https://www.skis.com.tw/Report/industry/20260930.html)

景碩9/23公告轉載載明8月合併自結營收48.10億元、歸母淨利8.17億元、EPS1.59元；這是注意交易要求的單月披露，不是固定月報獲利或全年指引。公開資訊觀測站原件連結仍待補。
[公告轉載](https://www.moneydj.com/KMDJ/news/newsviewer.aspx?a=bf539775-010a-4595-951d-a6d0abed3b2e)

10/3新聞引述未具名本土投顧以2027 EPS27.06元與48倍本益比推導約1300元目標價。這與FactSet中位數25.94元是不同來源，不合併成同一預估；48倍依據、期限和原始報告仍未取得，故保留第三方觀點，不採為本系統合理價。報導亦指出8月有一次性廢料收益，尚未拆出可持續利潤。
[第三方估值報導](https://www.mirrormedia.mg/external/setn_1915483)

目前仍不能只憑較低前瞻本益比就判定南電較便宜，或只憑景碩單月EPS就年化推薦。下一步須補季度實績、合約價格、經常性獲利與股本口徑，並取得可辯護的估值情境。
