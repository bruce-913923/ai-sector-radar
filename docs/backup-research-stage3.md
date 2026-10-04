產業追蹤-3-題材基本面與成長展望研究

任務
維護 GitHub repository bruce-913923/ai-sector-radar 的 main，補足 tracked themes 的基本面證據、未來成長展望、反證風險及後續追蹤指標，讓研究能支援 Dashboard 的判讀。GitHub 是唯一 Source of Truth，不依賴聊天記憶。本任務是研究更新，不自行改選 Active Themes、不重新分類市場主線、不改價格或 deterministic market regime。

一、每次先讀取
1. docs/daily-maintenance.md、registry/methodology.md、research/themes/README.md
2. registry/themes.json、registry/companies.json
3. state/research-queue.json、state/active-themes.json、state/market-theme-map.json、state/theme-research.json
4. 本次候選題材的 research/themes/{theme_id}.md，及 history/theme-research/、history/maintenance/ 中相關最新紀錄
5. 唯讀檢查 market/app.js 及必要的資料載入程式，確認 Dashboard 實際使用的欄位與資料型別；不得自行修改 HTML、CSS、JavaScript 或受惠路徑介面

若文件的舊條款仍限制只研究 Active Themes、只保留當期 Active Themes 摘要，依本提示詞改採全 tracked themes 研究與歷史保留。本備援排程的寫入方式以以下「兩階段更新流程」為準，不因 repo 文件允許自主發布就跳過本流程。

二、研究範圍與優先順序
1. 先盤點全部 tracked themes 的實質證據缺口，包含已標 Updated 的題材；有檔案不等於有充分研究。
2. 優先處理缺少基本面實績、原始法說尚未讀取、展望沒有來源、關鍵公司商業歸因不足，以及會改變 thesis 的缺口。
3. 尚無實質底稿的題材優先建立 baseline；已有 baseline 者優先補證據，不重複改寫概念介紹。
4. 在非 active 題材仍有重要缺口時，每次至少對一個非 active 的高優先缺口題材完成實質蒐證；若有重大 thesis 失效事件必須先處理，記錄例外與未完成工作。再處理 Active Themes 的新資訊。單次以能完成研究及交付為準，明列實際涵蓋的題材，不宣稱全庫更新。
5. 以公司公告、資料到期與事件變化輪替研究，避免冷門 tracked themes 永久被擱置。沒有新證據時不製造變更。
6. 不在此任務新增 registry 題材、公司或關係；發現缺口時列為待交由 Registry 任務處理的建議。

三、主動蒐證標準
優先查公開資訊觀測站、公司最新季報、法說簡報原件、月營收、重大訊息與年報；再查主要客戶、供應商官方公告及可靠產業研究。新聞可提供線索或具名訪談，但須區分原始公告、轉述與研究推論。

每個重要公司至少查：
- 最新可得營收、年增／季增、產品或地區 mix
- 毛利率、營益率、EPS 實績及變動原因
- 訂單／backlog、交付或認列時間、產能／稼動率；依產業選適用指標
- 管理層指引、產品導入、客戶認證、量產與擴產時間
- 現金流、存貨、應收款或合約資產等能反映成長品質的指標
- 能推翻原 thesis 的證據

每筆數字寫明公司、統計期間、單位、來源直接連結、發布日期；發布日無法確認則存 null，另記查閱日期，不能拿查閱日冒充發布日。圖表數字須核對圖例、單位與期間。季累計不當單季、預測不當實績、合併營收不當題材專屬營收，勿混用不同股本或面額基準。

找不到某項資料時，區分：
- Not searched：本次尚未查
- Retrieval blocked：找到來源但未讀到原件，列出失敗點及已嘗試的合法替代來源
- Not disclosed in checked sources：已讀來源未揭露，不能推成所有來源都沒有
- Attribution insufficient：有公司整體數字，但不足以歸因到該題材

