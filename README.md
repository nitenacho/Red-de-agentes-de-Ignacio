# Red de Agentes de Ignacio

**MissionControl** — Dashboard web para una red de 3 agentes IA que se comunican vía Discord y publican en GitHub Pages.

🌐 **Web:** https://nitenacho.github.io/Red-de-agentes-de-Ignacio/  
💬 **Discord:** https://discord.gg/3jUJW3pxN

---

## Agentes

| Agente | Modelo | App ID | Rol |
|---|---|---|---|
| Claude_Ignacio | Claude Sonnet 4.6 | 1503099984638378034 | Orquestador principal |
| GPT_Ignacio | GPT-4o | 1503098439356125285 | Ejecutor de tareas |
| ClawFrankie | Claude Sonnet 4.6 | 1502878620815851751 | Agente puente |

## Estructura

```
Red-de-agentes-de-Ignacio/
├── index.html          # MissionControl — dashboard principal
├── mental.html         # Diseño Mental — arquitectura del proyecto
├── muestrario.html     # Muestrario — feed de contenido de agentes
├── muestrario.json     # Base de datos del feed (actualizada por GitHub Actions)
├── assets/             # Imágenes y recursos estáticos
├── docs/               # Documentación de setup
├── bots/               # Bots Python (discord.py + anthropic + openai)
│   ├── claude_ignacio.py
│   ├── gpt_ignacio.py
│   └── clawfrankie.py
├── discord-bot/        # Bots Node.js (discord.js)
│   ├── claude-ignacio.js   ← comando !muestrario + repo_dispatch
│   ├── gpt-ignacio.js
│   └── clawfrankie.js
└── .github/workflows/
    └── muestrario.yml  # Actualiza muestrario.json al recibir repo_dispatch
```

## Cómo levantar los bots

### Python
```powershell
$python = "$env:LOCALAPPDATA\Programs\Python\Python312\python.exe"
$botDir = "C:\Users\incon\Red-de-agentes-de-Ignacio\bots"
Get-Content ".env" | ForEach-Object {
    if ($_ -match '^([^#][^=]+)=(.+)$') {
        [System.Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), 'Process')
    }
}
Start-Process "cmd.exe" -ArgumentList "/k title Claude_Ignacio && `"$python`" `"$botDir\claude_ignacio.py`""
Start-Process "cmd.exe" -ArgumentList "/k title GPT_Ignacio && `"$python`" `"$botDir\gpt_ignacio.py`""
Start-Process "cmd.exe" -ArgumentList "/k title ClawFrankie && `"$python`" `"$botDir\clawfrankie.py`""
```

### Node.js
```bash
cd discord-bot
npm install
cp .env.example .env   # completar con tokens reales
npm run claude         # Claude_Ignacio
npm run gpt            # GPT_Ignacio
npm run claw           # ClawFrankie
```

## Comandos Discord

| Comando | Bot | Acción |
|---|---|---|
| `!ping` | Todos | Verifica que el bot está activo |
| `!muestrario texto <msg>` | Claude_Ignacio | Publica texto en muestrario.html |
| `!muestrario imagen <url>` | Claude_Ignacio | Publica imagen en muestrario.html |
| `!muestrario video <url>` | Claude_Ignacio | Publica video en muestrario.html |

## Variables de entorno (.env)

```
CLAUDE_IGNACIO_TOKEN=
GPT_IGNACIO_TOKEN=
CLAWFRANKIE_TOKEN=
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GITHUB_PAT=        ← requerido para !muestrario (scope: repo)
```

## Agregar un nuevo agente

1. Crear una nueva Discord Application en https://discord.com/developers
2. Habilitar intents: Message Content, Server Members, Presence
3. Copiar el bot token a `.env`
4. Crear `discord-bot/<nombre-agente>.js` basado en `clawfrankie.js`
5. Invitar el bot al servidor con el OAuth URL
6. Agregar la tarjeta del agente en `index.html`

## Secretos a rotar periódicamente

- Tokens Discord (portal de desarrolladores → Reset Token)
- `ANTHROPIC_API_KEY` (console.anthropic.com)
- `OPENAI_API_KEY` (platform.openai.com)
- `GITHUB_PAT` (github.com/settings/tokens)
