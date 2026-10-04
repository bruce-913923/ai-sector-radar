產業追蹤-5-預期差與優先標的
維護 bruce-913923/ai-sector-radar 的 main，GitHub 為唯一 Source of Truth。先讀 registry/methodology.md、docs/priority-screen-v1.md、config/priority-screen-v1.json、registry/themes.json、registry/companies.json、state/active-themes.json、state/theme-research.json、state/diffusion-candidates.json、state/expectation-gap.json、state/priority-candidates.json、state/priority-assessments.json，以及相關公司/題材底稿和最新 history。所有數值保留來源、日期、年度、單位、統計口徑；缺資料用 null/unknown，不編造。

一、原有預期差研究，維持窄範圍
只分析目前 Active Themes 的 Leader/Primary Beneficiary，以及 diffusion 的 A Fundamental Catch-up/B Early Fundamental Confirmation；不得擴大成全市場低估值掃描。
分開檢查 Fundamental Momentum、Price Reaction、Valuation、Crowding/Expectation。記錄可靠的20D/60D報酬與相對表現、未來EPS/營收/毛利及訂單、forward/historical/peer估值、可觀察的擁擠證據。無法驗證的欄位為null。
分類維持 Positive Gap/Balanced/Crowded/Negative Gap/Insufficient Data。股價落後不自動等於Positive Gap；須確認基本面改善與估值尚未反映的證據。高本益比不單獨當否決理由，EPS變化也不機械決定P/E變化。
增量更新state/expectation-gap.json。eligible universe或classification有實質變化時，在history/expectation-gap/新增唯一日期snapshot，不覆寫舊history。

二、優先標的，使用獨立範圍和資料
優先觀察範圍是registry所有tracked題材的全部成分公司，以ticker去重；不限Active、不限龍頭。不可將這個範圍反過來擴張第一部分Expectation Gap。
技術規則只依config/priority-screen-v1.json與GitHub Actions產生的state/priority-candidates.json。不要以Positive Gap、族群轉強機率或新聞情绪直接代替個股訊號。
核對market_as_of與現有價格資料一致；資料不足、個股歷史不夠、新掛牌或身分切換都不能假設通過。不要手動生成價格、改寫regime，也不要修改已核定技術門檻以湊數。

三、基本面及風險逐公司審查
優先審查當日技術通過的每家公司，再處理近5交易日曾推薦而目前可能失效的公司。先讀完整題材及公司證據，若缺重要原件，主動搜尋並記下結果，不能拿族群單一公司的證據代表其餘公司。
state/priority-assessments.json每筆至少有ticker、company_name、fundamental、risk。每個gate包含status、summary、sources、reviewed_at、valid_until。來源可用可追溯的公司原件URL或已核對的repo底稿；不得僅寫聊天記憶。
fundamental.status：
- verified_improvement：收入/獲利等已有實績改善，而且仍有具體可驗證的成長路徑
- leading_evidence：獲利尚未完全實現，但有實質訂單、客戶採用/量產進度、可信公司指引等領先證據
- unknown：關鍵商業歸因或證據不足
- fail：核心thesis被反證推翻
risk.status：
- acceptable：已查核關鍵風險，未發現阻斷條件
- caution：仍可列研究觀察，但明列估值、事件、現金流、流動性或市場等限制
- unknown：缺關鍵資料，不能假設安全
- block：已知風險破壞核心獲利路徑/資料有效性
沒有EPS共識不必自動fail，但沒有足夠獲利或其他估值情境也不能自動acceptable。分開真正商業反證、追高風險、資料缺口；個股風險不套用族群19%等歷史比例。
每個結論具可追溯來源與日期；reviewed_at是實際查核日，不是原始資料日，兩者不可混淆。valid_until原則不超過7天，已知重大事件可縮短。遇重大反證立即重新判斷，不能等到到期。
確實完成當日技術通過公司的審查後，才設定assessment頂層as_of為當日市場日期。未查完不得偽裝全日審核完成，也不能只展延期限。若有實際未解缺口，以unknown及原因保留。

四、計算、日期與紀錄
寫入state/priority-assessments.json會觸發Update Priority Candidates。該Action只使用已有行情與已核定規則，產生state/priority-candidates.json及history/priority-candidates/唯一snapshot，不更新市場價格。
正式推薦紀錄需行情為當日、研究as_of也是當日、Asia/Taipei15:00之後；其他時候為研究預覽，不能用今天查到的資料回填過去推薦。
近5交易日名單按ticker去重，同一公司再符合則更新latest_qualified_date，保留first_qualified_date、連續符合天數、今天是否仍符合和退出原因。原始每日評估/修改版本保留於append-only history；最新state不是不可修正的歷史檔。
沒有符合可以為0。持續空白時，分開檢查技術未過、基本面/風險未過、研究未補及資料異常，不能自行放寬門檻或硬塞公司。
技術篩選曾做候選數量測試，不等於完整投資績效回測或已證明獲利；不得捏造勝率。

五、備援兩階段寫入
1. 本備援背景執行只讀取、研究及準備proposed diff，禁止GitHub寫入。已暫停的備援不能自行啟用。
2. 無實質diff回報「本次無需更新GitHub」，不製造時間戳改動。
3. 有diff完整列檔案、公司、各gate與classification變化、source/as_of/expiry和history新增。最後只詢問一次「是否要更新到GitHub？」。
4. 使用者在前景明確同意後，重新fetch最新main與所有相關SHA，保留其他變更，重套diff；不能沿用舊SHA或覆蓋併發修改。
5. 正常GitHub工具寫入expectation-gap、priority-assessments、必要研究/queue及append-only history。state/priority-candidates.json由Action產生，不手動冒充Action結果。無關registry/價格/策略/介面不修改。
6. 遇實際工具核准要求依其流程等待；核准中不當成錯誤或成功。取消/傳輸失敗需查實際狀態和已授權範圍，不虛構允許按鈕，不把每個中斷都誤判為缺權限。
7. non-fast-forward/branch advanced時重新取得main，保留他人變更後重套，禁止force push。
8. 寫後重讀內容與commit，追蹤Update Priority Candidates實際完成，核對輸出market_as_of、mode、逐檔理由及歷史日期；再查Pages部署，排隊不等於成功。失敗則說明確切阻礙，不猜結果、不停用排程。
9. 全程不得啟動額外消耗或無法確認是否消耗Codex額度的任務或執行方式。只用授權GitHub連接器及允許的研究工具。

六、回報
分開回報Expectation Gap各類公司變化，以及優先觀察技術通過/三關通過/研究待補/風險阻斷的數量與原因。列近5交易日真實推薦與最新符合日、退出變化，清楚區分非交易日預覽。附實際commit、workflow/部署狀態和下一步缺口；不得把提案當成已寫入。
