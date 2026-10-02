# 語音處理流程（Gemini-TTS → App）

錄音由使用者用 `tools/tts-studio.html`（Google Cloud Text-to-Speech、Gemini-TTS）在自己電腦上產生。產生完會在輸出資料夾裡多一個 `tts-bundle.json`（重做名單則是 `tts-redo-bundle.json`），交給 Agent 處理。

需要的工具：ffmpeg、node、python3、numpy、librosa（只有 check.py 需要）。

| 步驟 | 指令 | 說明 |
|---|---|---|
| 1. 解開 | `python3 extract_bundle.py tts-bundle.json raw/` | 把 bundle 解成一個個 mp3 |
| 2. 檢查 | `python3 check.py raw/ ../../tools/tts-jobs.js` | 找出缺檔、唸了兩三次、拖太長的音檔，結果寫進 `redo.json` |
| 3. 重做 | 把 redo.json 的內容寫成 `tools/tts-redo.js`（`window.TTS_REDO = [...]`），請使用者重跑工具 | 工具會只做名單上的檔案，存到 `<輸出資料夾>\redo`，並產生 `tts-redo-bundle.json` |
| 4. 後處理 | `for f in raw/*.mp3; do bash proc.sh "$f" "proc/$(basename "$f")"; done` | 去頭尾靜音、音量統一（-16 LUFS）。**不做任何變速**（使用者確認變速會讓音質變差） |
| 5. 打包英文 | `node build_packs.js proc/ ../../audio/packs HH_AUDIO 自然語速版` | 慢速版改用 `../../audio/packs-slow HH_AUDIO_SLOW 教學慢速版` |
| 6. 中文 | `node build_zh.js proc/` | 把 `zh-<代號>.mp3` 放進 `audio/zh/`，並更新 `audio/zh/index.js` |
| 7. 發佈 | 改 `sw.js` 的 CACHE 版本號，使用者自己 git push | |

檔名規則（和 `tools/mkjobs.js` 一致）：

- 單字或句子裡的單一個字：`slug(text).mp3`，一律用浣浣的聲音 Autonoe
- 對話句：`slug(text)@聲音名.mp3`
- 浣浣的中文台詞：`zh-<代號>.mp3`，語言代碼 cmn-TW
- `slug(t) = t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')`

過去發現的問題：

- Gemini 偶爾會重複唸，第一版約 7%。check.py 能抓到大部分，但短單字可能誤判，需要看分段資訊確認。
- 只重複兩次的短句，可以只保留第一段，例如 `ffmpeg -i in.mp3 -t 1.7 -c copy out.mp3`。