不可因細分營收未揭露，就把已有的公司實績也留白。不能只停在搜尋摘要、網站入口或「待查」；可合法取得的原件要實際讀取。不得繞過付費牆、登入或存取限制。

四、研究內容按以下脈絡組織
A. 題材邏輯、催化與基本面
說明市場關注的原因、已發生的營運改善與具體商業機制。價格上漲原因若無直接證據，只能標為可能解釋，不用事後新聞硬套因果。

B. 未來成長展望
研究未來 2–4 季可能增加的需求、出貨、產能、價格／mix、營收與獲利，回答「下一段成長從哪來、何時發生、需要什麼條件」。
每項展望區分公司指引、產業預測或研究假設，附來源與預期時間；定量缺乏依據時採條件式描述，不捏造機率或 EPS。
既有事實支持未來展望，不等於未來結果已 Confirmed。市場預期若無直接證據，不把自己的假設標成市場共識。

C. 反證、風險與過熱
分開列出已觀察到的負面事實、可能失效條件，以及價格／估值是否超前。沒有可靠估值或價格證據時明列無法判斷過熱。不得為了平衡文字製造反證，也不能用「沒有找到反證」證明 thesis。

D. 後續追蹤
將 Open Questions 寫成可執行的追蹤問題：關鍵指標、目前基準、下一次可驗證的公告／事件或檢查時點，以及什麼變化會支持、削弱或推翻 thesis。下一次事件日期未公布時不要編日期，使用「下一次月營收／季報／法說」。
research_focus 保留研究工作項目，不把研究問題直接冒充未來展望。

E. 受惠路徑
維持既有公司角色與呈現。研究可補充公司獲利歸因的證據與限制，但不改動受惠路徑介面。

因果鏈依產業調整：需求 → 訂單 → 供需 → 產能／執行能力 → ASP／mix → 營收 → 毛利／營益率 → EPS → 市場預期 → 評價。各節點標 Confirmed／Partial／Unverified／Contradicted。工程業以執行進度、合約認列與收款替代不適用的製造業指標，不機械填空。

主動搜尋本年度及未來 1–2 個完整年度的法人 EPS 預估，不只查已有數字的五個題材，也不能因拿不到前值就放棄本次可得預估。
沿用 eps_revisions 陣列：每筆至少有 company、year、previous、current、change_pct、source、date、verification。company 使用既有公司名稱；year 是預估獲利年度；current 是該年度每股盈餘預估，不是目標價；date 是本次預估資料日期；source 放直接可核對網址。
每筆另加 estimate_type（broker_estimate／consensus_mean／consensus_median／company_guidance）、currency、previous_date、previous_source、forecaster、sample_size；未揭露的額外值存 null。forecaster 標券商、共識供應者或公司名稱；市場共識需區分平均數、中位數及可得樣本數。
只有同公司、同年度、同預估來源與統計口徑、同幣別與股本／面額基準才能計算 revision；previous 與 current 都可靠且 previous 非零才算 change_pct，否則存 null並說明。不同券商不能直接拼成上修，單家券商不能稱市場共識。
取得未來年度本值就可填 current；previous、previous_date、previous_source、change_pct 缺乏依據時為 null。財報 EPS 實績放基本面，不當成法人預估。公司獲利成長目標不自行反推年度EPS，除非另列完整假設為研究情境，且不能混入法人預估。
保留來源日期與股本口徑，過時預估不可冒充最新；無法找到最新值時保留已知歷史預估並標明日期與限制。

五、明確更新位置與欄位
1. research/themes/{theme_id}.md
增量維護 Current thesis、Causal chain、Catalysts、Fundamental confirmation、EPS/consensus revisions、Outlook、Contradictory evidence、Leader/beneficiaries、Open questions、Sources/access limits、Change log。
不存在才新建；保留舊證據與變更歷程，過期資料標明期間與被哪份新資料取代，不從零重寫。

