# 浣浣學英文：專案交接說明（給下一個 Agent）

> 先讀這份文件，再動手。專案擁有者叫 Gis，用繁體中文溝通。
> 回覆格式要依照使用者偏好：【結論】／【依據】／【不確定之處】，內容精簡、可以驗證，沒把握的事情要直接說「無法確認」。

## 1. 專案目的

- 這是一個完全免費、給個人使用的英文學習網頁 App，對象是長輩和初學者。風格參考 Duolingo，畫面現代、簡約。
- 主要裝置是 Android Chrome，也要能在電腦上用，可以安裝成 PWA。
- 吉祥物是小浣熊「浣浣」。
- 共 60 個單元：1–30 是基礎，31–60 是進階。
- 使用流程：取暱稱 → 程度測驗 → 每日課程。另外有「自選課程」可以複習，「單字學習」可以聽所有單字。

## 2. 部署與工作方式

- **原始碼位置**：使用者電腦上的 `D:\LearnEnglish`，對應 GitHub repo `GisLiou/LearnEnglish`，用 GitHub Pages 發佈。
- **git 由使用者自己操作**：在 PowerShell 執行 git add、commit、push。Agent 只負責寫好檔案，再把要執行的 git 指令交給使用者。
- **不要碰的東西**：
  - 不要在聊天裡要求或貼出 API 金鑰、存取權杖。
  - 不要自動操作 Google 的示範網頁，也不要繞過機器人驗證。
- **.gitignore 排除的資料夾**：`Claude outputs/`、`app/`、`tools/`、`site/`、`tts-out/`、`tts-out2/`。所以 `tools/` 不會上傳 GitHub，但它是重要的工作檔。
- **雲端工作區**：Agent 若在雲端工作，會在 `/home/claude/site` 放一份副本，改完再寫回 D:\LearnEnglish。寫回後要把檔案重新讀回來比對內容，確認一致。
- **發佈前**：任何會改變行為的修改都要提高 `sw.js` 的 `CACHE` 版本號（目前是 `hh-english-v31`）。

## 3. 檔案結構

| 檔案 | 用途 |
|---|---|
| `index.html` | 依序載入 `audio/zh/index.js` → `courses.js` → `app.js` |
| `app.js` | 整個 App，是一個不用框架的單頁應用（SPA），全部包在一個立即執行函式（IIFE）裡 |
| `courses.js` | `window.COURSE`：60 個單元的資料；`window.ZH_MARK`：手動指定中文翻譯裡要畫底線的關鍵詞 |
| `style.css` | 樣式，有深色和淺色主題 |
| `sw.js` | Service Worker，網路優先（network-first）。改版時提高 CACHE 版本號 |
| `manifest.webmanifest`、`icon-*.png` | PWA 名稱「浣浣學英文」和圖示（滿版底色，可當 maskable 圖示） |
| `audio/packs/unit-XX.js` | **自然語速**英文錄音：`window.HH_AUDIO`，內容是 base64 data URI。目前只是空殼，見第 6 節 |
| `audio/packs-slow/unit-XX.js` | **教學慢速**英文錄音：`window.HH_AUDIO_SLOW`，已完成，共 1,261 個 |
| `audio/zh/` | 浣浣的中文台詞錄音 `<代號>.mp3`；`index.js` 的 `window.HH_ZH` 列出已錄好的代號；README.md 是台詞清單 |
| `bgm.mp3`、`mascot*.png` | 背景音樂、浣浣圖片 |
| `dev/audio-pipeline/` | 語音處理腳本：解開、檢查、後處理、打包。看那裡的 README |
| `tools/`（不上傳 GitHub） | `tts-studio.html` 批次產生 Google 語音的網頁工具；`mkjobs.js` 產生 `tts-jobs.js` 工作清單；`tts-redo.js` 是重做名單 |

## 4. 課程資料格式（courses.js）

```js
{ id, topic, title /*中文*/, en /*英文情境名*/, scene /*emoji*/, place,
  npc:  { name, face, g: 'm'|'f', v: 'Gemini 聲音名' },   // 對話中的 B
  npc2: { name, face, g, v },                            // 對話中的 C
  words: [[英文, 中文, emoji], ...],                     // 8 個重點單字，都會出現在對話裡
  lines: [['A'|'B'|'C', 英文, 中文], ...] }              // A＝浣浣
```

聲音分配：

- 浣浣固定用 Autonoe，所有單字也都用 Autonoe 唸。
- 女生：Erinome、Callirrhoe、Laomedeia；男生：Sadachbia、Sadaltager、Zubenelgenubi。
- 同一個角色永遠用同一個聲音（`voiceOf(who,u)`）。

## 5. app.js 重點邏輯

- **資料存放**：
  - 學習資料存在 localStorage 的 `hh-english-v1`，包括 nickname、streak、xp、done、best、flags、learned、settings。
  - 目前畫面存在 sessionStorage 的 `hh-screen`，重新整理後可以回到原來的畫面（`remember`、`recall`、`resume`）。
