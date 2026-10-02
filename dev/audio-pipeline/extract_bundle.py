"""把 tts-studio 產生的 tts-bundle.json（檔名 → base64 mp3）解開成一個個 mp3。
用法：python3 extract_bundle.py tts-bundle.json raw/"""
import json, base64, os, sys
src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
d = json.load(open(src))
for name, b64 in d.items():
    open(os.path.join(out, name), 'wb').write(base64.b64decode(b64))
print(f'解開 {len(d)} 個檔案到 {out}')
