// 浣浣中文錄音：把處理好的 zh-<代號>.mp3 複製成 audio/zh/<代號>.mp3，並更新 audio/zh/index.js 的清單
// 用法：node build_zh.js proc/
const fs = require('fs'), path = require('path');
const src = process.argv[2], dst = path.resolve(__dirname, '../../audio/zh');
const ids = fs.readdirSync(src).filter(f => /^zh-[a-z-]+\.mp3$/.test(f)).map(f => f.slice(3, -4)).sort();
for (const id of ids) fs.copyFileSync(path.join(src, `zh-${id}.mp3`), path.join(dst, `${id}.mp3`));
fs.writeFileSync(path.join(dst, 'index.js'), `/* 已經錄好的浣浣中文錄音代號（檔案放在同一個資料夾：代號.mp3） */\nwindow.HH_ZH = ${JSON.stringify(ids)};\n`);
console.log('中文錄音', ids.length, '句：', ids.join(', '));
