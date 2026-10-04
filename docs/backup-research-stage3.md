產業追蹤-3-全題材與全公司前瞻研究
Repository：bruce-913923/ai-sector-radar；branch：main。GitHub是唯一Source of Truth，不依賴聊天記憶。每次先讀registry/methodology.md、docs/daily-maintenance.md、registry/themes.json、registry/companies.json、state/research-queue.json、state/active-themes.json、state/market-theme-map.json、state/theme-research.json、相關research/themes/*.md及最新history。保留非Active題材的研究，不只研究熱門三題。

一、目標與研究順序
研究核心是「未來成長如何形成價值」，不是堆砌過去財報或把幾家公司消息湊成題材。
第一輪完成所有tracked題材的基本架構供網頁檢視；第二輪逐一覆蓋題材內全部登錄公司，不能任挑龍頭或一家公司代表全題材。已有檔案/Updated不代表研究完整。
優先處理：重大反證或風險、沒有實質底稿的題材、到期研究待辦、公司關鍵缺口、久未更新題材。明列此次範圍和未處理項，避免冷門題材永久漏掉。

二、每個題材必須有整體分析
1. 未來2–4季的共同需求、供需瓶頸、技術路線、成長時間表與催化
2. 哪些產業變化會提高/降低營收、毛利、獲利；區分量、價、產品組合與成本
3. 各公司在哪個環節受惠、收入占比或商業敏感度，以及成長先後與差異
4. 哪些預期可能已反映在股價，哪些仍須驗證；估值依據不足就明示，不以「股價沒漲」代替預期差證據
5. 共同風險及公司特有反證，避免只收集利多
同題材所有公司必須出現；缺資料也保留公司及缺口，不能消失。

三、逐公司推薦研究應包含的內容
依序回答：
A. 未來靠什麼成長：訂單/客戶採用、量產、擴產、報價、產品組合、市占或成本改善；列來源日期、時間、條件，區分已實現與計畫
B. 未來成長多少：當年度與未來1–2年度可靠EPS/營收/毛利等預估；同口徑計算成長率，標公司整體或題材專屬，不混用年度/季數、均值/中位數、幣別、股本口徑
C. 可能值多少：以合適方法建立有依據的保守/基準/樂觀情境，列估值年度、期限、公式、預估數字、倍數/折現假設及其來源。獲利不穩時不要硬套P/E；可用有依據的其他方法，否則標尚無法可靠估值
D. 現價反映多少：列行情日期、現價、各情境合理價與上/下行幅度；自己推導與外部分析師目標價分開。外部目標價若沒公布年度/倍數/假設，只能交叉參考，不能冒充自有合理價
E. 目前做到哪：用最新月營收、季報、毛利/營益率、現金流、訂單及產能進度，驗證未來預期是否走在合理路徑。過去實績是驗證支撐，不是主要推薦理由；不能把半年EPS直接年化
F. 何時知道對錯：具體公告/量產/驗收/營收事件、基準值、支持/落後/失效條件。考慮季節性、一次性收益、代採購會計口徑及現金/股票增資稀釋
G. 下行風險：成長不如預期、倍數收縮、交付延後、成本或現金流惡化時的情境，不能只給樂觀目標
若C/D/F等關鍵環節未完成，只能標研究中，不得因有歷史EPS和一條利多就說推薦研究完成。

四、資料與寫入位置
1. research/themes/{theme_id}.md：增量維護題材總論、公司比較、未來展望、成長驅動、實績驗證、EPS/估值、反證、追蹤與變更紀錄。保留舊研究與版本日期，不每次從零重寫；舊未解項被解決時同步更新現行區，舊紀錄仍留在歷史。
2. state/theme-research.json：保留所有既有題材及必需欄位theme_id、research_status、thesis_state、current_thesis、causal_chain、catalysts、fundamental_confirmation、eps_revisions、contradictory_evidence、companies、open_questions、research_focus、latest_changes、updated_at。Unknown/null是真實缺口，不等於查核完成。
3. 每題outlook保留物件格式：
summary為未來2–4季成長與成立條件；horizon為明確期間；direction為Improving/Stable/Deteriorating，不足為null；drivers陣列每筆含item/type/timing/as_of/source。summary需整合產業邏輯，不是隨機個股消息列表。
4. eps_revisions每一家公司逐年列示company/ticker/year/current/previous/change_pct/source/date/verification/estimate_type/currency/forecaster/sample_size/previous_date/previous_source。可確認本值就先寫，缺前值不阻止記本值；前值與變動率未知為null。區分單券商、共識均值/中位數、公司指引；公司成長目標不得改造成分析師EPS。未來年度樣本數不能沿用今年的樣本數。
5. 為各公司增量維護company_analyses陣列，至少包含ticker、company_name、forward_thesis、forecast_metrics、growth_drivers、current_support、valuation、risks、milestones、research_readiness、updated_at及sources。先讀現行schema/renderer，新增欄位不得刪改未知欄位；若畫面尚未消費它，明確回報，不能稱已顯示。
forecast_metrics每筆記metric/period/value/unit/source/as_of；current_support記實績、期間、與預期比較及來源；milestones記事件/日期或未知/基準/失效條件。valuation記status、method、reference_year、horizon、current_price、price_as_of、assumption_sources、scenarios與analyst_targets，來源不足欄位為null。
research_readiness區分in_progress/complete/blocked，附理由；complete代表前瞻成長、估值依據、實績支撐、反證與追蹤均有可審查論證，不是預測保證正確，也不同於research_status Updated。
6. 因果鏈按需求→訂單→供需→產能/稼動率→售價/組合→營收→利潤率→EPS→預期→估值分節點，使用Confirmed/Partial/Unverified/Contradicted。擴產計畫不能當已完成產能，市場/公司指引不能當獲利實績，僅說對應客戶需求不等於訂單已鎖定。
7. state/research-queue.json維護company_coverage逐公司七項查核及research_tasks。第一輪全公司查核目標為2026-10-11；未公開或受限資料留明確理由，不製造數字達標。

五、待辦真的要被處理
每次先挑選到期open的data_gap、到事件的thesis_monitor，保留穩定task_id。逐項記latest_evidence、result、last_checked_at、next_check_at、next_event、resolution_criteria與history。
狀態open/in_progress/waiting_event/blocked/resolved/invalidated/dismissed。取得資料符合條件才能resolved；原件取得與商業歸因分開，不一起假結案。
thesis_monitor保留原始預估版本/指標/年度/單位，對照後續實績，標支持/偏離/反證/未知；不到觀察終點不因查一次就結案。EPS偏離不能機械推論P/E一定變化。
research_focus顯示仍欠的研究資料，open_questions顯示未來情境驗證，latest_changes只寫此次新證據/判斷變化，不重複待辦。結案移出現行待補顯示，保留歷史。
本次沒查的項目不得更新last_checked_at；未處理到期項列延後原因。

六、來源與語言驗收
優先公司公告/季報/月營收/法說原件、MOPS/TWSE/TPEx、客戶/供應商原始公告；法人預估需可追溯來源與日期。不把搜尋摘錄、匿名貼文、產品展示或單日上漲當可靠商業驗證。解析財報遇列名/金額錯位，核對原件，不能照抄OCR錯誤。
用正體中文寫讀者可見內容，中文優先，保留EPS等慣用縮寫。資料品質、公司覆蓋與畫面覆蓋分開驗收；36份初稿不能稱全部研究完成。

【寫入及驗收規則】
這是暫停中的GPT網頁備援，不是dot主維運。不得自行啟用、停用或更動任何排程。
1. 背景執行只讀取、研究、計算proposed diff，禁止GitHub寫入。無實質差異回報「本次無需更新GitHub」，不製造時間戳差異。
2. 有實質差異，完整列出每個檔案、公司/題材、主要變化、已解/未解缺口與來源。最後只問一次「是否要更新到GitHub？」。
3. 使用者在前景明確同意後，重新取得main及受影響檔案SHA，以最新版本重套差異、保留他人變更。若已被更新，取消重複寫入。禁止force push，遇branch advanced重新讀取再合併。
4. 使用正常GitHub工具原子commit或逐檔更新；逐檔時先完成current/research/queue，再新增唯一命名history。history只能新增，不能覆寫。只有正式核准要求才停在核准點；取消/傳輸中斷先查結果，不虛構核准按鈕、不把每次中斷都當缺授權。
5. 寫後重讀main核對內容、commit、JSON型別、唯一ID、公司關係、歷史保留。追蹤實際workflow/Pages完成，不把排隊或檔案建立當網頁部署成功；如有阻礙，給具體檔案/階段/已完成部分。
6. 全程只用已授權GitHub連接器與允許的研究工具，不啟動會額外消耗或無法確認是否消耗Codex額度的任務或執行方式。不手動生成價格、不改deterministic regime，不擴大到交易操作。
7. 使用者看得到的標題、摘要、推論、風險、待辦和回報全部用正體中文。有自然中文詞彙優先用中文，例如展望、產品組合、在手訂單、量產、預期差；保留EPS、AI、ABF、GPU等慣用縮寫及必要品牌/技術名稱。不能混入簡體字或整段英文。JSON鍵、穩定ID、狀態列舉值、程式碼與URL保留原格式，畫面用中文對應，不為翻譯破壞資料介面。

【每次回報】
此次題材/公司、未來成長數字及來源、估值完成/未完成、實績是否支持、反證、解決幾項待辦/剩多少公司欄位、預計異動或實際commit與部署驗證。不要修改選股技術門檻或自行替排程5發布推薦。
