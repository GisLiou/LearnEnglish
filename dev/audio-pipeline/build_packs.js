// 把處理好的 mp3 打包成每單元一個 JS（base64 data URI），App 需要時才載入。
// 用法：
//   自然語速版：node build_packs.js proc/ ../../audio/packs HH_AUDIO 自然語速版
//   教學慢速版：node build_packs.js proc-slow/ ../../audio/packs-slow HH_AUDIO_SLOW 教學慢速版
// 鍵值：單字與句中每個字＝slug(text)；對話句＝slug(text)@聲音名（浣浣 Autonoe，B/C 角色用 courses.js 的 npc.v / npc2.v）
const fs = require('fs'), path = require('path');
const [src, out, G, label] = process.argv.slice(2);
if (!label) { console.log('用法：node build_packs.js <mp3資料夾> <輸出資料夾> <HH_AUDIO|HH_AUDIO_SLOW> <說明>'); process.exit(1); }
global.window = {}; require(path.resolve(__dirname, '../../courses.js'));
const slug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const b64 = f => 'data:audio/mpeg;base64,' + fs.readFileSync(f).toString('base64');
fs.mkdirSync(out, { recursive: true });
const miss = []; let tot = 0;
for (const u of window.COURSE) {
  const map = {};
  const add = (key) => { if (!key || map[key]) return; const f = path.join(src, key + '.mp3'); if (fs.existsSync(f)) map[key] = b64(f); else miss.push(key); };
  for (const t of [...u.words.map(w => w[0]), ...u.lines.flatMap(l => l[1].split(' ')), ...u.words.flatMap(w => w[0].split(' '))]) add(slug(t));
  for (const l of u.lines) add(slug(l[1]) + '@' + (l[0] === 'A' ? 'Autonoe' : l[0] === 'C' ? u.npc2.v : u.npc.v));
  const id = String(u.id).padStart(2, '0');
  const body = `/* 第 ${u.id} 單元英文發音（Google Gemini-TTS ${label}；單字＝浣浣，對話依角色固定聲音） */\nwindow.${G}=window.${G}||{};Object.assign(window.${G},${JSON.stringify(map)});\n`;
  fs.writeFileSync(path.join(out, `unit-${id}.js`), body); tot += body.length;
}
console.log('缺少', miss.length, miss.slice(0, 10), '總大小 MB', (tot / 1e6).toFixed(1));
