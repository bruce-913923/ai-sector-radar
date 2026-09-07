# AI Sector Radar

AI 產業輪動雷達，用「AI 世代升級 × 產業高價值節點 × 市場輪動軌跡」追蹤台股 AI 供應鏈。

## V1 Prototype

目前先使用 mock data 驗證資訊架構與操作：

- 產業輪動四象限：改善 / 領先 / 落後 / 弱化
- 5D / 10D / 20D 移動軌跡
- 播放歷史路徑
- 泡泡大小代表成交資金熱度
- 右上移動最快與弱化排行
- 點擊產業查看題材等級、下一代催化、族群廣度與代表股狀態
- 產業資料與前端分離，後續可由 GitHub Actions 每日更新 JSON

## Data model

- `config/sectors.json`: AI 細分產業定義與股票池
- `data/latest/rotation.json`: 當前 prototype 的輪動資料與歷史位置

後續規劃接入：

1. TWSE / TPEx OHLCV
2. TWSE / TPEx 三大法人
3. TDCC 每週大戶持股
4. GitHub Actions 每日計算 sector rotation metrics 並更新 JSON

## GitHub Pages

此 repo 內含 GitHub Pages deploy workflow。若 Pages 尚未啟用，請到 repository `Settings → Pages` 將 Source 設為 **GitHub Actions**。