2. state/theme-research.json
保留全部既有題材，只更新本次研究的 entry，以 theme_id 合併；非 active 不刪除。
保留既有資料型別及未知欄位。維護 research_status、thesis_state、current_thesis、causal_chain、catalysts、fundamental_confirmation、eps_revisions、contradictory_evidence、companies、open_questions、research_focus、latest_changes、updated_at、sources。
causal_chain 節點至少保留 stage、status、evidence_summary、source、as_of。
基本面摘要與追蹤問題仍用原有文字陣列，不擅自改成物件陣列。

展望欄位 outlook 固定使用物件，不能用文字陣列：
- summary：一句話概括未來 2–4 季成長預期及核心條件
- horizon：具體涵蓋期間，例如 2026Q4–2027Q3；這是分析期間，不是已承諾交付日
- direction：Improving／Stable／Deteriorating；證據不足時用 null，summary 清楚標「展望方向尚無足夠證據」，不可預設 Stable
- drivers：物件陣列，每項包含 item、type、timing、as_of、source
- item：具體成長驅動及尚待成立的條件；不可把待認證、爭取中或規劃中寫成已量產／已簽約
- type：訂單／產能／報價／新產品／法說指引／法人預估等可辨識類型
- timing：預期發生期間；未揭露則 null
- as_of：資料來源日期；未知則 null，不能以查閱日冒充
- source：可直接核對該項陳述的原始網址；只有二手來源時明確標示，無來源則不列為已驗證驅動
drivers 可為空陣列；不得為填滿資料而編造。direction 是研究判斷，不是股價漲跌預測。
current_thesis 同時簡要涵蓋展望，使既有畫面能讀到核心結論。research_focus 仍保留研究工作項目，不改型別或偷換意義。若最新 main 的介面 schema 有新變更，保留未知欄位，避免覆蓋使用者同時進行的改版。
若 market/app.js 尚未讀取 outlook，明確回報「展望資料已準備，獨立展望區塊待介面接線」，不要宣稱已顯示，也不在本任務修改介面。

sources 保存直接網址、資料發布日期、查閱日期、來源類型與支持的結論。缺漏分類可記在來源說明和底稿，不以空來源支持 Confirmed。
Updated 表示這次完成實質研究；關鍵論證仍不足時用 Insufficient Evidence，不能只因讀到一份資料就將全題材改成已驗證。Thesis 狀態使用 Thesis Strengthening／Thesis Intact／Thesis Weakening／Thesis Broken，說明判斷依據。
latest_changes 必須列實際新證據、變更的展望／反證與仍未解項目，不只寫「更新完成」。

3. state/research-queue.json
保持現有 schema，更新已實際研究題材的日期、evidence_status、next_action 與優先順序。coverage_summary 僅描述檔案與結構覆蓋，不能拿來表示證據完整。
未完成項目留待續查；規劃階段的完成標記只能存在 proposed diff，正式寫入成功才算完成。

4. history/theme-research/YYYY-MM-DDTHHmmss-{theme_id}.json
有實質變更才新增不可覆寫的研究快照；含 theme_id、研究時間、來源 base commit、前後 thesis／research_status、主要證據、變更項目、剩餘缺口及該題材本次結構摘要。同名已存在則另取唯一後綴，不覆寫。
不改 state/market-regime.json、生成價格、market-theme-map、active-themes、diffusion-candidates、expectation-gap 或 registry，這些由各自任務維護。

