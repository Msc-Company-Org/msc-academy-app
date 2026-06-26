# Produção — Curso "Chatbot WhatsApp com IA"

Roteiros de produção das aulas (faceless: screencast + voz IA + animações Veo/Flow).
Cada aula é um `.md` com **roteiro AV timecodeado** pronto pra gravar/editar.

## Convenção de cada roteiro
1. **Cabeçalho** — módulo, aula, objetivo, duração-alvo, voz, paleta.
2. **Timeline resumida** — visão geral dos blocos.
3. **Roteiro detalhado** — por beat, com timecode e as 5 camadas:
   - **Narração (TTS)** — texto EXATO, já normalizado pra voz (sem dígitos/siglas cruas).
   - **Tela / Visual** — o que aparece (screencast, slide, chat-mock).
   - **Animação (Veo/Flow)** — quando houver, com prompt pronto.
   - **SFX / Música** — efeitos e trilha.
   - **Edição** — corte, zoom, legenda, realce.
4. **Narração corrida (TTS-ready)** — bloco único pra jogar no TTS.
5. **Assets a produzir** — checklist de gravação/geração.
6. **Teste de voz** — trecho-padrão p/ comparar ElevenLabs × Chatterbox.

## Identidade
- Paleta **Tinta Floresta** (mesma da landing): sand `#FAF7F0`, ink `#163300`, citrus `#9FE870`, amber `#FF4F40`.
- Fontes: **Fraunces** (títulos) + **Inter** (texto/legenda).
- Voz única em todas as aulas (mesma `REF`/voz fixa) · legenda sempre ligada (retenção mobile).

## Stack
Tela: **OBS** (1080p/30fps, cursor destacado) · Edição: **CapCut/Descript** (legenda auto) ·
Voz: **ElevenLabs** (a definir) ou **Chatterbox MIT** (Colab) · Animação: **Veo 3.1 + Flow**.

## Normalização pra TTS (sempre)
Número/sigla/símbolo viram texto falado **antes** de gerar a voz:
`R$ 697` → "seiscentos e noventa e sete reais" · `24h` → "vinte e quatro horas" ·
`API` → "A-P-I" · `2026` → "dois mil e vinte e seis" · `WhatsApp` → ok como está.
