#!/usr/bin/env bash
# Gera a narração de uma aula com edge-tts (Thalita, calmo) + legenda SRT.
# RASCUNHO/PILOTO: edge-tts é grátis mas licença CINZA — não usar no render final pago.
# RENDER FINAL (comercial): trocar por Azure Speech (mesma voz pt-BR-ThalitaMultilingualNeural,
# free tier 0,5M/mês, licença limpa) — ver gen-narracao-azure.sh quando a chave estiver no cofre.
#
# Uso: bash scripts/gen-narracao.sh 01
set -euo pipefail
N="${1:?informe o numero da aula, ex: 01}"
VOICE="${VOICE:-pt-BR-ThalitaMultilingualNeural}"
RATE="${RATE:--8%}"
DIR="$(cd "$(dirname "$0")/.." && pwd)"
IN="$DIR/narracao/aula-$N.txt"
OUT="$DIR/_audio"; mkdir -p "$OUT"
[ -f "$IN" ] || { echo "nao achei $IN"; exit 1; }
echo "Gerando aula $N (voz=$VOICE rate=$RATE)..."
uv run --with edge-tts edge-tts --voice "$VOICE" --rate="$RATE" --file "$IN" \
  --write-media "$OUT/aula-$N.mp3" --write-subtitles "$OUT/aula-$N.srt"
# masteriza nivel pra -16 LUFS (padrao de curso) se houver ffmpeg
if command -v ffmpeg >/dev/null; then
  ffmpeg -y -i "$OUT/aula-$N.mp3" -af "loudnorm=I=-16:TP=-1.5:LRA=11" -b:a 160k "$OUT/aula-$N-master.mp3" 2>/dev/null \
    && echo "master -16 LUFS: $OUT/aula-$N-master.mp3"
fi
echo "OK: $OUT/aula-$N.mp3 (+ .srt)"
