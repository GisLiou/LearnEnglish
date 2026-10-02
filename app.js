/* 浣浣學英文 · 第 2 階段：開場、暱稱、程度測驗、每日／自選課程、點選題、進度 */
(() => {
  'use strict';

  // ---------- 資料保存（存在這台裝置的瀏覽器裡） ----------
  const KEY = 'hh-english-v1';
  const DEFAULTS = {
    nickname: null, streak: 0, xp: 0, lastDay: null, days: [],
    placed: false, dailyNext: 1, done: {}, best: {}, flags: {}, learned: {}, flagsVer: 2,
    settings: { voice: true, sfx: true, rate: 0.85, theme: 'dark', music: true, vibrate: true }
  };
  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(KEY)) || {};
      return { ...DEFAULTS, ...d, done: { ...(d.done || {}) }, best: { ...(d.best || {}) }, flags: d.flagsVer === 2 ? { ...(d.flags || {}) } : {}, flagsVer: 2, learned: { ...(d.learned || {}) }, days: [...(d.days || [])], settings: { ...DEFAULTS.settings, ...(d.settings || {}) } };
    } catch (e) { return JSON.parse(JSON.stringify(DEFAULTS)); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* 無法保存時仍可使用 */ } }
  let data = load();
  // 語速只有兩種：0.85＝很慢（教學慢速錄音），1＝正常（自然語速錄音）；舊版的其他數值換成最接近的
  data.settings.rate = data.settings.rate >= 1 ? 1 : 0.85;
  if (data.settings.rateVer !== 2) { data.settings.rate = 0.85; data.settings.rateVer = 2; }   // 改成兩段語速時，所有人先預選「很慢」

  // ---------- 深淺模式（預設深色） ----------
  function applyTheme() {
    const t = data.settings.theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    const m = document.getElementById('theme-color');
    if (m) m.setAttribute('content', t === 'dark' ? '#12151C' : '#F5F7FB');
  }
  applyTheme();

  // ---------- 小工具 ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const app = $('#app');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const name = () => esc(data.nickname || '');
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const COURSE = window.COURSE || [];
  const unitById = id => COURSE.find(u => u.id === id);
  const TOPIC = { daily: '日常會話', travel: '旅遊英文' };
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  let typingTimer = null;

  const ICON = {
    speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c.5 3.2 2.3 4.9 3.9 6.6C17.4 10.2 19 12 19 15a7 7 0 1 1-14 0c0-2.3 1-4 2.3-5.3.3 1.6 1.1 2.7 2.2 3.3C9 9.3 10.3 5.3 12 2z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2 6 6M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4z"/><path d="M9 4v13M15 6.5v13"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2" fill="currentColor"/><circle cx="4.5" cy="12" r="1.2" fill="currentColor"/><circle cx="4.5" cy="18" r="1.2" fill="currentColor"/></svg>',
    turtle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15a8 5 0 0 1 16 0z"/><path d="M20 15h1.5a1.5 1.5 0 0 0 0-3H19"/><path d="M6 15v2M16 15v2"/></svg>'
  };

  // ---------- 聲音：中文用瀏覽器內建聲音；英文播預錄音檔（Kokoro 錄製） ----------
  let voices = [];
  const hasTTS = 'speechSynthesis' in window;
  function refreshVoices() { if (hasTTS) voices = speechSynthesis.getVoices(); }
  if (hasTTS) { refreshVoices(); speechSynthesis.onvoiceschanged = refreshVoices; }
  function pickVoice(lang) {
    const L = lang.toLowerCase();
    return voices.find(v => v.lang.toLowerCase().replace('_', '-') === L)
      || voices.find(v => v.lang.toLowerCase().startsWith(L.slice(0, 2)));
  }
  let lastLine = null, lineStarted = false, curAudio = null;
  function stopVoice() {
    stopSeq();
    if (curAudio) { try { curAudio.onended = null; curAudio.pause(); } catch (e) { } curAudio = null; }
    if (hasTTS) try { speechSynthesis.cancel(); } catch (e) { }
    music.duck(false);
  }
  function ttsSay(text, lang, rate, onEnd) {
    if (!hasTTS) { onEnd && onEnd(); return; }
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang; u.rate = rate || data.settings.rate; u.pitch = lang.startsWith('zh') ? 1.2 : 1;
      const v = pickVoice(lang); if (v) u.voice = v;
      u.onstart = () => { lineStarted = true; music.duck(true); };
      u.onend = () => { music.duck(false); onEnd && onEnd(); };
      speechSynthesis.speak(u);
    } catch (e) { onEnd && onEnd(); }
  }
  const slug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  // 說一句話：英文播預錄音檔（Google Gemini-TTS）；中文用瀏覽器內建聲音
  function speak(text, lang = 'zh-TW', opts = {}) {
    lastLine = { text, lang, opts }; lineStarted = false;
    if (!data.settings.voice) { opts.onEnd && setTimeout(opts.onEnd, 300); return; }
    stopVoice();
    const rate = playRate();
    if (!lang.startsWith('en')) { ttsSay(text, lang, rate, opts.onEnd); return; }
    const a = new Audio(audioSrc(text, opts.voice) || `audio/voice/${slug(text)}.mp3`);
    a.playbackRate = rate; a.preservesPitch = true;
    curAudio = a;
    if (opts.tight) {   // 逐字播放：跳過前後的空白，字和字之間更緊湊
      a.addEventListener('loadedmetadata', () => { try { a.currentTime = 0.04; } catch (e) { } }, { once: true });
      const watch = () => {
        if (curAudio !== a) return;
        if (a.duration && a.currentTime >= a.duration - 0.06) { a.pause(); a.onended && a.onended(); return; }
        requestAnimationFrame(watch);
      };
      a.addEventListener('playing', () => requestAnimationFrame(watch), { once: true });
    }
    let fellBack = false;
    const fallback = () => { if (fellBack || curAudio !== a) return; fellBack = true; curAudio = null; ttsSay(text, 'en-US', rate, opts.onEnd); };
    a.onplaying = () => { lineStarted = true; music.duck(true); };
    let ended = false;
    a.onended = () => { if (ended) return; ended = true; if (curAudio === a) curAudio = null; music.duck(false); opts.onEnd && opts.onEnd(); };
    a.onerror = fallback;
    a.play().catch(err => { if (err && err.name === 'NotAllowedError') return; fallback(); });
  }
  const say = (text, opts) => speak(text, 'en-US', opts);
  // 兩套錄音：自然語速（HH_AUDIO）與教學慢速（HH_AUDIO_SLOW），依設定優先，缺的用另一套補
  function audioSrc(text, voice) {
    const sets = isSlow() ? [window.HH_AUDIO_SLOW, window.HH_AUDIO] : [window.HH_AUDIO, window.HH_AUDIO_SLOW];
    const pick = k => { for (const H of sets) if (H && H[k]) return H[k]; };
    return (voice && pick(`${slug(text)}@${voice}`)) || pick(slug(text));
  }
  // 無縫連續播放多個單字（「聽我排的」）：用 Web Audio 解碼，切掉每個字前後的靜音，再一個接一個精準排程
  const SEQ_GAP = -0.02;   // 字與字之間的間隔（秒）；負數＝前一個字的尾音和下一個字稍微重疊，聽起來更連貫
  const bufCache = {};
  let seqNodes = [], seqTimers = [];
  function stopSeq() {
    seqNodes.forEach(n => { try { n.stop(); } catch (e) { } }); seqNodes = [];
    seqTimers.forEach(clearTimeout); seqTimers = [];
  }
  function decodeWord(src) {
    if (!bufCache[src]) bufCache[src] = fetch(src).then(r => r.arrayBuffer())
      .then(b => new Promise((ok, no) => ctx().decodeAudioData(b, ok, no)))
      .then(buf => {
        const d = buf.getChannelData(0), sr = buf.sampleRate; let peak = 0;
        for (let i = 0; i < d.length; i++) { const v = Math.abs(d[i]); if (v > peak) peak = v; }
        let a = 0, z = d.length - 1;   // 開頭用較低門檻（保留輕的子音），結尾門檻稍高（去掉拖長的尾音）
        while (a < d.length && Math.abs(d[a]) < peak * 0.02) a++;
        while (z > a && Math.abs(d[z]) < peak * 0.04) z--;
        return { buf, start: Math.max(0, a / sr - 0.015), end: Math.min(buf.duration, z / sr + 0.02) };
      });
    return bufCache[src];
  }
  // 回傳 false 代表不能用無縫播放（例如缺錄音），呼叫端改用一般逐字播放
  function playSeq(texts, { onWord, onDone, fallback } = {}) {
    if (!data.settings.voice) return false;
    const srcs = texts.map(t => audioSrc(t)), ac = ctx();
    if (!ac || !srcs.length || srcs.some(x => !x)) return false;
    stopVoice(); lastLine = null;
    Promise.all(srcs.map(decodeWord)).then(items => {
      let t = ac.currentTime + 0.05; music.duck(true);
      items.forEach((it, i) => {
        const dur = it.end - it.start, src = ac.createBufferSource(), g = ac.createGain();
        src.buffer = it.buf;
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + 0.008);
        g.gain.setValueAtTime(1, t + dur - 0.015); g.gain.linearRampToValueAtTime(0, t + dur);
        src.connect(g); g.connect(ac.destination); src.start(t, it.start, dur); seqNodes.push(src);
        seqTimers.push(setTimeout(() => onWord && onWord(i), Math.max(0, (t - ac.currentTime) * 1000)));
        t += dur + SEQ_GAP;
      });
      seqTimers.push(setTimeout(() => { seqNodes = []; music.duck(false); onDone && onDone(); }, Math.max(0, (t - ac.currentTime) * 1000)));
    }).catch(() => { fallback && fallback(); });
    return true;
  }
  // 語速：設定頁和上課畫面右上角都可以調。兩種都是原始錄音、不做變速（變速會讓音質變差）
  //   很慢（0.85）＝教學慢速錄音 audio/packs-slow；正常（1）＝自然語速錄音 audio/packs
  // NATURAL_READY：自然語速版錄好並放進 audio/packs 後改成 true，才開放切換
  const NATURAL_READY = true;
  const RATES = [[0.85, '很慢'], [1, '正常']];
  const curRate = () => NATURAL_READY ? data.settings.rate : 0.85;
  const isSlow = () => curRate() < 1;
  const playRate = () => 1;
  const rateName = () => (RATES.find(r => r[0] === curRate()) || RATES[0])[1];
  const speedChip = () => `<button class="speed-chip${NATURAL_READY ? '' : ' locked'}" aria-label="調整英文語速">語速 <span>${rateName()}</span></button>`;
  document.addEventListener('click', e => {
    const c = e.target.closest('.speed-chip'); if (!c) return;
    if (!NATURAL_READY) { toast('自然語速版準備中，完成後就能切換'); return; }
    data.settings.rate = curRate() === 1 ? 0.85 : 1; save(); sfx.tap();
    $$('.speed-chip span').forEach(s => { s.textContent = rateName(); });
    reloadPacks();
    toast(`英文語速：${rateName()}`);
  });
  // 每個單元的英文發音打包成一個檔案，需要時才載入：
  // audio/packs/unit-XX.js＝自然語速，audio/packs-slow/unit-XX.js＝教學慢速
  const packs = {}, packUnits = new Set();
  function loadScript(src) {
    if (!packs[src]) packs[src] = new Promise(res => {
      const sc = document.createElement('script'); sc.src = src;
      sc.onload = () => res(true); sc.onerror = () => res(false);
      document.head.appendChild(sc);
    });
    return packs[src];
  }
  function loadPack(uid) {
    packUnits.add(uid);
    const id = String(uid).padStart(2, '0'), u = COURSE.find(c => c.id === +uid);
    const probe = u && u.words[0] ? slug(u.words[0][0]) : null;
    const has = H => !probe || !!(H && H[probe]);
    const first = isSlow() ? `audio/packs-slow/unit-${id}.js` : `audio/packs/unit-${id}.js`;
    const other = isSlow() ? `audio/packs/unit-${id}.js` : `audio/packs-slow/unit-${id}.js`;
    return loadScript(first).then(() => has(isSlow() ? window.HH_AUDIO_SLOW : window.HH_AUDIO) ? true : loadScript(other));
  }
  const reloadPacks = () => { [...packUnits].forEach(loadPack); };
  const loadPacks = ids => Promise.all(ids.map(loadPack));
  // 瀏覽器規定：要先點一下畫面才能出聲。第一次點擊時補唸剛才那句。
  document.addEventListener('pointerdown', e => {
    if (lineStarted || !lastLine || e.target.closest('.mic, .say-again, .play, .kw, .line-play, button')) return;
    const l = lastLine; setTimeout(() => { if (!lineStarted) speak(l.text, l.lang, l.opts); }, 60);
  }, { capture: true });

  // ---------- 音效與背景音樂（即時產生，免費） ----------
  let actx = null;
  const ctx = () => { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); } catch (e) { } return actx; };
  function tone(freqs, dur = 0.12, type = 'sine', gap = 0.09, vol = 0.12) {
    if (!data.settings.sfx) return;
    const ac = ctx(); if (!ac) return;
    try {
      freqs.forEach((f, i) => {
        const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + i * gap;
        o.type = type; o.frequency.value = f;
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        o.connect(g).connect(ac.destination); o.start(t); o.stop(t + dur + 0.02);
      });
    } catch (e) { }
  }
  const sfx = {
    tap: () => { tone([660], 0.07, 'triangle', 0, 0.06); buzz(12); },
    yay: () => { tone([523, 659, 784, 1047, 1319], 0.25, 'triangle', 0.1); buzz([30, 50, 30, 50, 60]); },
    right: () => { tone([659, 784, 1047], 0.18, 'triangle', 0.08); buzz([25, 40, 25]); },
    wrong: () => { tone([311, 262], 0.22, 'sine', 0.13, 0.1); buzz(160); },
    soft: () => tone([440, 392], 0.14, 'sine', 0.1, 0.08),
    pop: () => tone([880], 0.06, 'sine', 0, 0.05),
    combo: () => tone([784, 988, 1175, 1568], 0.16, 'square', 0.07, 0.035)
  };
  // 手機震動回饋（Android 的 Chrome 支援）
  function buzz(p) { if (data.settings.vibrate && navigator.vibrate) try { navigator.vibrate(p); } catch (e) { } }

  // 背景音樂：溫暖的 lo-fi 電鋼琴循環曲（bgm.mp3，程式合成、無版權問題），說英文時自動變小聲
  const music = (() => {
    let el = null, fader = null, ducked = false, playing = false;
    const target = () => playing ? (ducked ? 0.05 : 0.2) : 0;
    function fadeTo(done) {
      clearInterval(fader);
      fader = setInterval(() => {
        if (!el) return clearInterval(fader);
        const t = target(), v = el.volume, step = 0.02;
        if (Math.abs(v - t) <= step) { el.volume = t; clearInterval(fader); done && done(); }
        else el.volume = v + (t > v ? step : -step);
      }, 40);
    }
    return {
      start() {
        if (!data.settings.music || playing) return;
        try {
          if (!el) { el = new Audio('bgm.mp3'); el.loop = true; el.volume = 0; }
          playing = true; el.play().catch(() => { playing = false; });
          fadeTo();
        } catch (e) { playing = false; }
      },
      stop() {
        if (!playing) return; playing = false;
        fadeTo(() => { try { el.pause(); } catch (e) { } });
      },
      duck(on) { ducked = on; if (playing) fadeTo(); },
      pause() { if (playing && el) { el.pause(); } },
      kill() { clearInterval(fader); playing = false; if (el) { try { el.pause(); el.volume = 0; } catch (e) { } } },
      resume() { if (playing && el) el.play().catch(() => { }); },
      get on() { return playing; }
    };
  })();

  // ---------- 語音輸入（Chrome 內建，免費） ----------
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null;
  function stopListening() { try { rec && rec.stop(); } catch (e) { } rec = null; }

  // ---------- 畫面元件 ----------
  function mascot({ size = '', mood = '', sparks = true } = {}) {
    return `<div class="mascot-box ${size}">
      ${sparks ? '<i class="spark s1"></i><i class="spark s2"></i><i class="spark s3"></i><i class="spark s4"></i>' : ''}
      <div class="mascot-float"><div class="mascot ${mood}"><img src="mascot.png" alt="浣浣" draggable="false"><img class="blink" src="mascot-blink.png" alt="" draggable="false"></div></div>
      <div class="mascot-shadow"></div></div>`;
  }
  function bubble(id) {
    return `<div class="bubble"><span id="${id}"></span><span class="caret"></span>
      <button class="say-again" aria-label="再唸一次" title="再唸一次">${ICON.speaker}</button></div>`;
  }
  // ---------- 浣浣的中文台詞：有錄好的真人錄音就播錄音，沒有就用手機內建語音 ----------
  // 錄音檔放在 audio/zh/<代號>.mp3，並把代號加進 audio/zh/index.js 的清單
  const ZH = {
    'welcome': '嗨，我是浣浣！歡迎來到浣浣學英文，你的名字是？',
    'rename-ask': '想換成什麼名字呢？',
    'confirm-name': '喔喔，這是你的名字嗎？',
    'saved-new': '太好了！我會一直記得你的。我們一起開始學英文吧！',
    'saved-rename': '好的！以後就這樣叫你囉。',
    'welcome-back': '歡迎回來！今天也一起學英文吧。',
    'placement-intro': '我們先做個小測驗，看看從哪一課開始最適合你！不會的題目用猜的就好。',
    'placement-done': '測驗完成！我幫你找到最適合開始的單元了。前面的單元，隨時可以在自選課程複習。',
    'finish-perfect': '太厲害了！這一課全部第一次就答對！',
    'finish-one': '好棒！只錯了一題，下面有列出來，再聽一次就記住了。',
    'finish-good': '完成了！錯的題目已經重新練過，下面也有列出來。',
    'finish-low': '這一課可以再多練習一下。建議之後到自選課程再上一次，會更熟喔。',
    'finish-better': '而且比上次多答對了，真的進步了！'
  };
  function sayZh(ids, fallback) {
    ids = [].concat(ids || []);
    const have = window.HH_ZH || [];
    if (!ids.length || !data.settings.voice || !ids.every(i => have.includes(i))) { speak(fallback, 'zh-TW'); return; }
    stopVoice(); lastLine = null; let i = 0;
    const next = () => {
      if (i >= ids.length) { music.duck(false); return; }
      const a = new Audio(`audio/zh/${ids[i++]}.mp3`); curAudio = a;
      a.onplaying = () => { lineStarted = true; music.duck(true); };
      a.onended = () => { if (curAudio === a) { curAudio = null; next(); } };
      a.onerror = () => { if (curAudio === a) { curAudio = null; speak(fallback, 'zh-TW'); } };
      a.play().catch(() => { });
    };
    next();
  }
  // 打字機效果 + 朗讀；html 可包含名字的強調；ids＝真人錄音的代號
  function typeInto(el, html, text, done, ids) {
    const sayIt = () => sayZh(ids, text);
    clearTimeout(typingTimer);
    const parts = html.split(/(<[^>]+>)/).filter(Boolean);
    let out = '', i = 0, j = 0;
    const caret = el.parentElement.querySelector('.caret');
    const step = () => {
      if (i >= parts.length) { el.innerHTML = out; caret && caret.remove(); done && done(); return; }
      const p = parts[i];
      if (p.startsWith('<')) { out += p; i++; step(); return; }
      out += p[j++]; el.innerHTML = out;
      if (j >= p.length) { i++; j = 0; }
      typingTimer = setTimeout(step, 42);
    };
    const btn = el.parentElement.querySelector('.say-again');
    if (btn) btn.onclick = sayIt;
    typingTimer = setTimeout(() => { sayIt(); step(); }, 900);
  }
  // 浣浣說一句，並把名字標成藍色
  function mascotLine(el, tpl, ids) {
    typeInto(el, esc(tpl).replaceAll('{name}', `<b class="name-chip">${name()}</b>`), tpl.replaceAll('{name}', data.nickname || ''), null, ids);
  }

  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2400);
  }
  function modal({ title, text, ok = '好', cancel = null, danger = false, onOk }) {
    const root = $('#modal-root');
    root.innerHTML = `<div class="overlay"><div class="sheet" role="dialog" aria-modal="true">
      <img src="mascot.png" alt=""><h3>${title}</h3><p>${text}</p>
      <div class="actions">${danger
        ? `${cancel ? `<button class="btn" data-x>${cancel}</button>` : ''}<button class="btn danger" data-ok>${ok}</button>`
        : `<button class="btn" data-ok>${ok}</button>${cancel ? `<button class="btn quit" data-x>${cancel}</button>` : ''}`}</div></div></div>`;
    const close = () => { root.innerHTML = ''; };
    root.querySelector('[data-ok]').onclick = () => { close(); onOk && onOk(); };
    const x = root.querySelector('[data-x]'); if (x) x.onclick = close;
    root.querySelector('.overlay').onclick = e => { if (e.target.classList.contains('overlay')) close(); };
  }

  // ---------- 手機「返回鍵」：回到上一個畫面，不會直接關掉 App ----------
  let backHandler = null, exiting = false;
  const onBack = fn => { backHandler = fn; };
  function handleBack() {
    const m = $('#modal-root');
    if (m.innerHTML) { const x = m.querySelector('[data-x]'); if (x) x.click(); else m.innerHTML = ''; return; }
    if (backHandler) backHandler(); else confirmExit();
  }
  // 支援 CloseWatcher 的瀏覽器（Android／電腦版 Chrome 120 以上）：直接攔截返回鍵，不另外塞歷史紀錄，
  // 這樣確認離開時才能真的關閉分頁／App。不支援的瀏覽器才用「多塞一筆歷史紀錄」的舊方法。
  const useCW = typeof window.CloseWatcher === 'function';
  let watcher = null;
  function armWatcher() {
    if (!useCW || exiting) return;
    try {
      const w = new CloseWatcher();
      // cancel 可以攔下返回鍵；但瀏覽器有時攔不住，會緊接著觸發 close，所以先等一下，避免同一次返回做兩次
      let pending = null;
      w.oncancel = e => { if (exiting) return; e.preventDefault(); pending = setTimeout(handleBack, 0); };
      w.onclose = () => { clearTimeout(pending); if (watcher === w) watcher = null; if (exiting) return; handleBack(); armWatcher(); };
      watcher = w;
    } catch (e) { }
  }
  function armHistory() { if (useCW) return armWatcher(); try { history.pushState({ hh: 'guard' }, ''); } catch (e) { } }
  if (!useCW) try { history.replaceState({ hh: 'root' }, ''); } catch (e) { }
  armHistory();
  window.addEventListener('popstate', () => {
    if (useCW || exiting) return;          // 已經確認要離開：讓瀏覽器真的離開
    armHistory(); handleBack();
  });
  function confirmExit() {
    modal({ title: '要離開浣浣學英文嗎？', text: '你的學習進度都已經保存，下次打開會從這裡繼續。', ok: '離開', cancel: '繼續學習', danger: true, onOk: leaveApp });
  }
  // 確認離開：關掉音樂，直接關閉分頁／App
  function leaveApp() {
    exiting = true; music.kill(); stopVoice();
    $('#modal-root').innerHTML = '';
    if (watcher) { try { watcher.destroy(); } catch (e) { } watcher = null; }
    try { window.close(); } catch (e) { }                 // 直接打開的分頁或主畫面 App：會直接關閉
    setTimeout(() => {
      if (document.hidden) return;
      // 這個分頁之前還有別的網頁（例如從搜尋結果點進來）：瀏覽器不准關閉，就回到那一頁
      if (history.length > 1) { try { history.go(useCW ? -1 : -2); } catch (e) { } }
      setTimeout(() => {
        if (document.hidden || !document.body) return;
        // 真的關不掉（少數瀏覽器）：留在首頁並提示，不再顯示空白畫面
        exiting = false; armHistory(); screenHome();
        toast('這個瀏覽器不允許自動關閉，請直接關閉分頁');
      }, 500);
    }, 200);
  }
  // 切到別的 App 或關掉螢幕時，音樂立刻暫停
  document.addEventListener('visibilitychange', () => { if (document.hidden) music.pause(); else if (!exiting) music.resume(); });
  window.addEventListener('pagehide', () => music.kill());

  let dragOff = null;   // 排句子題的拖曳監聽，換畫面時要拿掉
  function show(html, cls = '') {
    backHandler = null; if (dragOff) { dragOff(); dragOff = null; }
    stopListening(); clearTimeout(typingTimer); stopVoice();
    $('#modal-root').innerHTML = ''; $$('.kw-tip').forEach(t => t.remove());
    app.className = cls;
    app.innerHTML = `<section class="screen">${html}</section>`;
    window.scrollTo(0, 0);
  }
  // 每個畫面都是：固定在上方的標頭（可選）＋可捲動內容＋固定在下方的按鈕區（可選）
  function page({ top = '', body = '', bottom = '', cls = '', bodyCls = '', footId = '' }) {
    show(`${top ? `<header class="bar-top">${top}</header>` : ''}
      <div class="body ${bodyCls}">${body}</div>
      ${bottom ? `<footer class="bar-bottom"${footId ? ` id="${footId}"` : ''}>${bottom}</footer>` : ''}`, cls);
  }
  // 內容頁的標頭：紅色「返回」＋標題
  const navTop = title => `<button class="back-pill" id="back">${ICON.back}<span>返回</span></button><h1>${title}</h1>`;
  // 浣浣說話的對話頁：浣浣＋泡泡在中間，按鈕固定在下方
  function talk({ mood = '', sparks = true, size = '', extra = '', buttons = '' }) {
    page({ body: `<div class="stage">${mascot({ mood, sparks, size })}${bubble('line')}</div>${extra}`,
      bottom: `<div class="actions rise late">${buttons}</div>`, bodyCls: 'center' });
  }

  // ---------- 記住目前在哪個畫面（只存在這個分頁，關掉分頁就清除） ----------
  const SKEY = 'hh-screen';
  function remember(st) { try { sessionStorage.setItem(SKEY, JSON.stringify(st)); } catch (e) { } }
  function recall() { try { return JSON.parse(sessionStorage.getItem(SKEY)); } catch (e) { return null; } }
  function resume(st) {
    const u = st.u && unitById(st.u);
    if (st.s === 'map') return screenMap();
    if (st.s === 'settings') return screenSettings();
    if (st.s === 'sounds') return screenSounds();
    if (u && ['story', 'cards', 'quiz'].includes(st.s)) {
      return loadPack(u.id).then(() => st.s === 'story' ? screenStory(u, st.mode) : st.s === 'cards' ? screenCards(u, st.mode) : startQuiz(u, st.mode));
    }
    screenHome();
  }

  // ========== 開場打招呼 + 輸入暱稱 ==========
  function screenWelcome({ rename = false } = {}) {
    talk({
      extra: `<form class="name-form rise late" id="nf" autocomplete="off">
        <div class="field">
          <input id="nick" maxlength="12" placeholder="輸入你的暱稱" enterkeyhint="done" aria-label="你的暱稱" value="${rename ? name() : ''}">
          ${SR ? `<button type="button" class="mic" id="mic" aria-label="用說的輸入">${ICON.mic}</button>` : ''}
        </div>
        <div class="hint" id="hint">${SR ? '可以打字，也可以按麥克風用說的' : ''}</div>
      </form>`,
      buttons: `<button class="btn" id="next" form="nf" type="submit">下一步</button>
        <button class="btn quit" id="cancel" type="button">${rename ? '取消，不改名字' : '離開'}</button>` });
    onBack(rename ? () => screenSettings() : null);

    mascotLine($('#line'), rename ? '想換成什麼名字呢？' : '嗨，我是浣浣！歡迎來到浣浣學英文，你的名字是？', rename ? 'rename-ask' : 'welcome');
    $('#cancel').onclick = () => { sfx.tap(); rename ? screenSettings() : confirmExit(); };

    const input = $('#nick'), hint = $('#hint'), next = $('#next');
    const sync = () => { next.disabled = !input.value.trim(); };
    sync(); input.addEventListener('input', () => { hint.classList.remove('err'); sync(); });

    $('#nf').addEventListener('submit', e => {
      e.preventDefault();
      const v = cleanName(input.value);
      if (!v) { hint.textContent = '先告訴浣浣你的名字吧'; hint.classList.add('err'); return; }
      sfx.tap(); screenConfirm(v, rename);
    });

    const mic = $('#mic');
    if (mic) mic.addEventListener('click', () => {
      if (rec) { stopListening(); return; }
      stopVoice(); music.pause();
      try {
        rec = new SR(); rec.lang = 'zh-TW'; rec.interimResults = true; rec.maxAlternatives = 1;
        mic.classList.add('on'); hint.classList.remove('err'); hint.textContent = '請說出你的名字…';
        rec.onresult = ev => {
          let t = ''; for (const r of ev.results) t += r[0].transcript;
          input.value = cleanName(t); sync();
        };
        rec.onerror = ev => {
          hint.classList.add('err');
          hint.textContent = ev.error === 'not-allowed' ? '需要允許使用麥克風才能用說的喔' :
            ev.error === 'no-speech' ? '沒聽到聲音，再按一次試試看' :
            ev.error === 'network' ? '用說的需要連上網路，也可以直接打字' : '沒聽清楚，再試一次或直接打字';
        };
        rec.onend = () => {
          mic.classList.remove('on'); rec = null; music.resume();
          if (!hint.classList.contains('err')) hint.textContent = input.value ? '聽到了！沒問題就按「下一步」' : '沒聽清楚，再試一次或直接打字';
        };
        rec.start();
      } catch (e) { mic.classList.remove('on'); rec = null; hint.textContent = '這個瀏覽器不支援用說的，請直接打字'; hint.classList.add('err'); }
    });
  }

  function cleanName(s) {
    return String(s)
      .replace(/^\s*(嗨|哈囉|你好)?[，,\s]*(我的名字(是|叫)|我叫|我是|叫我)\s*/, '')
      .replace(/[。．.，,！!？?、\s]+$/g, '')
      .replace(/^[\s。，,]+/, '')
      .trim().slice(0, 12);
  }

  function screenConfirm(v, rename) {
    const n = esc(v);
    talk({ mood: 'nod', sparks: false, buttons: `<button class="btn green" id="yes">對，就是這個名字</button>
        <button class="btn quit" id="no">不是，重新輸入</button>` });
    typeInto($('#line'), `喔喔，你的名字是<b class="name-chip">${n}</b>嗎？`, `喔喔，你的名字是${v}嗎？`, null, 'confirm-name');
    onBack(() => $('#no').click());
    $('#no').onclick = () => { sfx.soft(); screenWelcome({ rename }); setTimeout(() => { const i = $('#nick'); if (i) { i.value = v; i.dispatchEvent(new Event('input')); } }, 0); };
    $('#yes').onclick = () => { data.nickname = v; save(); sfx.yay(); screenSaved(rename); };
  }

  function screenSaved(rename) {
    talk({ mood: 'joy', buttons: `<button class="btn" id="go">${rename ? '回到設定' : '下一步'}</button>` });
    mascotLine($('#line'), rename ? '好的，{name}！以後就這樣叫你囉。' : '太好了，{name}！我會一直記得你的。我們一起開始學英文吧！', rename ? 'saved-rename' : 'saved-new');
    $('#go').onclick = () => { sfx.tap(); rename ? screenSettings() : screenPlacementIntro(); };
    onBack(() => $('#go').click());
  }

  function screenBack() {
    talk({ buttons: '<button class="btn" id="go">進入首頁</button><button class="btn quit" id="leave">離開</button>' });
    mascotLine($('#line'), '歡迎回來，{name}！今天也一起學英文吧。', 'welcome-back');
    $('#leave').onclick = () => { sfx.tap(); confirmExit(); };
    $('#go').onclick = () => { sfx.tap(); data.placed ? screenHome() : screenPlacementIntro(); };
  }

  // ========== 程度測驗 ==========
  const CHECKPOINTS = [1, 7, 13, 19, 25, 31, 37, 43, 49, 55];
  function screenPlacementIntro(fromSettings = false) {
    talk({ mood: 'nod', buttons: `<button class="btn" id="start">開始測驗（約 10 題）</button>
        <button class="btn ${fromSettings ? 'quit' : 'ghost'}" id="skip">${fromSettings ? '取消，回到設定' : '跳過，從第 1 單元開始'}</button>` });
    mascotLine($('#line'), '{name}，我們先做個小測驗，看看從哪一課開始最適合你！不會的題目用猜的就好。', 'placement-intro');
    $('#start').onclick = () => { sfx.tap(); startPlacement(); };
    if (fromSettings) onBack(() => screenSettings());
    $('#skip').onclick = () => {
      sfx.tap();
      if (fromSettings) { screenSettings(); return; }
      data.placed = true; data.dailyNext = 1; save(); screenHome();
    };
  }
  function startPlacement() {
    loadPacks(CHECKPOINTS).then(startPlacementNow);
  }
  function startPlacementNow() {
    const qs = CHECKPOINTS.map((uid, i) => {
      const u = unitById(uid);
      return i < 4 ? qPickEn(pick(u.words), u) : qSentenceMeaning(pick(quizLines(u)), u);
    });
    runQuiz({ questions: qs, placement: true, title: '程度測驗', onDone: res => {
      const firstWrong = res.firstTry.findIndex(ok => !ok);
      const start = firstWrong === -1 ? CHECKPOINTS[CHECKPOINTS.length - 1] : CHECKPOINTS[firstWrong];
      screenPlacementResult(start, res.firstTry.filter(Boolean).length);
    } });
  }
  function screenPlacementResult(start, score) {
    const u = unitById(start);
    talk({ mood: 'joy', buttons: `<button class="btn" id="a">從第 ${start} 單元開始</button>
        ${start > 1 ? '<button class="btn ghost" id="b">從第 1 單元開始</button>' : ''}` });
    mascotLine($('#line'), `測驗完成！10 題裡{name}答對了 ${score} 題。建議你從第 ${start} 單元「${u.title}」開始。前面的單元隨時可以在「自選課程」複習。`, 'placement-done');
    const go = n => { data.placed = true; data.dailyNext = n; save(); sfx.tap(); screenHome(); };
    $('#a').onclick = () => go(start);
    onBack(() => go(start));
    const b = $('#b'); if (b) b.onclick = () => go(1);
  }

  // ========== 首頁 ==========
  function greetWord() {
    const h = new Date().getHours();
    return h < 5 ? '夜深了' : h < 11 ? '早安' : h < 14 ? '午安' : h < 18 ? '下午好' : '晚安';
  }
  function weekDots() {
    const now = new Date(), dow = (now.getDay() + 6) % 7;
    const monday = new Date(now); monday.setDate(now.getDate() - dow);
    return ['一', '二', '三', '四', '五', '六', '日'].map((d, i) => {
      const day = new Date(monday); day.setDate(monday.getDate() + i);
      const done = data.days.includes(dayKey(day));
      return `<div class="day ${i === dow ? 'today' : ''} ${done ? 'done' : ''}"><i>${done ? ICON.check : ''}</i>${d}</div>`;
    }).join('');
  }
  function currentStreak() {
    if (!data.lastDay) return 0;
    const y = new Date(); y.setDate(y.getDate() - 1);
    return (data.lastDay === dayKey() || data.lastDay === dayKey(y)) ? data.streak : 0;
  }
  function screenHome() {
    remember({ s: 'home' });
    const next = Math.min(data.dailyNext, COURSE.length);
    const finishedAll = data.dailyNext > COURSE.length;
    const nu = unitById(next);
    const doneToday = data.days.includes(dayKey());
    const doneCount = Object.keys(data.done).length;
    const wordCount = new Set(COURSE.filter(u => data.done[u.id]).flatMap(u => u.words.map(w => w[0].toLowerCase()))).size;
    page({ top: `<div class="brand"><img src="mascot.png" alt="">浣浣學英文</div>
        <div class="pill flame" title="連續學習天數">${ICON.flame}${currentStreak()}</div>
        <div class="pill star" title="經驗值">${ICON.star}${data.xp}</div>
        <button class="icon-btn" id="set" aria-label="設定">${ICON.gear}</button>`,
      body: `<div class="hello"><img src="mascot.png" alt="">
        <div><h1>${greetWord()}，<span class="name-chip">${name()}</span>！</h1><p>${doneToday ? '今天的課已經完成了！想多學一點也可以喔。' : (doneCount ? `已上完 ${doneCount} 個單元、學過 ${wordCount} 個單字，今天再學一課吧！` : '每天一課，大約 10 分鐘。')}</p></div></div>
      <div class="week" aria-label="本週學習">${weekDots()}</div>
      <div class="section-title">選擇學習方式</div>
      <button class="course daily" id="daily"><span class="ico">${ICON.sun}</span>
        <span><h2>每日課程<span class="badge">${finishedAll ? '全部完成' : `第 ${next} 單元`}</span></h2>
        <p>${finishedAll ? `${COURSE.length} 個單元都學完了！從頭再複習一輪吧` : `${esc(nu.title)} · 約 10 分鐘`}</p></span><span class="go">${ICON.chevron}</span></button>
      <button class="course free" id="free"><span class="ico">${ICON.map}</span>
        <span><h2>自選課程<span class="badge soft">${doneCount}/${COURSE.length}</span></h2><p>${COURSE.length} 個單元，自由挑選複習</p></span><span class="go">${ICON.chevron}</span></button>
      <button class="course sounds" id="sounds"><span class="ico">${ICON.speaker}</span>
        <span><h2>單字學習<span class="badge soft">已學 ${Object.keys(data.learned).filter(k => k[0] === 'w').length}/${COURSE.length * 8}</span></h2><p>聽單字和句子，學會就打勾</p></span><span class="go">${ICON.chevron}</span></button>
`,
      bottom: '<button class="btn quit" id="leave">離開學習</button>' });
    $('#leave').onclick = () => { sfx.tap(); confirmExit(); };
    $('#daily').onclick = () => { sfx.tap(); startLesson(finishedAll ? 1 : next, 'daily'); };
    $('#free').onclick = () => { sfx.tap(); screenMap(); };
    $('#sounds').onclick = () => { sfx.tap(); screenSounds(); };
    $('#set').onclick = () => { sfx.tap(); screenSettings(); };
  }

  // ========== 自選課程（課程地圖） ==========
  const MONTHS = [
    { from: 1, title: '第一個月 · 基礎', note: '第 1–30 單元：短句、常用單字' },
    { from: 31, title: '第二個月 · 進階', note: '第 31–60 單元：句子長一點、更多生活與旅遊情境' }
  ];
  function screenMap() {
    remember({ s: 'map' });
    page({ top: navTop('自選課程'), body: `<p class="map-note">點任何一個單元都可以上。在這裡上課只算複習，不會改變每日課程的進度。</p>
      <div class="units">${COURSE.map(u => {
        const done = !!data.done[u.id], cur = u.id === data.dailyNext;
        const head = MONTHS.find(m => m.from === u.id);
        return `${head ? `<div class="month"><b>${head.title}</b><small>${head.note}</small></div>` : ''}<button class="unit ${done ? 'done' : ''} ${cur ? 'cur' : ''}" data-u="${u.id}">
          <span class="num">${done ? ICON.check : u.id}</span>
          <span class="meta"><b>${esc(u.title)}</b><small>${esc(u.en)} · ${TOPIC[u.topic]}</small></span>
          ${cur ? '<span class="tag">每日進度</span>' : ''}</button>`;
      }).join('')}</div>` });
    $('#back').onclick = () => { sfx.tap(); screenHome(); };
    onBack(() => screenHome());
    $$('.unit').forEach(b => b.onclick = () => { sfx.tap(); startLesson(+b.dataset.u, 'free'); });
    const cur = $('.unit.cur'); if (cur) setTimeout(() => cur.scrollIntoView({ block: 'center' }), 50);
  }

  // ========== 題目素材 ==========
  const W = (w, u) => ({ en: w[0], zh: w[1], emo: w[2] || '', unit: u.id });
  const voiceOf = (who, u) => who === 'A' ? 'Autonoe' : who === 'C' ? u.npc2.v : u.npc.v;   // 每個角色固定一個聲音（浣浣＝Autonoe）
  const L = (l, u) => ({ en: l[1], zh: l[2], who: l[0], unit: u.id, v: voiceOf(l[0], u) });
  const quizLines = u => u.lines.filter(l => { const n = l[1].split(' ').length; return n >= 3 && n <= 8; });
  const ALL_WORDS = COURSE.flatMap(u => u.words.map(w => W(w, u)));
  const ALL_SENTS = COURSE.flatMap(u => quizLines(u).map(l => L(l, u)));
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // 在句子裡找出重點單字（長的先比對）
  function keywordRegex(words) {
    const list = [...words].sort((a, b) => b.en.length - a.en.length).map(w => reEsc(w.en));
    return new RegExp(`(?<![A-Za-z-])(${list.join('|')})(?![A-Za-z-])`, 'gi');
  }
  // 選出不會和正確答案混淆的干擾選項（英文、中文都不重複），優先用同單元
  // 意思相近、容易誤會的詞放在同一組，出題時不會同時出現
  const SIMILAR = [
    ['哈囉', '你好嗎', '早安'], ['再見', '晚安'],
    ['很好的', '很好的；高興的', '好一點的', '聽起來不錯', '開心的'],
    ['票；機票', '票；車票', '票', '登機證'], ['餐點', '晚餐', '午餐', '早餐'],
    ['不舒服的；生病的', '感冒', '發燒', '頭痛', '咳嗽'], ['上班；工作', '工作', '辦公室'],
    ['多少錢', '價格', '多少個'], ['多久', '幾點'], ['左邊', '左轉'], ['停留', '住', '飯店'],
    ['熱的', '溫暖的；保暖的'], ['冷的', '冰的'], ['休息', '睡覺', '累的'], ['當然', '是的；好'],
    ['來訪；拜訪', '旅行', '假期', '導覽'], ['袋子', '袋子；一件行李', '行李'],
    ['被偷的', '弄丟了', '不見的'], ['晚上', '晚一點', '今晚'], ['有空的', '免費的'],
    // 第二個月（31–60）新增的相近詞
    ['糖', '糖果', '甜的', '甜點', '蛋糕', '冰淇淋'], ['小吃', '餅乾', '爆米花', '甜點'],
    ['肉', '牛肉', '雞肉', '魚'], ['水果', '蘋果', '芒果', '草莓'], ['蔬菜', '洋蔥'],
    ['會痛', '頭痛'], ['牙醫', '醫生'], ['刷', '牙刷'], ['錢', '現金', '美元', '硬幣', '零錢'],
    ['手續費', '小費', '價格'], ['預約', '預訂'], ['小時', '分鐘', '多久'], ['歸還', '回來', '回家'],
    ['河', '海', '海灘', '海浪', '島'], ['公園', '花園'], ['樹', '花', '葉子', '花園'], ['狗', '貓', '寵物'],
    ['長椅', '沙發', '座位'], ['美麗的', '可愛的', '很棒的', '很好的'], ['驚喜', '禮物'], ['唱歌', '音樂'],
    ['轉機', '班機', '搭飛機', '空運'], ['趕快', '很快；不久', '現在；此刻', '晚一點'], ['航廈', '機場', '登機門'],
    ['袋子', '袋子；一件行李', '行李', '行李箱', '行李提領處', '塑膠袋'], ['名字', '名牌', '姓氏'],
    ['寄', '送到'], ['秤重', '公斤'], ['剪頭髮', '頭髮', '切', '髮型；樣式'], ['洗', '洗澡', '洗碗', '要洗的衣服'],
    ['運動', '運動；健身', '健身房', '跑步'], ['放慢', '慢慢地'], ['卡；信用卡', 'SIM 卡（手機網路卡）'],
    ['網路流量', '網路', '無線網路', '訊號'], ['一週', '週末', '上週'], ['充電器', '電池'],
    ['市場', '夜市', '便利商店'], ['便宜的', '更便宜的', '折扣'], ['籃子；一籃', '推車'],
    ['房子', '房間', '臥室', '客廳'], ['樓梯', '電梯', '樓層'], ['打掃', '整理', '吸地', '亂的'],
    ['玩', '玩具'], ['照顧', '幫忙', '保重', '小心的'], ['幾點', '點鐘'], ['外出；不在', '外面；戶外'],
    ['再見', '到時見'], ['茶', '牛奶', '珍珠奶茶'], ['電影', '電影院'], ['開始', '開門'], ['關掉', '關門'],
    ['餐點', '午餐', '便當'], ['熱的', '加熱'], ['渡輪', '船', '甲板'], ['每', '每一個', '每天'],
    ['不舒服的；生病的', '暈船的'], ['外套', '救生衣'], ['旅行', '旅程', '一路平安'], ['第一次', '首先'],
    ['入口', '請進'], ['鞋子', '拖鞋'], ['開心的', '高興的', '很好的；高興的', '愉快的時光', '享受；喜歡'],
    ['看', '看；看起來', '看到了'], ['留言；訊息', '電子郵件'], ['明天', '明年'], ['在家', '回家'],
    ['寄', '送到', '到達'], ['一起', '分享'], ['暗的；天黑的', '黑色'], ['冰淇淋', '冰的'], ['會痛', '不舒服的；生病的'],
    ['嚴重的；糟的', '壞掉的'],
    // 聽起來或拼起來很像的字，聽力題不要放在一起
    ['手續費', '免費的', '有空的'], ['唱歌', '簽名'], ['散步', '上班；工作'], ['錯過', '不見的'], ['看；看起來', '鎖'],
    ['貓', '切', '推車'], ['沙子', '寄'], ['鍋子', '寵物'], ['帳篷', '十', '然後'], ['秋天', '客滿的'], ['願望；許願', '洗'],
    ['加（好友）', '吃了'], ['肉', '認識；見面'], ['星星', '開始'], ['旅程', '小費']
  ];
  const zhParts = z => z.split('；').map(x => x.replace(/的$/, ''));
  // 英文太像也算：單複數（ticket / tickets）、其中一個包含另一個（jacket / life jacket）
  const enLike = (x, y) => {
    const a = x.toLowerCase().replace(/s$/, ''), b = y.toLowerCase().replace(/s$/, '');
    return a === b || ` ${x.toLowerCase()} `.includes(` ${y.toLowerCase()} `) || ` ${y.toLowerCase()} `.includes(` ${x.toLowerCase()} `);
  };
  function confusing(a, b) {
    if (enLike(a.en, b.en) || a.zh === b.zh) return true;
    const pa = zhParts(a.zh), pb = zhParts(b.zh);
    if (pa.some(x => pb.includes(x))) return true;
    return SIMILAR.some(g => g.includes(a.zh) && g.includes(b.zh));
  }
  // 選出不會和正確答案混淆的干擾選項，優先用同單元
  function distractors(ans, pool, n, near) {
    const out = [];
    for (const x of [...shuffle(near || []), ...shuffle(pool)]) {
      if (out.length >= n) break;
      if (confusing(x, ans) || out.some(o => confusing(o, x))) continue;
      out.push(x);
    }
    return out;
  }
  const near = u => u.words.map(w => W(w, u));
  function qPickEn(w, u) { // 看圖和中文選英文
    const a = W(w, u), opts = shuffle([a, ...distractors(a, ALL_WORDS, 3, near(u))]);
    return { type: 'choice', title: '這個英文怎麼說？', emo: a.emo, prompt: a.zh, promptLang: 'zh', audio: a.en, options: opts.map(o => ({ t: o.en })), answer: a.en, optLang: 'en', speakAfter: a.en };
  }
  function qPickZh(w, u) { // 聽英文選中文
    const a = W(w, u), opts = shuffle([a, ...distractors(a, ALL_WORDS, 3, near(u))]);
    return { type: 'choice', title: '這個字是什麼意思？', prompt: a.en, promptLang: 'en', audio: a.en, options: opts.map(o => ({ t: o.zh, emo: o.emo })), answer: a.zh, optLang: 'zh' };
  }
  function qListenWord(w, u) { // 聽發音選英文
    const a = W(w, u), opts = shuffle([a, ...distractors(a, ALL_WORDS, 3, near(u))]);
    return { type: 'choice', title: '仔細聽，選出你聽到的字', listen: true, audio: a.en, options: opts.map(o => ({ t: o.en, emo: o.emo })), answer: a.en, optLang: 'en' };
  }
  function qCloze(line, u) { // 對話填空
    const words = near(u), re = keywordRegex(words), m = line.en.match(re);
    if (!m) return null;
    const hit = words.find(w => w.en.toLowerCase() === m[0].toLowerCase());
    const blank = esc(line.en).replace(new RegExp(`(?<![A-Za-z-])${reEsc(esc(m[0]))}(?![A-Za-z-])`, 'i'), '<span class="blank">＿＿＿</span>');
    // 干擾選項不要用句子裡已經看得到的字（避免一眼就能排除，也避免混淆）
    const inLine = w => keywordRegex([w]).test(line.en);
    const opts = shuffle([hit, ...distractors(hit, ALL_WORDS.filter(w => !inLine(w)), 2, words.filter(w => !inLine(w)))]);
    return { type: 'choice', title: '想想對話，空格該填什麼？', clozeHtml: blank, clozeZh: line.zh, who: line.who, unit: u, audio: line.en, voice: line.v, options: opts.map(o => ({ t: o.en })), answer: hit.en, optLang: 'en', speakAfter: line.en, afterVoice: line.v, wide: true };
  }
  function qSentenceMeaning(s, u) { // 聽句子選意思
    const a = s.en ? s : L(s, u), opts = shuffle([a, ...distractors(a, ALL_SENTS, 2, quizLines(u).map(l => L(l, u)))]);
    return { type: 'choice', title: '這句話是什麼意思？', prompt: a.en, promptLang: 'en', audio: a.en, voice: a.v, options: opts.map(o => ({ t: o.zh })), answer: a.zh, optLang: 'zh', wide: true };
  }
  const norm = t => t.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();
  function qArrange(s, u) { // 排列句子
    const a = L(s, u), tokens = a.en.split(' ');
    const inSent = new Set(tokens.map(t => norm(t)));
    const extra = shuffle(u.words.flatMap(w => w[0].split(' ')).filter(t => !inSent.has(norm(t)))).slice(0, 2);
    return { type: 'arrange', title: '聽一聽，把這句英文排出來', prompt: a.zh, promptLang: 'zh', audio: a.en, voice: a.v, tiles: shuffle([...tokens, ...extra]), answer: a.en, speakAfter: a.en, afterVoice: a.v };
  }
  function qMatch(words, u) { // 配對
    return { type: 'match', title: '把英文和中文配成一對', pairs: words.map(w => W(w, u)) };
  }
  // 配對題：挑 4 個彼此不會混淆的字
  function pickDistinct(u, n) {
    const out = [];
    for (const w of shuffle(u.words)) { if (out.length < n && !out.some(o => confusing(W(o, u), W(w, u)))) out.push(w); }
    return out;
  }
  function buildLesson(u) {
    const ws = shuffle(u.words), ql = shuffle(quizLines(u));
    const re = keywordRegex(near(u));
    const clozeLines = shuffle(u.lines.filter(l => l[1].match(re) && l[1].split(' ').length <= 9)).map(l => L(l, u));
    const clz = clozeLines.slice(0, 2).map(l => qCloze(l, u)).filter(Boolean);
    const first = [qPickEn(ws[0], u), qPickZh(ws[1], u), qListenWord(ws[2], u)];
    const mid = shuffle([qPickEn(ws[3], u), qPickZh(ws[4], u), qListenWord(ws[5], u), qPickEn(ws[6], u), qMatch(pickDistinct(u, 4), u)]);
    const late = shuffle([...clz, qArrange(ql[0], u), qArrange(ql[1 % ql.length], u), qSentenceMeaning(ql[2 % ql.length], u)]);
    return [...first, ...mid, ...late];
  }

  // ========== 上課流程：① 看對話 → ② 學單字 → ③ 練習 ==========
  // 上課標頭：離開＋三段進度＋目前步驟名稱（練習時改成題數）
  const quitPill = () => `<button class="back-pill" id="quit">${ICON.close}<span>離開</span></button>`;
  function steps(n, quiz = false) {
    return `<div class="lprog" aria-label="上課進度">${[1, 2, 3].map(i => i < n ? '<i class="done"></i>' : i > n ? '<i></i>' : quiz ? '<i class="fill"><b id="bar"></b></i>' : '<i class="on"></i>').join('')}</div>`;
  }
  function lessonTop(n) {
    return `${quitPill()}${steps(n)}${speedChip()}`;
  }
  function bindQuit(text = '這一課的進度不會保存喔。', onOk = screenHome) {
    const ask = () => modal({ title: '確定要離開這一課嗎？', text, ok: '離開', cancel: '繼續學習', danger: true, onOk });
    $('#quit').onclick = () => { sfx.tap(); ask(); };
    onBack(ask);
  }
  const face = (who, u) => who === 'A'
    ? `<span class="face mascot-face"><img src="mascot.png" alt="浣浣"></span>`
    : `<span class="face">${(who === 'C' ? u.npc2 : u.npc).face}</span>`;
  const nameOf = (who, u) => who === 'A' ? '浣浣' : who === 'C' ? u.npc2.name : u.npc.name;

  // 英文句子：每個字包成 .wd（逐字播放時會亮起來），重點單字是可以點的 .kw
  function highlight(en, u) {
    const words = near(u), re = keywordRegex(words), kws = [];
    for (const m of en.matchAll(re)) kws.push({ a: m.index, b: m.index + m[0].length, w: words.find(x => x.en.toLowerCase() === m[0].toLowerCase()) });
    let out = '', i = 0;
    const wdRe = /[A-Za-z0-9'’-]+/g;
    const piece = (from, to) => { let h = '', j = from; for (const m of en.slice(from, to).matchAll(wdRe)) { h += esc(en.slice(j, from + m.index)) + `<span class="wd">${esc(m[0])}</span>`; j = from + m.index + m[0].length; } return h + esc(en.slice(j, to)); };
    for (const k of kws) {
      out += piece(i, k.a) + `<span class="kw" role="button" tabindex="0" data-en="${esc(k.w.en)}" data-zh="${esc(k.w.zh)}" data-emo="${k.w.emo}">${piece(k.a, k.b)}</span>`;
      i = k.b;
    }
    return out + piece(i, en.length);
  }
  // 中文句子：把重點單字對應的中文也畫上底線（點了一樣會唸英文）
  function highlightZh(l, u) {
    const words = near(u), zh = l[2], marks = [];
    for (const w of words) {
      if (!keywordRegex([w]).test(l[1])) continue;
      let frag = (window.ZH_MARK || {})[`${u.id}|${w.en}|${zh}`];
      if (!frag) frag = w.zh.split(/[；（）]/).map(x => x.replace(/的$/, '')).filter(Boolean).sort((a, b) => b.length - a.length).find(x => zh.includes(x));
      if (!frag) continue;
      let at = zh.indexOf(frag);
      while (at >= 0 && marks.some(m => at < m.b && at + frag.length > m.a)) at = zh.indexOf(frag, at + 1);
      if (at >= 0) marks.push({ a: at, b: at + frag.length, w });
    }
    marks.sort((x, y) => x.a - y.a);
    let out = '', i = 0;
    for (const m of marks) { out += esc(zh.slice(i, m.a)) + `<span class="kw kz" role="button" tabindex="0" data-en="${esc(m.w.en)}" data-zh="${esc(m.w.zh)}" data-emo="${m.w.emo}">${esc(zh.slice(m.a, m.b))}</span>`; i = m.b; }
    return out + esc(zh.slice(i));
  }
  // 逐字唸：一個字一個字播放，並讓那個字亮起來
  let wordRun = 0;
  function playWords(box, onDone) {
    const wds = $$('.wd', box), id = ++wordRun; let i = 0;
    const step = () => {
      $$('.wd.on').forEach(x => x.classList.remove('on'));
      if (id !== wordRun || i >= wds.length) { onDone && onDone(); return; }
      const w = wds[i++]; w.classList.add('on');
      say(w.textContent, { tight: true, onEnd: () => setTimeout(step, 40) });
    };
    step();
  }
  const lineTools = (id = '') => `<div class="line-tools"><button class="tool-btn lt-play"${id ? ` id="${id}"` : ''} aria-label="播放整句">${ICON.speaker}<span>整句</span></button><button class="tool-btn lt-words" aria-label="一個字一個字聽">${ICON.list}<span>逐字</span></button></div>`;
  // 點重點單字：唸出來＋跳出中文小卡
  function bindKeywords(root) {
    root.addEventListener('click', e => {
      const k = e.target.closest('.kw'); if (!k) return;
      e.stopPropagation(); say(k.dataset.en); buzz(10);
      k.classList.remove('ping'); void k.offsetWidth; k.classList.add('ping');
      $$('.kw-tip').forEach(t => t.remove());
      const tip = document.createElement('div'); tip.className = 'kw-tip';
      tip.innerHTML = `<span class="e">${k.dataset.emo}</span><b>${esc(k.dataset.en)}</b><span>${esc(k.dataset.zh)}</span>`;
      document.body.appendChild(tip);
      const r = k.getBoundingClientRect(), tw = tip.offsetWidth;
      tip.style.left = `${Math.max(10, Math.min(window.innerWidth - tw - 10, r.left + r.width / 2 - tw / 2))}px`;
      tip.style.top = `${r.top + window.scrollY - tip.offsetHeight - 10}px`;
      setTimeout(() => tip.classList.add('out'), 1800); setTimeout(() => tip.remove(), 2200);
    });
  }

  function startLesson(uid, mode) {
    const u = unitById(uid);
    const t = setTimeout(() => toast('浣浣正在準備課程…'), 300);
    loadPack(uid).then(() => { clearTimeout(t); screenStory(u, mode); });
  }

  // ① 情境對話：一句一句出現，英文在上、中文在下，重點單字可點
  function screenStory(u, mode) {
    remember({ s: 'story', u: u.id, mode });
    page({ top: lessonTop(1), cls: 'wide', body: `<div class="scene"><span class="scene-emo">${u.scene}</span><div><b>第 ${u.id} 單元 · ${esc(u.title)}</b><small>${esc(u.place)} · 浣浣、${esc(u.npc.name)}和${esc(u.npc2.name)}</small></div></div>
      <div class="coach story-coach"><img src="mascot.png" alt="浣浣" class="coach-img"><div class="coach-bubble">先聽聽這段對話！<small>藍色底線的字是今天的重點，點一下就能聽</small></div></div>
      <div class="chat" id="chat"></div>`,
      bottom: `<button class="btn" id="next">▶ 開始聽對話</button>
        ${mode === 'free' ? '<button class="linkish center" id="skip">我已經看過了，直接練習</button>' : ''}` });
    music.start(); bindQuit();
    const chat = $('#chat'); bindKeywords(chat);
    let shown = 0;
    const addLine = () => {
      const l = u.lines[shown], el = document.createElement('div');
      el.className = `msg ${l[0] === 'A' ? 'me' : 'them'}${l[0] === 'C' ? ' c2' : ''}`;
      el.innerHTML = `${face(l[0], u)}<div class="msg-body"><small>${esc(nameOf(l[0], u))}</small>
        <div class="msg-bubble"><p class="en">${highlight(l[1], u)}</p><p class="zh">${highlightZh(l, u)}</p>
        ${lineTools()}</div></div>`;
      el.querySelector('.lt-play').onclick = () => { wordRun++; playLine(el, l[1], null, voiceOf(l[0], u)); };
      el.querySelector('.lt-words').onclick = () => { stopVoice(); $$('.msg.speaking').forEach(x => x.classList.remove('speaking')); el.classList.add('speaking'); playWords(el.querySelector('.en'), () => el.classList.remove('speaking')); };
      chat.appendChild(el); sfx.pop();
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
      playLine(el, l[1], null, voiceOf(l[0], u));
      shown++;
    };
    const playLine = (el, text, onEnd, voice) => {
      $$('.msg.speaking').forEach(x => x.classList.remove('speaking'));
      el.classList.add('speaking');
      say(text, { voice, onEnd: () => { el.classList.remove('speaking'); onEnd && onEnd(); } });
    };
    const next = $('#next');
    next.onclick = () => {
      if (shown < u.lines.length) {
        addLine();
        next.textContent = shown < u.lines.length ? `下一句（${shown}/${u.lines.length}）` : '再聽一次整段';
        if (shown === u.lines.length) {
          const go = document.createElement('button'); go.className = 'btn green'; go.id = 'go'; go.textContent = '下一步：認識單字';
          next.after(go); go.onclick = () => { sfx.tap(); screenCards(u, mode); };
          const sk = $('#skip'); if (sk) sk.remove();
          next.classList.add('ghost');
        }
      } else {
        // 全部再聽一次
        const els = $$('.msg', chat); let i = 0;
        const run = () => { if (i >= els.length) return; els[i].scrollIntoView({ behavior: 'smooth', block: 'center' }); playLine(els[i], u.lines[i][1], () => setTimeout(run, 350), voiceOf(u.lines[i][0], u)); i++; };
        run();
      }
    };
    const skip = $('#skip'); if (skip) skip.onclick = () => { sfx.tap(); startQuiz(u, mode); };
  }

  // ② 單字卡：一次一張，大圖示＋英文＋中文＋對話中的例句
  function screenCards(u, mode) {
    remember({ s: 'cards', u: u.id, mode });
    let i = 0;
    page({ top: lessonTop(2), cls: 'wide',
      body: `<div class="card-stage" id="stage"></div>
      <div class="dots" id="dots">${u.words.map(() => '<i></i>').join('')}</div>`,
      bottom: '<div class="row2"><button class="btn ghost" id="prev">上一個</button><button class="btn" id="nextc">下一個</button></div>' });
    music.start(); bindQuit();
    const stage = $('#stage'); bindKeywords(stage);
    const render = () => {
      const w = W(u.words[i], u);
      const ex = u.lines.find(l => keywordRegex([w]).test(l[1]));
      stage.innerHTML = `<div class="wcard">
          <div class="wemo">${w.emo}</div>
          <button class="play big-word" id="pw" aria-label="播放">${ICON.speaker}<span>${esc(w.en)}</span></button>
          <div class="wzh">${esc(w.zh)}</div>
          ${ex ? `<div class="wex"><p class="en">${highlight(ex[1], u)}</p><p class="zh">${highlightZh(ex, u)}</p>
            ${lineTools('pl')}</div>` : ''}
        </div>`;
      $$('#dots i').forEach((d, j) => { d.className = j < i ? 'done' : j === i ? 'on' : ''; });
      $('#prev').disabled = i === 0;
      $('#nextc').textContent = i === u.words.length - 1 ? '開始練習' : `下一個（${i + 1}/${u.words.length}）`;
      $('#nextc').classList.toggle('green', i === u.words.length - 1);
      $('#pw').onclick = () => { say(w.en); buzz(10); };
      const pl = $('#pl'); if (pl) pl.onclick = () => { wordRun++; say(ex[1], { voice: voiceOf(ex[0], u) }); };
      const pw = $('.wex .lt-words'); if (pw) pw.onclick = () => playWords($('.wex .en'));
      sfx.pop(); setTimeout(() => say(w.en), 250);
    };
    $('#prev').onclick = () => { if (i > 0) { i--; render(); } };
    $('#nextc').onclick = () => { if (i < u.words.length - 1) { i++; render(); } else { sfx.tap(); startQuiz(u, mode); } };
    render();
  }

  // ③ 練習
  const PRAISE = ['做得好，{name}！', '太棒了！', '{name}，你好厲害！', '答對了！', '完全正確！', '好耶，繼續保持！'];
  const COMFORT = ['沒關係，{name}，記一下正確答案', '這題答錯了，看一下正確答案', '別擔心，這題等一下會再練一次'];
  function startQuiz(u, mode) {
    remember({ s: 'quiz', u: u.id, mode });
    runQuiz({ questions: buildLesson(u), title: `第 ${u.id} 單元 · ${u.title}`, onDone: res => finishLesson(u, mode, res) });
  }

  function confetti(n = 26, origin) {
    const box = document.createElement('div'); box.className = 'confetti'; document.body.appendChild(box);
    const colors = ['#FFC83D', '#FF6A5C', '#3D8BFF', '#2FBF71', '#B67CFF'];
    const ox = origin ? origin.x : window.innerWidth / 2, oy = origin ? origin.y : window.innerHeight * 0.35;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('i');
      const ang = Math.random() * Math.PI * 2, dist = 80 + Math.random() * (origin ? 120 : 260);
      p.style.cssText = `left:${ox}px;top:${oy}px;background:${pick(colors)};--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist - 60}px;--r:${Math.random() * 720 - 360}deg;animation-delay:${Math.random() * 0.12}s`;
      box.appendChild(p);
    }
    setTimeout(() => box.remove(), 1600);
  }

  function runQuiz({ questions, title, placement = false, onDone }) {
    const total = questions.length;
    const queue = questions.map((q, i) => ({ ...q, idx: i }));
    const firstTry = new Array(total).fill(null);
    let solved = 0, current = null, answered = false, combo = 0;

    page({ cls: 'wide', footId: 'foot',
      top: `${quitPill()}${placement ? '<div class="lprog"><i class="fill"><b id="bar"></b></i></div>' : steps(3, true)}
        <small class="lstep" id="count"></small>${speedChip()}<span class="combo" id="combo"></span>`,
      body: `<div class="lesson-title">${esc(title)}</div><div class="q" id="q"></div>`,
      bottom: '<button class="btn" id="check" disabled>檢查</button>' });
    music.start();
    bindQuit(placement ? '測驗還沒完成，之後可以在設定裡重新測驗。' : '這一課的進度不會保存喔。', () => placement && !data.placed ? screenPlacementIntro() : screenHome());

    const setBar = () => { $('#bar').style.width = `${Math.round(solved / total * 100)}%`; $('#count').textContent = `${solved}/${total}`; };
    setBar();

    function next() {
      if (!queue.length) { onDone({ firstTry, questions }); return; }
      current = queue.shift(); answered = false;
      const foot = $('#foot'); foot.className = 'bar-bottom';
      foot.innerHTML = `<button class="btn" id="check" disabled>${current.type === 'match' ? '配對完成後會自動繼續' : '檢查'}</button>`;
      render(current);
    }

    function coach(text) {
      return `<div class="coach"><img src="mascot.png" alt="浣浣" class="coach-img"><div class="coach-bubble">${text}</div></div>`;
    }

    function render(q) {
      const box = $('#q');
      box.classList.remove('in'); void box.offsetWidth; box.classList.add('in');
      // 排句子題：下方按鈕列多一個「聽我排的」，不佔用題目區的空間
      const check = $('#check');
      let chosen = null;
      const play = (slow) => q.audio && say(q.audio, { slow, voice: q.voice });
      const retry = q.retry ? '<span class="again-tag">再練一次</span>' : '';

      if (q.type === 'choice') {
        const wide = q.wide || q.options.some(o => o.t.length > (o.emo ? 7 : 13));   // 字太長就改成一排一個，避免單字被切開
        let promptHtml = '';
        if (q.listen) promptHtml = `<div class="listen"><button class="play big" id="play" aria-label="播放">${ICON.speaker}</button><button class="play slow" id="slow" aria-label="慢速播放">${ICON.turtle}<small>慢速</small></button></div>`;
        else if (q.clozeHtml) promptHtml = `<div class="cloze">${face(q.who, q.unit)}<div class="msg-bubble"><p class="en">${q.clozeHtml}</p><p class="zh">${esc(q.clozeZh)}</p><button class="line-play" id="play" aria-label="播放這句">${ICON.speaker}</button></div></div>`;
        else promptHtml = `<div class="prompt ${q.promptLang}">${q.emo ? `<span class="p-emo">${q.emo}</span>` : ''}<span class="p-text">${esc(q.prompt)}</span>${q.audio ? `<button class="play" id="play" aria-label="播放">${ICON.speaker}</button>` : ''}</div>`;
        box.innerHTML = `${coach(q.title + retry)}${promptHtml}
          <div class="options ${wide ? 'wide' : ''}">${q.options.map((o, i) => `<button class="opt ${q.optLang}" data-i="${i}">${o.emo ? `<span class="o-emo">${o.emo}</span>` : ''}<span class="o-t"${q.optLang === 'en' ? ' lang="en"' : ''}>${esc(o.t)}</span></button>`).join('')}</div>`;
        $$('.opt', box).forEach(b => b.onclick = () => {
          if (answered) return;
          $$('.opt', box).forEach(x => x.classList.remove('sel')); b.classList.add('sel');
          chosen = q.options[+b.dataset.i].t; check.disabled = false; sfx.tap();
          if (q.optLang === 'en') say(chosen);
        });
        check.onclick = () => grade(q, chosen === q.answer, q.answer, $('.opt.sel', box));
      }

      if (q.type === 'arrange') {
        box.innerHTML = `${coach(q.title + retry + '<small>點單字放進句子；按住單字可以拖曳調整順序</small>')}
          <div class="prompt zh arrange-prompt">
            <span class="p-text">${esc(q.prompt)}</span>
            <button class="play" id="play" aria-label="播放整句">${ICON.speaker}</button>
            <button class="play slow mini" id="slow" aria-label="慢速播放">${ICON.turtle}</button></div>
          <div class="answer-line" id="ans"><button class="ans-play" id="playAns" disabled aria-label="聽我排的句子">${ICON.speaker}<span>聽我排的</span></button></div>
          <div class="bank" id="bank">${q.tiles.map((t, i) => `<button class="tile" data-i="${i}">${esc(t)}</button>`).join('')}</div>`;
        const ans = $('#ans'), bank = $('#bank'), playBtn = $('#playAns');   // 「聽我排的」永遠在句子最後面
        const refresh = () => { const has = !!ans.querySelector('.tile'); check.disabled = !has; playBtn.disabled = !has; };
        // 依序唸出目前排好的單字，方便和整句發音比較
        let seq = 0;
        $('#playAns').onclick = () => {
          const tiles = [...ans.querySelectorAll('.tile')], id = ++seq; let i = 0;
          const clear = () => $$('.tile.speaking', ans).forEach(t => t.classList.remove('speaking'));
          const step = () => {
            $$('.tile.speaking', ans).forEach(t => t.classList.remove('speaking'));
            if (id !== seq || i >= tiles.length) return;
            const t = tiles[i++]; t.classList.add('speaking'); say(word(t), { tight: true, onEnd: () => setTimeout(step, 40) });
          };
          // 優先用無縫播放；缺錄音或解碼失敗時才退回一個一個播
          const ok = playSeq(tiles.map(word), {
            onWord: k => { if (id !== seq) return; clear(); tiles[k].classList.add('speaking'); },
            onDone: () => { if (id === seq) clear(); },
            fallback: () => { if (id === seq) step(); }
          });
          if (!ok) step();
        };
        let dwell = null;
        const word = t => t.textContent.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, '');
        const sayTile = t => { clearTimeout(dwell); say(word(t)); buzz(8); };
        const toAnswer = (t, before = null) => {   // 從下方單字區放進句子
          const c = t.cloneNode(true); c.dataset.from = t.dataset.i; c.classList.remove('used', 'hold');
          t.classList.add('used'); ans.insertBefore(c, before || playBtn); return c;
        };
        const toBank = c => { bank.querySelector(`[data-i="${c.dataset.from}"]`).classList.remove('used'); c.remove(); };
        let swallow = false;   // 拖曳結束時不要再當成「點一下」
        bank.onclick = e => {
          const t = e.target.closest('.tile'); if (swallow || !t || answered || t.classList.contains('used')) return;
          toAnswer(t); sayTile(t); sfx.tap(); refresh();
        };
        ans.onclick = e => {
          const t = e.target.closest('.tile'); if (swallow || !t || answered) return;
          toBank(t); sfx.tap(); refresh();
        };
        // 電腦滑鼠停在單字上一下，也會唸出來
        box.addEventListener('pointerover', e => {
          const t = e.target.closest('.tile'); if (e.pointerType !== 'mouse' || !t || t.classList.contains('used')) return;
          clearTimeout(dwell); dwell = setTimeout(() => sayTile(t), 350);
        });
        box.addEventListener('pointerout', () => clearTimeout(dwell));
        // 拖曳：按住單字移動，可以放進句子的任何位置，或拖回下方
        let drag = null;
        const slotIndex = (x, y) => {
          drag.slot.remove();   // 用沒有空位的版面來算，位置才不會跳來跳去
          const items = [...ans.children].filter(el => el !== drag.src);
          for (const el of items) {
            const r = el.getBoundingClientRect();
            if (y < r.top) return el;
            if (y <= r.bottom && x < r.left + r.width / 2) return el;
          }
          return playBtn;
        };
        const overAns = (x, y) => { const r = ans.getBoundingClientRect(); return x > r.left - 20 && x < r.right + 20 && y > r.top - 30 && y < r.bottom + 30; };
        box.addEventListener('pointerdown', e => {
          const t = e.target.closest('.tile'); if (!t || answered || t.classList.contains('used') || drag) return;
          drag = { src: t, fromAns: t.parentElement === ans, x0: e.clientX, y0: e.clientY, id: e.pointerId, on: false };
        });
        const onMove = e => {
          if (!drag || e.pointerId !== drag.id) return;
          if (!drag.on) {
            if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 8) return;
            drag.on = true; clearTimeout(dwell);
            const r = drag.src.getBoundingClientRect();
            drag.dx = drag.x0 - r.left; drag.dy = drag.y0 - r.top;
            drag.ghost = drag.src.cloneNode(true); drag.ghost.className = 'tile ghost';
            document.body.appendChild(drag.ghost);
            drag.slot = document.createElement('span'); drag.slot.className = 'tile-slot';
            drag.slot.style.width = `${r.width}px`;
            drag.src.classList.add('hold');
            if (drag.fromAns) drag.src.style.display = 'none';
            sayTile(drag.src);
          }
          e.preventDefault();
          drag.ghost.style.left = `${e.clientX - drag.dx}px`; drag.ghost.style.top = `${e.clientY - drag.dy}px`;
          drag.lx = e.clientX; drag.ly = e.clientY;
          if (overAns(e.clientX, e.clientY)) ans.insertBefore(drag.slot, slotIndex(e.clientX, e.clientY));
          else drag.slot.remove();
        };
        const endDrag = e => {
          if (!drag || (e && e.pointerId !== drag.id)) return;
          const d = drag; drag = null;
          if (!d.on) return;
          swallow = true; setTimeout(() => { swallow = false; }, 50);
          d.ghost.remove(); d.src.classList.remove('hold');
          if (answered) { d.slot.remove(); d.src.style.display = ''; return; }
          // 放開時再對齊一次位置（拖曳中版面會跟著移動）
          drag = d; if (overAns(d.lx, d.ly)) ans.insertBefore(d.slot, slotIndex(d.lx, d.ly)); else d.slot.remove(); drag = null;
          d.src.style.display = '';
          if (d.slot.parentElement === ans) {
            if (d.fromAns) ans.insertBefore(d.src, d.slot); else toAnswer(d.src, d.slot);
          } else if (d.fromAns) toBank(d.src);
          d.slot.remove(); sfx.tap(); refresh();
        };
        dragOff && dragOff();
        window.addEventListener('pointermove', onMove, { passive: false });
        window.addEventListener('pointerup', endDrag);
        window.addEventListener('pointercancel', endDrag);
        dragOff = () => {
          window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', endDrag); window.removeEventListener('pointercancel', endDrag);
          if (drag && drag.ghost) drag.ghost.remove(); drag = null;
        };
        check.onclick = () => {
          const built = [...ans.querySelectorAll('.tile')].map(c => c.textContent).join(' ');
          grade(q, norm(built) === norm(q.answer), q.answer, ans);
        };
      }

      if (q.type === 'match') {
        const left = shuffle(q.pairs), right = shuffle(q.pairs);
        box.innerHTML = `${coach(q.title + retry)}
          <div class="match"><div class="col">${left.map(p => `<button class="mtile en" lang="en" data-k="${esc(p.en)}">${esc(p.en)}</button>`).join('')}</div>
          <div class="col">${right.map(p => `<button class="mtile zh" data-k="${esc(p.en)}"><span class="o-emo">${p.emo}</span>${esc(p.zh)}</button>`).join('')}</div></div>`;
        let sel = null, left_ = q.pairs.length, mistakes = 0;
        $$('.mtile', box).forEach(b => b.onclick = () => {
          if (b.classList.contains('ok')) return;
          if (b.classList.contains('en')) say(b.dataset.k);
          if (!sel || sel.classList.contains(b.classList.contains('en') ? 'en' : 'zh')) {
            if (sel) sel.classList.remove('sel');
            sel = b; b.classList.add('sel'); sfx.tap(); return;
          }
          if (sel.dataset.k === b.dataset.k) {
            [sel, b].forEach(x => { x.classList.remove('sel'); x.classList.add('ok'); });
            sfx.right(); sel = null;
            if (--left_ === 0) setTimeout(() => grade(q, true, null, null, mistakes === 0), 400);
          } else {
            mistakes++; [sel, b].forEach(x => { x.classList.add('bad'); setTimeout(() => x.classList.remove('bad', 'sel'), 450); });
            sfx.wrong(); sel = null;
          }
        });
      }

      $('#play') && ($('#play').onclick = () => play(false));
      $('#slow') && ($('#slow').onclick = () => play(true));
      if (q.audio) setTimeout(() => play(false), 400);
    }

    function grade(q, ok, answer, anchorEl, clean = ok) {
      if (answered) return; answered = true;
      if (firstTry[q.idx] === null) firstTry[q.idx] = clean;
      const foot = $('#foot');
      $$('.opt, .tile, .mtile', $('#q')).forEach(b => b.disabled = true);
      if (anchorEl) anchorEl.classList.add(ok ? 'right' : 'wrong');
      if (!ok && q.type === 'choice') { const r = $$('.opt', $('#q')).find(b => q.options[+b.dataset.i].t === q.answer); if (r) r.classList.add('reveal'); }
      if (ok) {
        solved++; setBar(); sfx.right(); combo++;
        const r = (anchorEl || $('#bar')).getBoundingClientRect();
        confetti(18, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
        if (combo >= 3 && !placement) { const c = $('#combo'); c.textContent = `🔥 連續答對 ${combo} 題`; c.classList.remove('show'); void c.offsetWidth; c.classList.add('show'); if (combo % 3 === 0) setTimeout(sfx.combo, 250); }
      } else {
        sfx.wrong(); combo = 0; $('#combo').classList.remove('show');
        if (anchorEl) { anchorEl.classList.add('shake'); }
        if (!placement) queue.push({ ...q, retry: true }); else { solved++; setBar(); }
      }
      if (q.speakAfter) setTimeout(() => say(q.speakAfter, { voice: q.afterVoice }), 300);
      const msg = placement ? (ok ? '答對了！' : '沒關係，繼續下一題')
        : (ok ? pick(PRAISE) : pick(COMFORT)).replaceAll('{name}', data.nickname || '');
      foot.className = `bar-bottom ${ok ? 'good' : 'bad'}`;
      // 回饋區可以再聽一次正確的英文
      const hear = q.speakAfter || q.audio || (q.optLang === 'en' ? q.answer : null), hearV = q.afterVoice || q.voice;
      foot.innerHTML = `<div class="fb"><img src="mascot.png" alt="" class="fb-mascot ${ok ? 'hop' : 'sway'}">
          <div class="fb-t"><b>${ok ? '✓ ' : ''}${esc(msg)}</b>${!ok && answer && !placement ? `<p>正確答案：<span>${esc(answer)}</span></p>` : ''}</div>
          ${hear && !placement ? `<button class="fb-play" id="fbPlay" aria-label="再聽一次">${ICON.speaker}</button>` : ''}</div>
        <button class="btn ${ok ? 'green' : ''}" id="cont">繼續</button>`;
      const fp = $('#fbPlay'); if (fp) fp.onclick = () => say(hear, { voice: hearV });
      $('#cont').onclick = () => { sfx.tap(); stopVoice(); next(); };
    }

    next();
  }

  // ========== 課程完成 ==========
  function finishLesson(u, mode, res) {
    remember({ s: 'home' });
    const firstOk = res.firstTry.filter(Boolean).length, total = res.firstTry.length;
    const acc = Math.round(firstOk / total * 100);
    const gained = 10 + firstOk;
    const today = dayKey();
    if (data.lastDay !== today) {
      const y = new Date(); y.setDate(y.getDate() - 1);
      data.streak = data.lastDay === dayKey(y) ? data.streak + 1 : 1;
      data.lastDay = today;
    }
    if (!data.days.includes(today)) data.days = [...data.days, today].slice(-60);
    data.xp += gained;
    data.done[u.id] = (data.done[u.id] || 0) + 1;
    if (mode === 'daily' && u.id === data.dailyNext) data.dailyNext = u.id + 1;
    const prevBest = data.best[u.id];
    data.best[u.id] = Math.max(prevBest || 0, firstOk);
    save();

    // 第一次答錯的內容，列出來讓使用者再聽一次
    const missedQ = res.questions.filter((q, i) => res.firstTry[i] === false && q.type !== 'match');
    const vOf = {}; missedQ.forEach(q => { vOf[q.audio || q.answer] = q.voice || ''; });
    const missed = [...new Set(missedQ.map(q => q.audio || q.answer))];
    const wrong = total - firstOk;
    page({ bottom: '<button class="btn" id="go">完成，回到首頁</button>',
      body: `<div class="stage">${mascot({ mood: 'joy', size: 'small' })}${bubble('line')}</div>
      <div class="stats rise late">
        <div class="stat"><small>經驗值</small><b class="c-gold">${ICON.star}+${gained}</b></div>
        <div class="stat"><small>一次答對</small><b class="c-green">${firstOk}/${total}</b></div>
        <div class="stat"><small>連續學習</small><b class="c-orange">${ICON.flame}${data.streak}天</b></div>
      </div>
      ${missed.length ? `<div class="learned rise late"><small>要再多練習的（點一下聽發音）</small><div>${missed.map(t => `<button class="chip miss" data-en="${esc(t)}" data-v="${vOf[t]}">${esc(t)}</button>`).join('')}</div></div>` : ''}
      <div class="learned rise late"><small>這一課的 8 個單字（點一下聽發音）</small><div>${u.words.map(w => `<button class="chip" data-en="${esc(w[0])}">${w[2]} ${esc(w[0])}</button>`).join('')}</div></div>` });
    sfx.yay(); confetti(60); setTimeout(() => confetti(40), 500);
    $$('.chip').forEach(c => c.onclick = () => { say(c.dataset.en, { voice: c.dataset.v || undefined }); buzz(10); });
    const head = `第 ${u.id} 單元「${u.title}」共 ${total} 題，`;
    let tpl = acc === 100 ? `太厲害了，{name}！${head}全部第一次就答對！`
      : wrong === 1 ? `好棒，{name}！${head}只錯了 1 題，下面有列出來，再聽一次就記住了。`
      : acc >= 60 ? `完成了，{name}！${head}第一次就答對 ${firstOk} 題，錯的 ${wrong} 題已經重新練過，下面也有列出來。`
        : `{name}，${head}第一次答對 ${firstOk} 題。建議之後到「自選課程」再上一次這個單元，會更熟喔。`;
    const ids = [acc === 100 ? 'finish-perfect' : wrong === 1 ? 'finish-one' : acc >= 60 ? 'finish-good' : 'finish-low'];
    if (prevBest != null && firstOk > prevBest) { tpl += `比上次多答對 ${firstOk - prevBest} 題，真的進步了！`; ids.push('finish-better'); }
    mascotLine($('#line'), tpl, ids);
    $('#go').onclick = () => { sfx.tap(); screenHome(); };
    onBack(() => screenHome());
  }

  // ========== 設定 ==========
  // ========== 單字學習：聽全部單字／句子，學會了打勾；回報模式下可以標記發音有問題 ==========
  let soundTab = 'words', reportMode = false;
  function screenSounds() {
    remember({ s: 'sounds' });
    const flags = data.flags, learned = data.learned;
    if (!reportMode && soundTab === 'flags') soundTab = 'words';
    const itemsOf = (u, tab) => tab === 'words' ? u.words.map(w => ({ k: `w:${u.id}:${w[0]}`, en: w[0], zh: w[1], emo: w[2] }))
      : u.lines.map(l => ({ k: `s:${u.id}:${l[1]}`, en: l[1], zh: l[2], v: voiceOf(l[0], u) }));
    const all = tab => COURSE.flatMap(u => itemsOf(u, tab).map(it => ({ ...it, u })));
    const nFlag = () => Object.keys(flags).length;
    const mark = it => reportMode
      ? `<button class="sr-flag ${flags[it.k] ? 'on' : ''}" aria-label="回報發音有問題">${ICON.flag}</button>`
      : `<button class="sr-check ${learned[it.k] ? 'on' : ''}" aria-label="已學習">${ICON.check}</button>`;
    const row = (it, withUnit = false) => `<div class="sr ${learned[it.k] && !reportMode ? 'done' : ''}" data-k="${esc(it.k)}" data-en="${esc(it.en)}" data-u="${it.u.id}" data-v="${it.v || ''}">
        <button class="sr-play" aria-label="播放">${ICON.speaker}</button>
        <div class="sr-t"><b>${it.emo ? `${it.emo} ` : ''}${esc(it.en)}</b><small>${withUnit ? `第 ${it.u.id} 單元 · ` : ''}${esc(it.zh)}</small></div>
        ${mark(it)}</div>`;
    const doneIn = (u, tab) => itemsOf(u, tab).filter(it => learned[it.k]).length;
    const body = () => {
      if (soundTab === 'flags') {
        const list = [...all('words'), ...all('lines')].filter(it => flags[it.k]);
        return list.length ? `<div class="sb open">${list.map(it => row(it, true)).join('')}</div>`
          : '<p class="map-note">還沒有回報。聽到發音不對的，按右邊的旗子就會出現在這裡。</p>';
      }
      return COURSE.map(u => { const n = itemsOf(u, soundTab).length, d = doneIn(u, soundTab);
        return `<section class="su" data-u="${u.id}">
          <div class="su-head"><button class="su-open"><b>第 ${u.id} 單元 · ${esc(u.title)}</b><small class="${d === n ? 'all' : ''}" data-n="${n}">已學 <span>${d}</span>/${n}</small>${ICON.chevron}</button>
          <button class="su-all" aria-label="依序播放">▶ 全部</button></div>
          <div class="sb"></div></section>`; }).join('');
    };
    const tabs = [['words', '單字'], ['lines', '句子'], ...(reportMode ? [['flags', `已回報 <span id="fc">${nFlag()}</span>`]] : [])];
    page({ top: navTop('單字學習'),
      body: `<label class="report-toggle"><span><b>回報模式</b><small>發音聽起來不對時打開，可以標記給 Claude 修正</small></span>
          <span class="switch"><input type="checkbox" id="rmode" ${reportMode ? 'checked' : ''} aria-label="回報模式"><span></span></span></label>
        <div class="seg big" id="stab">${tabs.map(([t, l]) => `<button data-t="${t}" class="${soundTab === t ? 'on' : ''}">${l}</button>`).join('')}</div>
        <p class="map-note">${reportMode
          ? `點 <span class="mini-ico">${ICON.speaker}</span> 聽發音；不對的按 <span class="mini-ico red">${ICON.flag}</span> 回報，最後按下方按鈕複製清單。`
          : `點 <span class="mini-ico">${ICON.speaker}</span> 聽發音；學會了就按右邊的 <span class="mini-ico green">${ICON.check}</span> 打勾。`}</p>
        <div id="slist">${body()}</div>`,
      bottom: reportMode ? '<button class="btn" id="copy">複製要修正的清單</button>' : '' });
    onBack(() => screenHome());
    $('#back').onclick = () => { sfx.tap(); screenHome(); };
    $('#rmode').onchange = e => { reportMode = e.target.checked; run++; sfx.tap(); screenSounds(); };
    const list = $('#slist'), copyBtn = $('#copy');
    const sync = () => {
      if (!copyBtn) return; const n = nFlag(); const fc = $('#fc'); if (fc) fc.textContent = n;
      copyBtn.disabled = !n; copyBtn.textContent = n ? `複製要修正的清單（${n} 個）` : '還沒有回報要修正的發音';
    };
    sync();
    let run = 0;   // 依序播放的編號，換畫面或按別的就停止
    const playRow = (r, onEnd) => {
      $$('.sr.speaking').forEach(x => x.classList.remove('speaking')); r.classList.add('speaking');
      loadPack(+r.dataset.u).then(() => say(r.dataset.en, { voice: r.dataset.v || undefined, onEnd: () => { r.classList.remove('speaking'); onEnd && onEnd(); } }));
    };
    const fill = sec => {
      const u = unitById(+sec.dataset.u), sb = sec.querySelector('.sb');
      if (!sb.innerHTML) sb.innerHTML = itemsOf(u, soundTab).map(it => row({ ...it, u })).join('');
    };
    list.onclick = e => {
      const sec = e.target.closest('.su'), r = e.target.closest('.sr');
      if (e.target.closest('.su-open')) { fill(sec); sec.classList.toggle('open'); sfx.tap(); loadPack(+sec.dataset.u); return; }
      if (e.target.closest('.su-all')) {
        fill(sec); sec.classList.add('open'); const rows = $$('.sr', sec), id = ++run; let i = 0;
        const step = () => { if (id !== run || i >= rows.length) return; const r = rows[i++]; r.scrollIntoView({ block: 'center', behavior: 'smooth' }); playRow(r, () => setTimeout(step, 500)); };
        step(); return;
      }
      if (e.target.closest('.sr-play')) { run++; playRow(r); return; }
      if (e.target.closest('.sr-check')) {
        const k = r.dataset.k; if (learned[k]) delete learned[k]; else learned[k] = 1; save();
        e.target.closest('.sr-check').classList.toggle('on', !!learned[k]); r.classList.toggle('done', !!learned[k]);
        if (learned[k]) { sfx.right(); buzz(15); } else sfx.tap();
        if (sec) { const sm = sec.querySelector('.su-open small'), d = doneIn(unitById(+sec.dataset.u), soundTab);
          sm.querySelector('span').textContent = d; sm.classList.toggle('all', d === +sm.dataset.n);
          if (d === +sm.dataset.n && learned[k]) { const rr = sec.getBoundingClientRect(); confetti(24, { x: rr.left + rr.width / 2, y: rr.top + 30 }); } }
        return;
      }
      if (e.target.closest('.sr-flag')) {
        const k = r.dataset.k; if (flags[k]) delete flags[k]; else flags[k] = 1; save();
        e.target.closest('.sr-flag').classList.toggle('on', !!flags[k]); buzz(15); sfx.tap(); sync();
      }
    };
    $('#stab').onclick = e => { const b = e.target.closest('button'); if (!b) return; soundTab = b.dataset.t; run++; sfx.tap(); screenSounds(); };
    if (copyBtn) copyBtn.onclick = async () => {
      const lines = [...all('words'), ...all('lines')].filter(it => flags[it.k])
        .map(it => `第 ${it.u.id} 單元・${it.k[0] === 'w' ? '單字' : '句子'}：${it.en}（${it.zh}）`);
      const text = `要修正的發音（共 ${lines.length} 個）：\n${lines.join('\n')}`;
      let ok = false;
      try { await navigator.clipboard.writeText(text); ok = true; } catch (err) {
        const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
        try { ok = document.execCommand('copy'); } catch (e2) { } ta.remove();
      }
      toast(ok ? '已複製！可以直接貼給 Claude' : '無法自動複製，請截圖「已回報」頁面');
    };
  }

  function screenSettings() {
    remember({ s: 'settings' });
    const s = data.settings;
    const rates = RATES, cur = curRate();
    page({ top: navTop('設定'), body: `<div class="list">
        <div class="item"><div class="label">暱稱<small>浣浣會這樣叫你</small></div><span class="value">${name()}</span><button class="linkish" id="rename">修改</button></div>
        <div class="item"><div class="label">重新測驗程度<small>目前每日課程在第 ${Math.min(data.dailyNext, COURSE.length)} 單元</small></div><button class="linkish" id="retest">測驗</button></div>
      </div>
      <div class="list">
        <div class="item"><div class="label">外觀<small>深色或淺色畫面</small></div><div class="seg" id="theme">${[['dark', '深色'], ['light', '淺色']].map(([t, l]) => `<button data-t="${t}" class="${s.theme === t ? 'on' : ''}">${l}</button>`).join('')}</div></div>
      </div>
      <div class="list">
        <div class="item"><div class="label">聲音<small>英文發音與浣浣說話</small></div><label class="switch"><input type="checkbox" id="voice" ${s.voice ? 'checked' : ''} aria-label="聲音"><span></span></label></div>
        <div class="item stack"><div class="label">英文語速<small>${NATURAL_READY ? '「很慢」是放慢錄製的教學版，「正常」是自然語速版；上課時也可以按右上角的「語速」切換' : '自然語速版準備中，完成後就能切換到「正常」'}</small></div><div class="seg" id="rate">${rates.map(([r, l]) => `<button data-r="${r}" class="${cur === r ? 'on' : ''}" ${NATURAL_READY ? '' : 'disabled'}>${l}</button>`).join('')}</div></div>
        <div class="item"><div class="label">試聽英文發音</div><button class="linkish" id="test">播放範例</button></div>
        <div class="item"><div class="label">音效<small>答對、按鈕的提示音</small></div><label class="switch"><input type="checkbox" id="sfx" ${s.sfx ? 'checked' : ''} aria-label="音效"><span></span></label></div>
        <div class="item"><div class="label">背景音樂<small>使用 App 時的輕柔音樂</small></div><label class="switch"><input type="checkbox" id="music" ${s.music ? 'checked' : ''} aria-label="背景音樂"><span></span></label></div>
        <div class="item"><div class="label">震動回饋<small>手機答對、答錯時輕輕震動</small></div><label class="switch"><input type="checkbox" id="vib" ${s.vibrate ? 'checked' : ''} aria-label="震動回饋"><span></span></label></div>
      </div>
      <div class="list">
        <div class="item"><div class="label">清除所有資料<small>暱稱與進度都會刪除，回到第一次打開的樣子</small></div><button class="linkish red" id="reset">清除</button></div>
      </div>
      <div class="foot">浣浣學英文 · 第 2 階段預覽版<br>英文發音：開源語音模型 Kokoro＋美式發音字典 · 資料只存在這台裝置的瀏覽器裡</div>` });
    $('#back').onclick = () => { sfx.tap(); screenHome(); };
    onBack(() => screenHome());
    $('#rename').onclick = () => { sfx.tap(); screenWelcome({ rename: true }); };
    $('#retest').onclick = () => { sfx.tap(); screenPlacementIntro(true); };
    $('#voice').onchange = e => { s.voice = e.target.checked; save(); if (!s.voice) stopVoice(); };
    $('#sfx').onchange = e => { s.sfx = e.target.checked; save(); sfx.tap(); };
    $('#music').onchange = e => { s.music = e.target.checked; save(); if (s.music) music.start(); else music.stop(); };
    $('#vib').onchange = e => { s.vibrate = e.target.checked; save(); buzz([30, 40, 30]); };
    $('#rate').onclick = e => {
      const b = e.target.closest('button'); if (!b || !NATURAL_READY) return;
      s.rate = Number(b.dataset.r); save(); reloadPacks();
      [...$('#rate').children].forEach(x => x.classList.toggle('on', x === b));
    };
    $('#theme').onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      s.theme = b.dataset.t; save(); applyTheme(); sfx.tap();
      [...$('#theme').children].forEach(x => x.classList.toggle('on', x === b));
    };
    $('#test').onclick = () => loadPack(1).then(() => say('Hello! Good morning!', { voice: 'Erinome' }));
    $('#reset').onclick = () => modal({
      title: '確定要清除嗎？', text: '暱稱與學習進度都會刪除，而且無法復原。', ok: '清除', cancel: '取消', danger: true,
      onOk: () => { try { localStorage.removeItem(KEY); } catch (e) { } data = load(); applyTheme(); screenWelcome(); }
    });
  }

  // 鍵盤：數字鍵選答案、Enter 檢查／繼續（電腦上比較方便）
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= 4) { const b = $(`.opt[data-i="${n - 1}"]`); if (b && !b.disabled) b.click(); }
    if (e.key === 'Enter') { const c = $('#cont') || $('#check'); if (c && !c.disabled) { e.preventDefault(); c.click(); } }
  });

  // ---------- 背景音樂從一打開就開始（瀏覽器規定要先點一下畫面，第一次點擊時自動開始） ----------
  music.start();
  const kick = () => { if (!music.on) music.start(); };
  ['pointerdown', 'keydown', 'touchstart'].forEach(ev => document.addEventListener(ev, kick, { capture: true, passive: true }));

  // ---------- 手機長按不跳出選單、不選取文字（輸入框除外） ----------
  const typing = e => e.target.closest && e.target.closest('input, textarea');
  document.addEventListener('contextmenu', e => { if (!typing(e)) e.preventDefault(); });
  document.addEventListener('selectstart', e => { if (!typing(e)) e.preventDefault(); });
  document.addEventListener('dragstart', e => { if (e.target.tagName === 'IMG') e.preventDefault(); });
  // ---------- 所有頁面都不能「下拉重新整理」 ----------
  // CSS 已經關掉（overscroll-behavior），再加一層保險：畫面在最上面時往下拉，就擋下這個手勢（不影響正常往下捲動）
  let pullY = null;
  document.addEventListener('touchstart', e => { pullY = e.touches.length === 1 ? e.touches[0].clientY : null; }, { passive: true });
  document.addEventListener('touchmove', e => {
    if (pullY === null || !e.cancelable) return;
    const dy = e.touches[0].clientY - pullY;
    if (dy > 0 && (document.scrollingElement || document.documentElement).scrollTop <= 0) e.preventDefault();
  }, { passive: false });
  document.addEventListener('touchend', () => { pullY = null; }, { passive: true });

  // ---------- 啟動 ----------
  // 重新整理（或不小心下拉重整）時，回到剛才的畫面，而不是重新打招呼
  const last = recall();
  if (!data.nickname) screenWelcome();
  else if (last && data.placed) resume(last);
  else screenBack();

  // 開過一次後沒網路也能打開（需放在網址上才有效）
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
  }
})();
