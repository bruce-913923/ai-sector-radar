產業追蹤-5-預期差與前瞻推薦研究
Repository：bruce-913923/ai-sector-radar；branch：main。先讀registry/methodology.md、docs/priority-screen-v1.md、config/priority-screen-v1.json、registry/themes.json、registry/companies.json、state/active-themes.json、state/theme-research.json（含company_analyses）、state/research-queue.json、state/diffusion-candidates.json、state/expectation-gap.json、state/priority-candidates.json、state/priority-assessments.json、相關底稿和最新history。GitHub是唯一事實來源。

一、分開兩個範圍
Expectation Gap仍只評Active Themes的Leader/Primary Beneficiary及diffusion A/B，不擴成全市場低估值掃描。
優先標的則看所有tracked題材全部公司，ticker去重，不限Active或龍頭。不要用「Positive Gap＝優先推薦」；股價落後不是低估證據。

二、先分清楚研究完成與投資條件
技術初選只代表股價符合規則，不代表研究已完整，更不是買進保證。
讀者主要狀態：
- 優先追蹤：推薦研究完整，技術時機符合，沒有阻斷風險
- 等待訊號：推薦研究完整，但技術條件尚未符合
- 研究中：前瞻成長、估值、實績支撐、反證或關鍵資料仍有缺口
- 暫緩/失效：具體反證或風險使原本邏輯不成立
不可把初步敘述、EPS本值或「有產能計畫」直接判成推薦研究完成。篩選流程數量放詳細說明，不用「三關試算」等模糊標籤掩蓋資料完成度。

三、推薦理由的必備邏輯
未來需求與催化→未來營收/獲利情境→有依據的合理價區間→現價與預期差→目前實績是否支持→股價時機→下行情境與失效條件。
每家公司必須列：
1. 未來主要成長來源與時間：訂單、量產、報價/組合、產能利用率等具體商業機制
2. 預估數字：年度EPS/營收/利潤率及同口徑成長率、來源日期；集團數字不能全部歸題材
3. 價值推導：估值年度/期限、方法、EPS與倍數或其他模型假設、來源，以及保守/基準/樂觀情境
4. 現價與上/下行：行情日期、現價、情境價差。第三方目標價獨立列，未公開假設不可當作自有合理價。不能任意乘P/E湊目標價
5. 實績驗證：已公布收入/獲利/毛利/現金流或訂單進度如何支持/偏離未來預期；歷史實績是支撐，不是主要成長論證
6. 反證/稀釋/會計口徑：增資/GDR、一次性利益、代採購、重複合併、季節性、認列和收款風險
7. 後續驗證：具體指標、基準、下一次公告/事件、成立/落後/失效條件
可靠年度EPS不是唯一方法，但無充分估值依據就保留研究中，不能因公司沒共識而編造，也不能用定性利多豁免價值推導。

四、資料寫法
state/priority-assessments.json按ticker維護fundamental與risk，兩者含status/summary/sources/reviewed_at/valid_until。
fundamental.status保留verified_improvement/leading_evidence/unknown/fail；risk.status保留acceptable/caution/unknown/block，機器欄位不翻譯。讀者看到的summary必須正體中文、有數字/年度/日期/條件，不能只有「支持成長路徑」。
增加/維護research_readiness={status:in_progress|complete|blocked,reason:...}和recommendation_case。recommendation_case至少含forward_thesis、forecast_metrics、valuation、current_support、invalidation_conditions及來源；可從排程3已查核company_analyses投影，保留實際版本。
forecast_metrics含metric/period/value/unit/source/as_of；valuation含status/method/reference_year/horizon/current_price/price_as_of/assumption_sources/scenarios/analyst_targets。scenarios逐筆記case、假設、合理價及相對現價差幅；缺任何重要依據為null，valuation.status用unsupported或in_progress，不偽裝supported。
research_readiness未complete，或valuation尚無充分依據，即使基本面與技術看似符合也保留研究中。caution只能容納已辨識可評估的風險，不能掩飾估值尚未研究。
reviewed_at是實際查核日，來源日期另列；valid_until原則最長7天，重大事件提前重查。不得只展延日期或複製舊理由假裝查過。
當日所有技術初選公司的必要審查確實完成後，才把頂層as_of設為當日市場日。未完成項仍標研究中；不能因要生成名單而把unknown改成通過。

五、技術門檻及推薦紀錄
沿用使用者已選定的基準版，不自行放寬：近5交易日觸發收復MA20或整理後突破，至少2個交易日（含觸發日）維持確認、MA20三日斜率向上、近5日報酬優於加權指數、MA20乖離0–9%，不硬要求MA60之上；精確計算以config及script為準。
由Update Priority Candidates讀既有行情與研究assessment計算，不手動生成價格/改regime。寫assessment會觸發重新計算。
正式推薦須當日行情、同日研究、台北15:00之後；其他情況為研究預覽，不回填過去推薦。近5交易日依ticker去重、連續符合更新latest_qualified_date，保留首次日期、連續天數、今天是否符合及退出理由。舊版本於history/priority-candidates保留，不覆寫。
當日可以0。持續空白要拆解行情不合、研究未齊、風險阻擋、資料異常，不能為避免五日空白而硬湊公司。技術密度試跑不是獲利回測，不宣稱勝率。

六、原有Expectation Gap
分開蒐集Fundamental Momentum、Price Reaction、Valuation、Crowding/Expectation，數字均需來源和日期。分類Positive Gap/Balanced/Crowded/Negative Gap/Insufficient Data，對照前次公司範圍、分類與原因。
維護state/expectation-gap.json；有實質範圍/分類變化時新增history/expectation-gap唯一日期快照。不要擴大其原Active-only範圍。
高P/E不單獨否定成長，低位階也不單獨證明低估；EPS偏差不是P/E機械調整規則。

七、更新位置與責任
研究底稿/公司比較修正回寫research/themes/*.md與state/theme-research.json，待辦同步state/research-queue.json，不把資料留在聊天。
推薦研究寫state/priority-assessments.json；state/priority-candidates.json由Action產生，禁止人工冒充結果。機器生成成功後核對來源/時間/逐檔狀態與真實歷史，再查Pages部署。
若現行程式尚未落實research_readiness或新欄位顯示，明確標整合缺口，在完成前不得稱正式推薦研究通過；不繞過核定機制。

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
列推薦研究完成/研究中/等待訊號/暫緩公司，簡述未來成長與估值理由、日期和尚缺依據。另列技術初選/資料缺口/風險篩除數，與原Expectation Gap變化分開。回報實際commit、workflow/部署及待辦，不把初篩跑完等同投資研究完成。
