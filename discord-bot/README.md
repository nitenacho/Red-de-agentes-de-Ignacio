# Discord Bots — Red de Agentes de Ignacio

Bots Node.js para la red de agentes. Complementan los bots Python en `/bots/`.

## Requisitos

- Node.js v18+
- npm

## Setup

```bash
cd discord-bot
npm install
cp .env.example .env   # editar con los tokens reales
```

## Variables de entorno (.env)

| Variable | Descripción |
|---|---|
| `CLAUDE_IGNACIO_TOKEN` | Token del bot Claude_Ignacio (App ID 1503099984638378034) |
| `GPT_IGNACIO_TOKEN` | Token del bot GPT_Ignacio (App ID 1503098439356125285) |
| `CLAWFRANKIE_TOKEN` | Token del bot ClawFrankie (App ID 1502878620815851751) |
| `GITHUB_PAT` | Personal Access Token con scope `repo` para repo_dispatch |
| `GITHUB_OWNER` | `nitenacho` |
| `GITHUB_REPO` | `Red-de-agentes-de-Ignacio` |

## Ejecutar

```bash
# Un bot a la vez
npm run claude   # Claude_Ignacio
npm run gpt      # GPT_Ignacio
npm run claw     # ClawFrankie

# Los tres a la vez (PowerShell)
Start-Process node -ArgumentList "claude-ignacio.js"
Start-Process node -ArgumentList "gpt-ignacio.js"
Start-Process node -ArgumentList "clawfrankie.js"
```

## Comandos disponibles

| Comando | Bot | Acción |
|---|---|---|
| `!ping` | Todos | Responde "X activo 🟢" |
| `!muestrario texto <texto>` | Claude_Ignacio | Publica texto en muestrario.html via GitHub Actions |
| `!muestrario imagen <url>` | Claude_Ignacio | Publica imagen en muestrario.html |
| `!muestrario video <url>` | Claude_Ignacio | Publica video en muestrario.html |
| `@Claude_Ignacio` | Claude_Ignacio | Muestra ayuda |

## URLs OAuth para invitar los bots al servidor

- **Claude_Ignacio:** https://discord.com/oauth2/authorize?client_id=1503099984638378034&scope=bot+applications.commands&permissions=274877990400
- **GPT_Ignacio:** https://discord.com/oauth2/authorize?client_id=1503098439356125285&scope=bot+applications.commands&permissions=274877990400
- **ClawFrankie:** https://discord.com/oauth2/authorize?client_id=1502878620815851751&scope=bot+applications.commands&permissions=274877990400

## Hosting permanente

Para mantener los bots 24/7 sin depender de tu PC:

| Plataforma | Plan gratuito | Pasos |
|---|---|---|
| **Railway** | 500h/mes | `railway login && railway up` |
| **Render** | Background Worker | Deploy desde GitHub repo |
| **Replit** | Always-on (Hacker plan) | Fork, importar archivos, configurar Secrets |

## GITHUB_PAT — Configuración

1. Ve a https://github.com/settings/tokens/new
2. Scope: `repo` (acceso completo al repositorio)
3. Copia el token generado
4. Pégalo en `.env` como `GITHUB_PAT=<token>`
