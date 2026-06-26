# Aula 1 — Brief das animações (Flow + Veo 3.1)

> **Ferramenta:** Google **Flow** (já no seu plano) gerando com **Veo 3.1**. Veo NÃO existe no OpenRouter (só LLM) nem no HF (lá há outros modelos de vídeo open). Rota de qualidade = Flow/Veo.
> **Regras gerais (valem pros 3 clipes):** 16:9 · **paleta Tinta Floresta** (forest `#163300`, cream `#FAF7F0`, lime `#9FE870`, coral `#FF4F40`, sage `#5C6B3C`) · estilo **editorial premium, minimalista, 2.5D** · **SEM texto/legenda na imagem** (a gente sobrepõe o nosso) · **sem rostos realistas, sem neon/cyberpunk** · **mute o áudio do Veo** na edição (usamos a narração Thalita + SFX).
> **Consistência:** no Flow, gere o **clipe 1 primeiro**, salve um frame como **"ingredient"/referência de estilo** e use nos clipes 2 e 3 pra manter a mesma cara. Gere na qualidade máxima e baixe em 1080p.

---

## 🎬 Clipe 1 — Cold open (6s) · entra em 0:00
**Prompt (cole no Flow / Veo, EN rende melhor):**
> Cinematic motion graphic, 16:9. A dark deep-forest-green screen (#163300). Clean rounded cream-colored chat bubbles (#FAF7F0) pop in one after another from the bottom; each is instantly answered by a glowing lime-green reply bubble (#9FE870) with soft double-check marks. The bubbles contain only abstract placeholder lines — no readable text. Subtle floating particles and soft glow, shallow depth of field, slow gentle upward camera drift. Warm, premium, optimistic, minimalist editorial style. Soft ambient whoosh and delicate pop sounds, no music, no voice.

**Negative:** readable text, letters, logos, human faces, clutter, harsh neon, cyberpunk, 3D realism.
**Câmera:** drift lento pra cima. **Duração:** 6s. **Uso:** abre a aula; texto-kicker "ATENDE SOZINHO · 24h" entra por cima na edição.

---

## 🎬 Clipe 2 — "Funcionário 24h" (10s) · entra em 0:29 (analogia)
**Prompt:**
> Warm 2.5D animated scene, 16:9. A friendly, faceless minimalist assistant character made of simple rounded shapes (cream and forest-green) sits inside a large WhatsApp-style chat bubble, calmly and quickly replying to several floating customer message bubbles around it at the same time. Behind it, a wall clock's hands spin fast from midday to 3 AM and a window shows the sky shifting to night, while the assistant keeps working, unbothered and content. Palette: forest-green #163300, cream #FAF7F0, lime-green #9FE870 accents. Soft editorial illustration style, gentle camera push-in, cozy reassuring competent mood. Subtle ambient room tone and soft ticks, no dialogue, no music.

**Negative:** readable text, creepy or realistic faces, neon, photorealism, brand logos, busy background.
**Câmera:** push-in suave. **Duração:** 10s. **Uso:** ilustra "um atendente que trabalha 24h por você"; **"ding" do SFX em ~0:50** (quando a narração diz "vinte e quatro horas").

---

## 🎬 Clipe 3 — Vinheta abertura/fecho (5s) · reutilizável (entra no fecho ~3:54)
**Prompt:**
> Elegant minimalist brand sting, 16:9, warm cream background (#FAF7F0). A simple geometric mark — an abstract upward chevron/mountain in deep forest-green (#163300) with a small lime-green bar (#9FE870) and a single coral dot (#FF4F40) — draws itself with smooth confident motion and settles in the center as a soft light sweep passes across. Refined editorial premium aesthetic, subtle film grain, slow elegant motion. A single soft whoosh and a gentle resolving chime, no voice. Keep the lower third clear for a title overlay.

**Negative:** text, extra logos, busy background, neon, fast cuts.
**Câmera:** estática com leve sweep de luz. **Duração:** 5s. **Uso:** vinheta de abertura (e invertida no fecho); o título "Aula 2 — Seu primeiro bot no ar" entra por cima.

---

## Passo a passo no Flow
1. Novo projeto → aspecto **16:9** → modelo **Veo 3.1** (qualidade alta).
2. Cola o **Prompt** do clipe + o **Negative**. (Opcional: gere uma imagem-base no Imagen com a mesma descrição e use como **primeiro frame** → mais controle.)
3. Gere 2–3 variações, escolha a melhor, **baixe em 1080p**.
4. Repete pros 3 clipes usando o **mesmo frame de referência** (consistência de estilo).
5. Na edição: **muta o áudio do Veo**, encaixa nos timecodes do `aula-01-montagem.md`, põe os SFX nossos.

## Se quiser rota grátis (sem Google) — fallback HF
Modelos de vídeo open no Hugging Face (Spaces grátis): **Wan 2.2**, **LTX-Video**, **CogVideoX**. Eu adapto estes mesmos prompts pra eles e posso gerar via Space anônimo (como fiz com a voz). ⚠️ Clipes mais curtos (~4-5s), fidelidade menor que o Veo — serve pra abstrato/motion, não pro nível do Veo. **OpenRouter não gera vídeo** (só texto), então não entra.