- **畫面骨架**：用 `page({top, body, bottom})`、`talk()`、`navTop()` 組成。各畫面是 `screenXxx()` 函式。
- **主要畫面**：
  - 歡迎、取暱稱：`screenWelcome`、`screenConfirm`、`screenSaved`
  - 程度測驗：`screenPlacementIntro`、`startPlacement`
  - 首頁、課程地圖：`screenHome`、`screenMap`
  - 上課流程：對話 `screenStory` → 單字卡 `screenCards` → 測驗 `startQuiz`、`runQuiz` → 結算 `finishLesson`
  - 單字學習頁 `screenSounds`：有「已學習」勾選框；先在頁面最上方打開回報模式，勾選框才會變成回報按鈕
  - 設定 `screenSettings`
- **題型**：
  - `qPickEn`：看圖和中文選英文
  - `qPickZh`：聽英文選中文
  - `qListenWord`：聽發音選英文
  - `qCloze`：對話填空，干擾選項會排除句子裡看得到的字
  - `qSentenceMeaning`：聽句子選意思
  - `qArrange`：排列句子，可以拖曳；`#playAns` 按鈕放在答案列最後，可以依序播放已排好的字
  - `qMatch`：配對
  - 題目是中文的題型，也要先播放英文，並提供播放按鈕。
- **說話**：`speak(text, lang, {voice, tight, onEnd})`
  - 英文：先找 `slug@voice`，再找 `slug`，從目前語速對應的錄音包找，找不到再用另一包補。都沒有就試 `audio/voice/*.mp3`，最後才用瀏覽器內建語音。
  - `tight` 用於逐字播放：開頭跳過 0.04 秒、結尾提早 0.06 秒，讓字與字之間更緊湊。
  - 中文：`sayZh(ids, fallback)`。已錄好的就播 `audio/zh/<id>.mp3`，否則用瀏覽器語音。中文永遠用正常速度，不受英文語速設定影響。
- **語速**（重要，2026-10 的狀態）：
  - 只有兩段：`很慢`（0.85）播教學慢速錄音，`正常`（1）播自然語速錄音。兩種都用原始錄音，播放速度固定為 1 倍，不做任何變速。
  - `NATURAL_READY = false`：切換功能先鎖住。設定頁的按鈕是 disabled，上課畫面右上角的語速按鈕按下只會顯示提示，實際一律播放「很慢」。
  - 預設是很慢。`settings.rateVer = 2` 時，會把所有人的語速先重設為很慢。
  - 錄音包需要時才載入（`loadPack(uid)`）。先載入目前語速對應的那一包；如果那一包裡找不到該單元第一個單字，就再載入另一包。
- **返回鍵與離開**：
  - 支援 CloseWatcher 的瀏覽器用 CloseWatcher，不用 pushState，這樣 `window.close()` 才能真的關閉。其他瀏覽器用 pushState。
  - 確認離開後直接關閉頁面（`leaveApp`）。
  - 「離開」「取消」「返回」這類按鈕一律用紅色。
- **其他**：
  - 全部頁面都禁止下拉重新整理，但頁面內容仍然可以捲動。
  - 停用長按複製（擋 contextmenu、selectstart）。
  - 關鍵詞底線：`highlight()` 處理英文，`highlightZh()` 處理中文，中文字和英文同樣大小。

## 6. 待辦事項（交接時的狀態）

1. **自然語速英文錄音（第二版），加上浣浣中文 13 句**。使用者還沒錄。
   - 怎麼錄：用 `tools/tts-studio.html` 輸出到 `D:\LearnEnglish\tts-out2`。共 1,274 個：英文 1,261 個，加中文 13 個（檔名 `zh-*.mp3`，語言代碼 cmn-TW）。
   - 錄好後的處理：依照 `dev/audio-pipeline/README.md` 解開 → 檢查（必要時產生重做名單）→ 後處理 → `build_packs.js` 輸出到 `audio/packs`（HH_AUDIO）→ `build_zh.js`。
   - 然後把 app.js 的 `NATURAL_READY` 改成 `true`，提高 sw.js 版本號。
   - 開放後，使用者希望「很慢」和「正常」可以互相切換。是否要把預設改成「正常」，要先問使用者。
2. **改 tools/ 之前要先問使用者**：使用者曾明確要求「不要動到 tools」。
3. **可以考慮**：把 Google 存取權杖（每小時就會過期）改成綁定服務帳戶的 API 金鑰。只提供做法，不碰金鑰。

## 7. 曾經踩過的坑

- 不要用變高或變低音調來模擬兒童聲音，使用者覺得不自然。
- 變速（加快或放慢）會讓音質變差。語速不同的版本要「重新錄製」，不要用變速處理。
- Gemini-TTS 會隨機把句子唸兩到三次，提示詞裡已經加了「只唸一次」。產生錄音的工具也會檢查長度，太長就自動重試。
- 用 API 金鑰呼叫會得到 403。要用 Cloud Shell 的 `gcloud auth print-access-token`，加上 `x-goog-user-project` 標頭和專案 ID。
- 執行 `pkill` 時，比對的字串不要剛好也比對到自己正在執行的那條指令，否則會把自己的 shell 一起砍掉。
- Windows 那邊寫檔，可能會出現 LF 和 CRLF 換行符號的警告，不影響功能。
