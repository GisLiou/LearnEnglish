/* 簡單學英文 · 第 2 階段：開場、暱稱、程度測驗、每日／自選課程、點選題、進度 */
(() => {
  'use strict';

  // ---------- 資料保存（存在這台裝置的瀏覽器裡） ----------
  const KEY = 'hh-english-v1';
  const DEFAULTS = {
    nickname: null, streak: 0, xp: 0, lastDay: null, days: [],
    placed: false, dailyNext: 1, done: {}, best: {},
    settings: { voice: true, sfx: true, rate: 1, theme: 'dark', music: true, vibrate: true }
  };
  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(KEY)) || {};
      return { ...DEFAULTS, ...d, done: { ...(d.done || {}) }, best: { ...(d.best || {}) }, days: [...(d.days || [])], settings: { ...DEFAULTS.settings, ...(d.settings || {}) } };
    } catch (e) { return JSON.parse(JSON.stringify(DEFAULTS)); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* 無法保存時仍可使用 */ } }
  let data = load();

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
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
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
  // 說一句話：英文播預錄音檔（開源 Kokoro＋發音字典錄製）；中文用瀏覽器內建聲音
  function speak(text, lang = 'zh-TW', opts = {}) {
    lastLine = { text, lang, opts }; lineStarted = false;
    if (!data.settings.voice) { opts.onEnd && setTimeout(opts.onEnd, 300); return; }
    stopVoice();
    const rate = (opts.slow ? 0.7 : 1) * data.settings.rate;
    if (!lang.startsWith('en')) { ttsSay(text, lang, rate, opts.onEnd); return; }
    const a = new Audio((window.HH_AUDIO || {})[slug(text)] || `audio/voice/${slug(text)}.mp3`);
    a.playbackRate = rate; a.preservesPitch = true;
    curAudio = a;
    let fellBack = false;
    const fallback = () => { if (fellBack || curAudio !== a) return; fellBack = true; curAudio = null; ttsSay(text, 'en-US', rate, opts.onEnd); };
    a.onplaying = () => { lineStarted = true; music.duck(true); };
    a.onended = () => { if (curAudio === a) curAudio = null; music.duck(false); opts.onEnd && opts.onEnd(); };
    a.onerror = fallback;
    a.play().catch(err => { if (err && err.name === 'NotAllowedError') return; fallback(); });
  }
  const say = (text, opts) => speak(text, 'en-US', opts);
  // 每個單元的英文發音打包成一個檔案（audio/packs/unit-XX.js），需要時才載入
  const packs = {};
  function loadPack(uid) {
    const id = String(uid).padStart(2, '0');
    if (!packs[id]) packs[id] = new Promise(res => {
      const sc = document.createElement('script'); sc.src = `audio/packs/unit-${id}.js`;
      sc.onload = () => res(true); sc.onerror = () => res(false);
      document.head.appendChild(sc);
    });
    return packs[id];
  }
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
  // 打字機效果 + 朗讀；html 可包含名字的強調
  function typeInto(el, html, text, done) {
    const sayIt = () => speak(text, 'zh-TW');
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
  function mascotLine(el, tpl) {
    typeInto(el, esc(tpl).replaceAll('{name}', `<b class="name-chip">${name()}</b>`), tpl.replaceAll('{name}', data.nickname || ''));
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
  function armHistory() { try { history.pushState({ hh: 'guard' }, ''); } catch (e) { } }
  try { history.replaceState({ hh: 'root' }, ''); } catch (e) { }
  armHistory();
  window.addEventListener('popstate', () => {
    if (exiting) return;          // 已經確認要離開：讓瀏覽器真的離開
    armHistory(); handleBack();
  });
  function confirmExit() {
    modal({ title: '要離開簡單學英文嗎？', text: '你的學習進度都已經保存，下次打開會從這裡繼續。', ok: '離開', cancel: '繼續學習', danger: true, onOk: leaveApp });
  }
  function leaveApp() {
    exiting = true; music.kill(); stopVoice();
    talk({ mood: 'nod', sparks: false, buttons: '<button class="btn" id="stay">回來繼續學習</button>' });
    mascotLine($('#line'), '{name}，下次見！音樂已經關掉了，你可以直接關閉這個畫面。');
    $('#stay').onclick = () => { exiting = false; armHistory(); sfx.tap(); if (data.settings.music) music.start(); screenHome(); };
    try { history.back(); } catch (e) { }   // 回到最前面，下一次按返回就會真的離開
    try { window.close(); } catch (e) { }
  }
  // 切到別的 App 或關掉螢幕時，音樂立刻暫停
  document.addEventListener('visibilitychange', () => { if (document.hidden) music.pause(); else if (!exiting) music.resume(); });
  window.addEventListener('pagehide', () => music.kill());

  function show(html, cls = '') {
    backHandler = null;
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

    mascotLine($('#line'), rename ? '想換成什麼名字呢？' : '嗨，我是浣浣！這裡是簡單學英文，你的名字是？');
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
    typeInto($('#line'), `喔喔，你的名字是<b class="name-chip">${n}</b>嗎？`, `喔喔，你的名字是${v}嗎？`);
    onBack(() => $('#no').click());
    $('#no').onclick = () => { sfx.soft(); screenWelcome({ rename }); setTimeout(() => { const i = $('#nick'); if (i) { i.value = v; i.dispatchEvent(new Event('input')); } }, 0); };
    $('#yes').onclick = () => { data.nickname = v; save(); sfx.yay(); screenSaved(rename); };
  }

  function screenSaved(rename) {
    talk({ mood: 'joy', buttons: `<button class="btn" id="go">${rename ? '回到設定' : '下一步'}</button>` });
    mascotLine($('#line'), rename ? '好的，{name}！以後就這樣叫你囉。' : '太好了，{name}！我會一直記得你的。我們一起開始學英文吧！');
    $('#go').onclick = () => { sfx.tap(); rename ? screenSettings() : screenPlacementIntro(); };
    onBack(() => $('#go').click());
  }

  function screenBack() {
    talk({ buttons: '<button class="btn" id="go">進入首頁</button><button class="btn quit" id="leave">離開</button>' });
    mascotLine($('#line'), '歡迎回來，{name}！今天也一起學英文吧。');
    $('#leave').onclick = () => { sfx.tap(); confirmExit(); };
    $('#go').onclick = () => { sfx.tap(); data.placed ? screenHome() : screenPlacementIntro(); };
  }

  // ========== 程度測驗 ==========
  const CHECKPOINTS = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28];
  function screenPlacementIntro(fromSettings = false) {
    talk({ mood: 'nod', buttons: `<button class="btn" id="start">開始測驗（約 10 題）</button>
        <button class="btn ${fromSettings ? 'quit' : 'ghost'}" id="skip">${fromSettings ? '取消，回到設定' : '跳過，從第 1 單元開始'}</button>` });
    mascotLine($('#line'), '{name}，我們先做個小測驗，看看從哪一課開始最適合你！不會的題目用猜的就好。');
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
    mascotLine($('#line'), `測驗完成！10 題裡{name}答對了 ${score} 題。建議你從第 ${start} 單元「${u.title}」開始。前面的單元隨時可以在「自選課程」複習。`);
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
    const next = Math.min(data.dailyNext, COURSE.length);
    const finishedAll = data.dailyNext > COURSE.length;
    const nu = unitById(next);
    const doneToday = data.days.includes(dayKey());
    const doneCount = Object.keys(data.done).length;
    const wordCount = new Set(COURSE.filter(u => data.done[u.id]).flatMap(u => u.words.map(w => w[0].toLowerCase()))).size;
    page({ top: `<div class="brand"><img src="mascot.png" alt="">簡單學英文</div>
        <div class="pill flame" title="連續學習天數">${ICON.flame}${currentStreak()}</div>
        <div class="pill star" title="經驗值">${ICON.star}${data.xp}</div>
        <button class="icon-btn" id="set" aria-label="設定">${ICON.gear}</button>`,
      body: `<div class="hello"><img src="mascot.png" alt="">
        <div><h1>${greetWord()}，<span class="name-chip">${name()}</span>！</h1><p>${doneToday ? '今天的課已經完成了！想多學一點也可以喔。' : (doneCount ? `已上完 ${doneCount} 個單元、學過 ${wordCount} 個單字，今天再學一課吧！` : '每天一課，大約 10 分鐘。')}</p></div></div>
      <div class="week" aria-label="本週學習">${weekDots()}</div>
      <div class="section-title">選擇學習方式</div>
      <button class="course daily" id="daily"><span class="ico">${ICON.sun}</span>
        <span><h2>每日課程<span class="badge">${finishedAll ? '全部完成' : `第 ${next} 單元`}</span></h2>
        <p>${finishedAll ? '30 個單元都學完了！從頭再複習一輪吧' : `${esc(nu.title)} · ${TOPIC[nu.topic]} · 約 10 分鐘`}</p></span><span class="go">${ICON.chevron}</span></button>
      <button class="course free" id="free"><span class="ico">${ICON.map}</span>
        <span><h2>自選課程<span class="badge soft">${doneCount}/${COURSE.length}</span></h2><p>30 個單元，自由複習或跳級</p></span><span class="go">${ICON.chevron}</span></button>
      <div class="foot">第 2 階段預覽版</div>`,
      bottom: '<button class="btn quit" id="leave">離開學習</button>' });
    $('#leave').onclick = () => { sfx.tap(); confirmExit(); };
    $('#daily').onclick = () => { sfx.tap(); startLesson(finishedAll ? 1 : next, 'daily'); };
    $('#free').onclick = () => { sfx.tap(); screenMap(); };
    $('#set').onclick = () => { sfx.tap(); screenSettings(); };
  }

  // ========== 自選課程（課程地圖） ==========
  function screenMap() {
    page({ top: navTop('自選課程'), body: `<p class="map-note">點任何一個單元都可以上。在這裡上課只算複習，不會改變每日課程的進度。</p>
      <div class="units">${COURSE.map(u => {
        const done = !!data.done[u.id], cur = u.id === data.dailyNext;
        return `<button class="unit ${done ? 'done' : ''} ${cur ? 'cur' : ''}" data-u="${u.id}">
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
  const L = (l, u) => ({ en: l[1], zh: l[2], who: l[0], unit: u.id });
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
    ['被偷的', '弄丟了'], ['晚上', '晚一點'], ['有空的', '免費的']
  ];
  const zhParts = z => z.split('；').map(x => x.replace(/的$/, ''));
  function confusing(a, b) {
    if (a.en.toLowerCase() === b.en.toLowerCase() || a.zh === b.zh) return true;
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
    return { type: 'choice', title: '這個英文怎麼說？', emo: a.emo, prompt: a.zh, promptLang: 'zh', options: opts.map(o => ({ t: o.en })), answer: a.en, optLang: 'en', speakAfter: a.en };
  }
  function qPickZh(w, u) { // 聽英文選中文
    const a = W(w, u), opts = shuffle([a, ...distractors(a, ALL_WORDS, 3, near(u))]);
    return { type: 'choice', title: '這個字是什麼意思？', prompt: a.en, promptLang: 'en', audio: a.en, options: opts.map(o => ({ t: o.zh, emo: o.emo })), answer: a.zh, optLang: 'zh' };
  }
  function qListenWord(w, u) { // 聽發音選英文
    const a = W(w, u), opts = shuffle([a, ...distractors(a, ALL_WORDS, 3, near(u))]);
    return { type: 'choice', title: '仔細聽，選出你聽到的字', listen: true, audio: a.en, options: opts.map(o => ({ t: o.en })), answer: a.en, optLang: 'en' };
  }
  function qCloze(line, u) { // 對話填空
    const words = near(u), re = keywordRegex(words), m = line.en.match(re);
    if (!m) return null;
    const hit = words.find(w => w.en.toLowerCase() === m[0].toLowerCase());
    const blank = esc(line.en).replace(new RegExp(`(?<![A-Za-z-])${reEsc(esc(m[0]))}(?![A-Za-z-])`, 'i'), '<span class="blank">＿＿＿</span>');
    const opts = shuffle([hit, ...distractors(hit, ALL_WORDS, 2, words)]);
    return { type: 'choice', title: '想想對話，空格該填什麼？', clozeHtml: blank, clozeZh: line.zh, who: line.who, unit: u, options: opts.map(o => ({ t: o.en })), answer: hit.en, optLang: 'en', speakAfter: line.en, wide: true };
  }
  function qSentenceMeaning(s, u) { // 聽句子選意思
    const a = s.en ? s : L(s, u), opts = shuffle([a, ...distractors(a, ALL_SENTS, 2, quizLines(u).map(l => L(l, u)))]);
    return { type: 'choice', title: '這句話是什麼意思？', prompt: a.en, promptLang: 'en', audio: a.en, options: opts.map(o => ({ t: o.zh })), answer: a.zh, optLang: 'zh', wide: true };
  }
  const norm = t => t.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();
  function qArrange(s, u) { // 排列句子
    const a = L(s, u), tokens = a.en.split(' ');
    const inSent = new Set(tokens.map(t => norm(t)));
    const extra = shuffle(u.words.flatMap(w => w[0].split(' ')).filter(t => !inSent.has(norm(t)))).slice(0, 2);
    return { type: 'arrange', title: '把這句英文排出來', prompt: a.zh, promptLang: 'zh', tiles: shuffle([...tokens, ...extra]), answer: a.en, speakAfter: a.en };
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
  function steps(n) {
    return `<div class="steps">${['看對話', '學單字', '練習'].map((t, i) => `<span class="${i + 1 === n ? 'on' : i + 1 < n ? 'done' : ''}"><b>${i + 1 < n ? '✓' : i + 1}</b>${t}</span>`).join('')}</div>`;
  }
  function lessonTop(n) {
    return `<button class="back-pill" id="quit">${ICON.close}<span>離開</span></button>${steps(n)}`;
  }
  function bindQuit(text = '這一課的進度不會保存喔。', onOk = screenHome) {
    const ask = () => modal({ title: '確定要離開這一課嗎？', text, ok: '離開', cancel: '繼續學習', danger: true, onOk });
    $('#quit').onclick = () => { sfx.tap(); ask(); };
    onBack(ask);
  }
  const face = (who, u) => who === 'A'
    ? `<span class="face mascot-face"><img src="mascot.png" alt="浣浣"></span>`
    : `<span class="face">${u.npc.face}</span>`;
  const nameOf = (who, u) => who === 'A' ? '浣浣' : u.npc.name;

  function highlight(en, u) {
    const words = near(u), re = keywordRegex(words);
    return esc(en).replace(re, m => {
      const w = words.find(x => x.en.toLowerCase() === m.toLowerCase());
      return `<button class="kw" data-en="${esc(w.en)}" data-zh="${esc(w.zh)}" data-emo="${w.emo}">${m}</button>`;
    });
  }
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
    page({ top: lessonTop(1), cls: 'wide', body: `<div class="scene"><span class="scene-emo">${u.scene}</span><div><b>第 ${u.id} 單元 · ${esc(u.title)}</b><small>${esc(u.place)} · 浣浣和${esc(u.npc.name)}</small></div></div>
      <div class="coach story-coach"><img src="mascot.png" alt="浣浣" class="coach-img"><div class="coach-bubble">先聽聽這段對話！<small>藍色底線的字是今天的重點，點一下就能聽</small></div></div>
      <div class="chat" id="chat"></div>`,
      bottom: `<button class="btn" id="next">▶ 開始聽對話</button>
        ${mode === 'free' ? '<button class="linkish center" id="skip">我已經看過了，直接練習</button>' : ''}` });
    music.start(); bindQuit();
    const chat = $('#chat'); bindKeywords(chat);
    let shown = 0;
    const addLine = () => {
      const l = u.lines[shown], el = document.createElement('div');
      el.className = `msg ${l[0] === 'A' ? 'me' : 'them'}`;
      el.innerHTML = `${face(l[0], u)}<div class="msg-body"><small>${esc(nameOf(l[0], u))}</small>
        <div class="msg-bubble"><p class="en">${highlight(l[1], u)}</p><p class="zh">${esc(l[2])}</p>
        <button class="line-play" aria-label="再聽一次">${ICON.speaker}</button></div></div>`;
      el.querySelector('.line-play').onclick = () => { playLine(el, l[1]); };
      chat.appendChild(el); sfx.pop();
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
      playLine(el, l[1]);
      shown++;
    };
    const playLine = (el, text, onEnd) => {
      $$('.msg.speaking').forEach(x => x.classList.remove('speaking'));
      el.classList.add('speaking');
      say(text, { onEnd: () => { el.classList.remove('speaking'); onEnd && onEnd(); } });
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
        const run = () => { if (i >= els.length) return; els[i].scrollIntoView({ behavior: 'smooth', block: 'center' }); playLine(els[i], u.lines[i][1], () => setTimeout(run, 350)); i++; };
        run();
      }
    };
    const skip = $('#skip'); if (skip) skip.onclick = () => { sfx.tap(); startQuiz(u, mode); };
  }

  // ② 單字卡：一次一張，大圖示＋英文＋中文＋對話中的例句
  function screenCards(u, mode) {
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
          ${ex ? `<div class="wex"><p class="en">${highlight(ex[1], u)}</p><p class="zh">${esc(ex[2])}</p>
            <button class="line-play" id="pl" aria-label="播放例句">${ICON.speaker}</button></div>` : ''}
        </div>`;
      $$('#dots i').forEach((d, j) => { d.className = j < i ? 'done' : j === i ? 'on' : ''; });
      $('#prev').disabled = i === 0;
      $('#nextc').textContent = i === u.words.length - 1 ? '開始練習' : `下一個（${i + 1}/${u.words.length}）`;
      $('#nextc').classList.toggle('green', i === u.words.length - 1);
      $('#pw').onclick = () => { say(w.en); buzz(10); };
      const pl = $('#pl'); if (pl) pl.onclick = () => say(ex[1]);
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
      top: `<button class="back-pill" id="quit">${ICON.close}<span>離開</span></button>
        <div class="progress"><div class="bar"><i id="bar"></i></div><small id="count"></small></div>
        <span class="combo" id="combo"></span>`,
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
      const check = $('#check');
      let chosen = null;
      const play = (slow) => q.audio && say(q.audio, { slow });
      const retry = q.retry ? '<span class="again-tag">再練一次</span>' : '';

      if (q.type === 'choice') {
        const wide = q.wide || q.options.some(o => o.t.length > 13);
        let promptHtml = '';
        if (q.listen) promptHtml = `<div class="listen"><button class="play big" id="play" aria-label="播放">${ICON.speaker}</button><button class="play slow" id="slow" aria-label="慢速播放">${ICON.turtle}<small>慢速</small></button></div>`;
        else if (q.clozeHtml) promptHtml = `<div class="cloze">${face(q.who, q.unit)}<div class="msg-bubble"><p class="en">${q.clozeHtml}</p><p class="zh">${esc(q.clozeZh)}</p></div></div>`;
        else promptHtml = `<div class="prompt ${q.promptLang}">${q.emo ? `<span class="p-emo">${q.emo}</span>` : ''}${q.audio ? `<button class="play" id="play" aria-label="播放">${ICON.speaker}</button>` : ''}<span class="p-text">${esc(q.prompt)}</span></div>`;
        box.innerHTML = `${coach(q.title + retry)}${promptHtml}
          <div class="options ${wide ? 'wide' : ''}">${q.options.map((o, i) => `<button class="opt ${q.optLang}" data-i="${i}">${o.emo ? `<span class="o-emo">${o.emo}</span>` : ''}<span class="o-t">${esc(o.t)}</span></button>`).join('')}</div>`;
        $$('.opt', box).forEach(b => b.onclick = () => {
          if (answered) return;
          $$('.opt', box).forEach(x => x.classList.remove('sel')); b.classList.add('sel');
          chosen = q.options[+b.dataset.i].t; check.disabled = false; sfx.tap();
          if (q.optLang === 'en') say(chosen);
        });
        check.onclick = () => grade(q, chosen === q.answer, q.answer, $('.opt.sel', box));
      }

      if (q.type === 'arrange') {
        box.innerHTML = `${coach(q.title + retry)}
          <div class="prompt zh"><span class="p-text">${esc(q.prompt)}</span></div>
          <div class="answer-line" id="ans"></div>
          <div class="bank" id="bank">${q.tiles.map((t, i) => `<button class="tile" data-i="${i}">${esc(t)}</button>`).join('')}</div>`;
        const ans = $('#ans'), bank = $('#bank');
        const refresh = () => { check.disabled = !ans.children.length; };
        bank.onclick = e => {
          const t = e.target.closest('.tile'); if (!t || answered || t.classList.contains('used')) return;
          const c = t.cloneNode(true); c.dataset.from = t.dataset.i; t.classList.add('used'); ans.appendChild(c); sfx.tap(); refresh();
        };
        ans.onclick = e => {
          const t = e.target.closest('.tile'); if (!t || answered) return;
          bank.querySelector(`[data-i="${t.dataset.from}"]`).classList.remove('used'); t.remove(); sfx.tap(); refresh();
        };
        check.onclick = () => {
          const built = [...ans.children].map(c => c.textContent).join(' ');
          grade(q, norm(built) === norm(q.answer), q.answer, ans);
        };
      }

      if (q.type === 'match') {
        const left = shuffle(q.pairs), right = shuffle(q.pairs);
        box.innerHTML = `${coach(q.title + retry)}
          <div class="match"><div class="col">${left.map(p => `<button class="mtile en" data-k="${esc(p.en)}">${esc(p.en)}</button>`).join('')}</div>
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
      if (q.speakAfter) setTimeout(() => say(q.speakAfter), 300);
      const msg = placement ? (ok ? '答對了！' : '沒關係，繼續下一題')
        : (ok ? pick(PRAISE) : pick(COMFORT)).replaceAll('{name}', data.nickname || '');
      foot.className = `bar-bottom ${ok ? 'good' : 'bad'}`;
      foot.innerHTML = `<div class="fb"><img src="mascot.png" alt="" class="fb-mascot ${ok ? 'hop' : 'sway'}">
          <div><b>${ok ? '✓ ' : ''}${esc(msg)}</b>${!ok && answer && !placement ? `<p>正確答案：<span>${esc(answer)}</span></p>` : ''}</div></div>
        <button class="btn ${ok ? 'green' : ''}" id="cont">繼續</button>`;
      $('#cont').onclick = () => { sfx.tap(); stopVoice(); next(); };
    }

    next();
  }

  // ========== 課程完成 ==========
  function finishLesson(u, mode, res) {
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
    const missed = [...new Set(res.questions.filter((q, i) => res.firstTry[i] === false && q.type !== 'match').map(q => q.audio || q.answer))];
    const wrong = total - firstOk;
    page({ bottom: '<button class="btn" id="go">完成，回到首頁</button>',
      body: `<div class="stage">${mascot({ mood: 'joy', size: 'small' })}${bubble('line')}</div>
      <div class="stats rise late">
        <div class="stat"><small>經驗值</small><b class="c-gold">${ICON.star}+${gained}</b></div>
        <div class="stat"><small>一次答對</small><b class="c-green">${firstOk}/${total}</b></div>
        <div class="stat"><small>連續學習</small><b class="c-orange">${ICON.flame}${data.streak}天</b></div>
      </div>
      ${missed.length ? `<div class="learned rise late"><small>要再多練習的（點一下聽發音）</small><div>${missed.map(t => `<button class="chip miss" data-en="${esc(t)}">${esc(t)}</button>`).join('')}</div></div>` : ''}
      <div class="learned rise late"><small>這一課的 8 個單字（點一下聽發音）</small><div>${u.words.map(w => `<button class="chip" data-en="${esc(w[0])}">${w[2]} ${esc(w[0])}</button>`).join('')}</div></div>` });
    sfx.yay(); confetti(60); setTimeout(() => confetti(40), 500);
    $$('.chip').forEach(c => c.onclick = () => { say(c.dataset.en); buzz(10); });
    const head = `第 ${u.id} 單元「${u.title}」共 ${total} 題，`;
    let tpl = acc === 100 ? `太厲害了，{name}！${head}全部第一次就答對！`
      : wrong === 1 ? `好棒，{name}！${head}只錯了 1 題，下面有列出來，再聽一次就記住了。`
      : acc >= 60 ? `完成了，{name}！${head}第一次就答對 ${firstOk} 題，錯的 ${wrong} 題已經重新練過，下面也有列出來。`
        : `{name}，${head}第一次答對 ${firstOk} 題。建議之後到「自選課程」再上一次這個單元，會更熟喔。`;
    if (prevBest != null && firstOk > prevBest) tpl += `比上次多答對 ${firstOk - prevBest} 題，真的進步了！`;
    mascotLine($('#line'), tpl);
    $('#go').onclick = () => { sfx.tap(); screenHome(); };
    onBack(() => screenHome());
  }

  // ========== 設定 ==========
  function screenSettings() {
    const s = data.settings;
    const rates = [[0.8, '慢'], [1, '正常'], [1.15, '快']];
    page({ top: navTop('設定'), body: `<div class="list">
        <div class="item"><div class="label">暱稱<small>浣浣會這樣叫你</small></div><span class="value">${name()}</span><button class="linkish" id="rename">修改</button></div>
        <div class="item"><div class="label">重新測驗程度<small>目前每日課程在第 ${Math.min(data.dailyNext, COURSE.length)} 單元</small></div><button class="linkish" id="retest">測驗</button></div>
      </div>
      <div class="list">
        <div class="item"><div class="label">外觀<small>深色或淺色畫面</small></div><div class="seg" id="theme">${[['dark', '深色'], ['light', '淺色']].map(([t, l]) => `<button data-t="${t}" class="${s.theme === t ? 'on' : ''}">${l}</button>`).join('')}</div></div>
      </div>
      <div class="list">
        <div class="item"><div class="label">聲音<small>英文發音與浣浣說話</small></div><label class="switch"><input type="checkbox" id="voice" ${s.voice ? 'checked' : ''} aria-label="聲音"><span></span></label></div>
        <div class="item"><div class="label">朗讀速度</div><div class="seg" id="rate">${rates.map(([r, l]) => `<button data-r="${r}" class="${s.rate === r ? 'on' : ''}">${l}</button>`).join('')}</div></div>
        <div class="item"><div class="label">試聽英文發音</div><button class="linkish" id="test">播放範例</button></div>
        <div class="item"><div class="label">音效<small>答對、按鈕的提示音</small></div><label class="switch"><input type="checkbox" id="sfx" ${s.sfx ? 'checked' : ''} aria-label="音效"><span></span></label></div>
        <div class="item"><div class="label">背景音樂<small>使用 App 時的輕柔音樂</small></div><label class="switch"><input type="checkbox" id="music" ${s.music ? 'checked' : ''} aria-label="背景音樂"><span></span></label></div>
        <div class="item"><div class="label">震動回饋<small>手機答對、答錯時輕輕震動</small></div><label class="switch"><input type="checkbox" id="vib" ${s.vibrate ? 'checked' : ''} aria-label="震動回饋"><span></span></label></div>
      </div>
      <div class="list">
        <div class="item"><div class="label">清除所有資料<small>暱稱與進度都會刪除，回到第一次打開的樣子</small></div><button class="linkish red" id="reset">清除</button></div>
      </div>
      <div class="foot">簡單學英文 · 第 2 階段預覽版<br>英文發音：開源語音模型 Kokoro＋美式發音字典 · 資料只存在這台裝置的瀏覽器裡</div>` });
    $('#back').onclick = () => { sfx.tap(); screenHome(); };
    onBack(() => screenHome());
    $('#rename').onclick = () => { sfx.tap(); screenWelcome({ rename: true }); };
    $('#retest').onclick = () => { sfx.tap(); screenPlacementIntro(true); };
    $('#voice').onchange = e => { s.voice = e.target.checked; save(); if (!s.voice) stopVoice(); };
    $('#sfx').onchange = e => { s.sfx = e.target.checked; save(); sfx.tap(); };
    $('#music').onchange = e => { s.music = e.target.checked; save(); if (s.music) music.start(); else music.stop(); };
    $('#vib').onchange = e => { s.vibrate = e.target.checked; save(); buzz([30, 40, 30]); };
    $('#rate').onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      s.rate = Number(b.dataset.r); save();
      [...$('#rate').children].forEach(x => x.classList.toggle('on', x === b));
    };
    $('#theme').onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      s.theme = b.dataset.t; save(); applyTheme(); sfx.tap();
      [...$('#theme').children].forEach(x => x.classList.toggle('on', x === b));
    };
    $('#test').onclick = () => loadPack(1).then(() => say('Hello! Good morning!'));
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

  // ---------- 啟動 ----------
  if (!data.nickname) screenWelcome();
  else screenBack();

  // 開過一次後沒網路也能打開（需放在網址上才有效）
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
  }
})();
