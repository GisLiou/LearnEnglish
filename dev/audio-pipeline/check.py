"""自動檢查 Gemini-TTS 音檔（Gemini 偶爾會把同一句唸 2～3 次、或拖得很長）。
用法：python3 check.py raw/ ../../tools/tts-jobs.js   → 印出可疑清單，並寫出 check.json、redo.json
需要：ffmpeg、numpy、librosa（pip install librosa --break-system-packages）
判斷依據（2026-10 實測校準）：
  - 長度：單字 > 3.3 秒；對話句 > 1.2 + 1.15×字數 (+0.8)；中文 > 2 + 0.35×字數
  - 語速：對話句「有聲時間 / 母音群數」≥ 0.82（教學慢速版的基準；自然語速版應明顯更低）
  - 重複：MFCC 子序列 DTW，前段在後段再出現一次 → 分數低。正常句 ≥ 0.43，重複句 ≤ 0.25
  - 多段：單字出現兩段以上有聲區且有聲時間 > 1.4 秒
  分數只是篩選，可疑的再用分段資訊或試聽確認（短單字如 summer/looking 曾被誤判）。"""
import json, re, sys, os, subprocess, warnings
import numpy as np
warnings.filterwarnings('ignore')
import librosa

def load16(f):
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768

def segments(x, sr=16000):
    h = int(sr * 0.02); e = np.array([np.sqrt((x[i:i + h] ** 2).mean()) for i in range(0, len(x) - h, h)])
    if len(e) == 0 or e.max() == 0: return [], len(x) / sr
    act = e > max(e.max() * 0.05, 0.003); out = []; i = 0
    while i < len(act):
        if act[i]:
            j = i
            while j < len(act) and act[j]: j += 1
            out.append([i, j]); i = j
        else: i += 1
    m = []
    for s in out:
        if m and s[0] - m[-1][1] < 18: m[-1][1] = s[1]
        else: m.append(s)
    return [(a * 0.02, b * 0.02) for a, b in m if b - a >= 3], len(x) / sr

def repeat_score(x, sr=16000):
    m = librosa.feature.mfcc(y=x, sr=sr, n_mfcc=20, hop_length=160, n_fft=400)[1:]
    e = librosa.feature.rms(y=x, hop_length=160, frame_length=400)[0]
    n = min(m.shape[1], len(e)); m = m[:, :n]; e = e[:n]
    v = m[:, e > max(e.max() * 0.05, 1e-4)]; v = v - v.mean(1, keepdims=True); N = v.shape[1]
    if N < 30: return 9.0
    best = 9.0
    for s in range(int(N * 0.25), int(N * 0.55) + 1, max(1, N // 40)):
        D, _ = librosa.sequence.dtw(X=v[:, :s], Y=v[:, s:], subseq=True, metric='cosine')
        best = min(best, D[-1, :].min() / s)
    return float(best)

def jobs_from(js):
    out = subprocess.run(['node', '-e', f"global.window={{}};require({json.dumps(os.path.abspath(js))});console.log(JSON.stringify(window.TTS_JOBS))"], capture_output=True, text=True).stdout
    return {j['f']: j for j in json.loads(out)}

if __name__ == '__main__':
    d, jobs = sys.argv[1], jobs_from(sys.argv[2])
    res, bad = [], []
    for f, j in jobs.items():
        p = os.path.join(d, f)
        if not os.path.exists(p) or os.path.getsize(p) < 1000:
            bad.append(f); print('缺檔', f); continue
        x = load16(p); segs, tot = segments(x); act = sum(b - a for a, b in segs)
        t, k = j['t'], j['k']; n = max(1, len(re.findall(r"[A-Za-z']+", t)))
        syl = max(1, len(re.findall(r'[aeiouy]+', t.lower()))); rate = act / syl
        rep = repeat_score(x) if k != 'zh' else 9.0
        r = []
        if k == 'word':
            if tot > 3.3: r.append('過長')
            if len(segs) > 1 and act > 1.4: r.append('多段')
            if rep < 0.2 and tot > 2.6: r.append('重複?')
        elif k == 'line':
            lim = 1.2 + 1.15 * n
            if rate >= 0.82: r.append('過慢')
            if rep < 0.27 and (rate >= 0.62 or tot > lim): r.append('重複?')
            if tot > lim + 0.8: r.append('過長')
        else:
            if tot > 2 + 0.35 * len(t): r.append('過長')
        e = dict(f=f, t=t, k=k, tot=round(tot, 2), act=round(act, 2), nseg=len(segs), rate=round(rate, 2), rep=round(rep, 3), flags=r)
        res.append(e)
        if r: bad.append(f); print(' / '.join(r), f, e['tot'], '秒', 'segs', [(round(a, 2), round(b, 2)) for a, b in segs])
    json.dump(res, open('check.json', 'w'), ensure_ascii=False)
    json.dump(sorted(bad), open('redo.json', 'w'))
    print(f'共 {len(jobs)} 個，可疑 {len(bad)} 個 → redo.json')