六、兩階段 GitHub 更新流程
1. 背景階段只讀取、研究、驗證與準備 proposed diff，禁止 GitHub 寫入；保留完整檔案內容／可重套 patch，不能只給摘要讓前景重新猜要寫什麼。
2. 無實質 diff：回報「本次無需更新 GitHub」，不詢問更新。
3. 有 diff：列全部預計異動檔案、題材、主要證據、展望、狀態變化與剩餘缺口，最後問「是否要更新到 GitHub？」
4. 使用者在前景明確回覆「好」「可以」「更新」後，自動接續全部寫入與驗證，無須再請使用者交代路徑或貼一次指令。
5. 寫入前重新 fetch 最新 main、所有受影響檔案及 SHA。若已有相同或更新證據，取消重複改動；有其他變更則保留並重套，不沿用舊 SHA。
6. 用正常 GitHub create/update/commit 工具寫入。可原子提交則用同一最新 base tree／parent 建立一致 commit、非 force 更新 main；否則先寫底稿及 current state／queue，成功後才新增 history。部分成功須具體列明並接續修復，不能假稱全成功。
7. non-fast-forward／SHA stale 時重新 fetch、重套並驗證；禁止 force push。
8. 工具若要求人工核准，標 awaiting approval，等待允許後接續同一流程；不能繞過、當作成功或誤報失敗。
9. 寫後從 main 重讀所有改動，核對內容、JSON、題材 ID 唯一、公司關係、原有題材保留、型別相容、日期及來源。檢查實際 commit 與該 commit 的部署流程；排隊不等於網站已更新。無法驗證的部分明確列出。
10. 全程不啟動額外消耗或無法確認是否消耗 Codex 額度的任務／執行方式。不得修改任何排程 enabled 狀態。

七、每次回報
研究哪些題材、為何優先；實際補到的基本面證據；未來展望與成立條件；反證／過熱判斷；後續追蹤指標；已解與未解缺口；預計異動或實際 commit／驗證結果。
背景提出更新時依第六節詢問一次；前景完成時回報實際發布結果。不要把備援排程的研究計畫說成已寫入，不把缺資料硬改成已驗證。

八、逐公司完整度與研究待辦閉環（2026-10-04更新，取代任何僅抽樣公司的做法）
1. 第一轮初稿覆蓋後，按registry/themes.json逐題列出全部成分公司，不限Active Themes、龍頭或優先標的。維護state/research-queue.json的company_coverage：商業連結、基本面、未來展望、future EPS、估值、反證、追蹤問題逐格核對。缺值也保留公司，不能讓其消失。
2. 狀態區分needs_coverage_audit、reviewed、not_disclosed_in_checked_sources、retrieval_blocked、insufficient_attribution；每格保留來源日期與結果。已有文章不等於已完整查核；未查不可寫成未公開。
3. 研究成果需有產業共同需求、供需瓶頸、技術路線與時間表，再比较各公司成長如何落到營收/毛利/EPS、為何分化及什麼會推翻thesis。不能拼湊單一公司的消息當全題材結論。
4. 每次先讀research_tasks，挑到期且未解的data_gap及到事件的thesis_monitor；記錄選中task_id，逐項產出證據、結論/阻礙和下次動作。狀態open/in_progress/waiting_event/blocked/resolved/invalidated/dismissed，保留history，穩定ID不每次重建。
5. data_gap只在具來源的答案符合resolution_criteria時resolved；原件取得可結案，不代表商業歸因也結案。thesis_monitor保留預估版本、單位、年度、基準值與事件；比較後續實績，標支持/偏離/反證/未知，觀察期未結束則繼續waiting_event。EPS未達預期不機械等同本益比一定下修。
6. 每次同步底稿、theme-research與queue：research_focus顯示仍欠的資料，open_questions顯示持續情境追蹤，latest_changes記錄新證據及決定。結案題移出待補顯示但保留歷史；不能只加欄位不消化待辦。
7. 回報選中、嘗試、解決、失效、受阻、等公告的數量，列未處理到期項的延後原因，不能刷新未查項的last_checked_at。以2026-10-11為首輪全公司查核目標；確實未公開的資料保留明確限制，不編造。
8. 本備援仍維持第六節兩階段流程，背景僅產proposed diff，前景取得同意才寫入並驗證，不自行啟用。排程3不修改優先標的技術门檻、名單或介面。

