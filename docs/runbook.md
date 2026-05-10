# Runbook — Red de Agentes de Ignacio

## Inicio rápido

```powershell
# Levantar los 3 bots
.\start_all.ps1
```

## Variables de entorno

Archivo: `discord-bot/.env`

| Variable | Descripción |
|---|---|
| `CLAUDE_IGNACIO_TOKEN` | Token del bot Discord Claude_Ignacio |
| `GPT_IGNACIO_TOKEN` | Token del bot Discord GPT_Ignacio |
| `CLAWFRANKIE_TOKEN` | Token del bot Discord ClawFrankie |
| `GITHUB_PAT` | Personal Access Token con scope `repo` |
| `GITHUB_OWNER` | `nitenacho` |
| `GITHUB_REPO` | `Red-de-agentes-de-Ignacio` |

## Comandos Discord

| Comando | Bot | Acción |
|---|---|---|
| `!ping` | Todos | Responde "activo 🟢" |
| `!muestrario texto <msg>` | Claude_Ignacio | Publica texto en la web |
| `!muestrario imagen <url>` | Claude_Ignacio | Publica imagen en la web |
| `!muestrario video <url>` | Claude_Ignacio | Publica video en la web |

## URLs

| Recurso | URL |
|---|---|
| Web MissionControl | https://nitenacho.github.io/Red-de-agentes-de-Ignacio/ |
| Muestrario | https://nitenacho.github.io/Red-de-agentes-de-Ignacio/muestrario.html |
| Diseño Mental | https://nitenacho.github.io/Red-de-agentes-de-Ignacio/mental.html |
| Repositorio | https://github.com/nitenacho/Red-de-agentes-de-Ignacio |
| Servidor Discord | https://discord.gg/3jUJW3pxN |

## Rotación de secretos

Rotar periódicamente:

1. **Tokens Discord** → discord.com/developers → aplicación → Bot → Reset Token → actualizar `.env`
2. **ANTHROPIC_API_KEY** → console.anthropic.com → API Keys
3. **OPENAI_API_KEY** → platform.openai.com → API Keys
4. **GITHUB_PAT** → github.com/settings/tokens → regenerar con scope `repo`

## Estructura del repo

```
Red-de-agentes-de-Ignacio/
├── index.html              # MissionControl dashboard
├── mental.html             # Diseño Mental + diagrama
├── muestrario.html         # Feed de contenido
├── muestrario.json         # BD del feed (actualizada por Actions)
├── start_all.ps1           # Script inicio rápido
├── assets/
│   ├── diagrama-mental.png # Diagrama generado por GPT_Ignacio
│   └── saludo-gpt.png      # Screenshot FASE 2
├── bots/                   # Bots Python (discord.py)
├── discord-bot/            # Bots Node.js (discord.js)
├── docs/
│   ├── RedDeAgentes.pptx   # Presentación del proyecto
│   ├── runbook.md          # Este archivo
│   └── gen_pptx.js         # Script generador del PPT
└── .github/workflows/
    └── muestrario.yml      # Workflow GitHub Actions
```

## Solución de problemas

| Problema | Causa probable | Solución |
|---|---|---|
| Bot no responde a `!muestrario` | `GITHUB_PAT` vacío o expirado | Regenerar PAT con scope `repo` y actualizar `.env` |
| GitHub Action falla con push rejected | Race condition entre actions | Ya corregido con `git pull --rebase` en el workflow |
| Bot offline | Token Discord expirado o revocado | Regenerar token en discord.com/developers |
| muestrario.html no actualiza | Pages en build | Esperar ~60s después del push |
