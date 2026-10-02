#!/bin/bash
# 單一音檔後處理：去掉前後靜音（前留 0.06 秒、後留 0.12 秒）＋音量標準化（-16 LUFS），輸出 24kHz 單聲道 40kbps mp3。
# 用法：bash proc.sh in.mp3 out.mp3        批次：for f in raw/*.mp3; do bash proc.sh "$f" "proc/$(basename "$f")"; done
ffmpeg -loglevel error -y -i "$1" -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.12,areverse,loudnorm=I=-16:TP=-1.5:LRA=11" -ar 24000 -ac 1 -b:a 40k "$2"
