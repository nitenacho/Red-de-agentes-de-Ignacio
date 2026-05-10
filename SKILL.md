# SKILL — Red de Agentes IA
### Patrón reutilizable · Claude · ChatGPT · Gemini

> **Cómo importar esta skill en cada IA**
> - **Claude Code** : coloca este archivo en `~/.claude/skills/` e invoca con `/red-de-agentes`
> - **ChatGPT**     : pega el contenido de este archivo en las instrucciones de sistema de un Custom GPT
> - **Gemini**      : crea un Gem nuevo y pega este contenido como instrucciones base
> - **Cualquier IA**: adjunta este archivo como contexto al inicio de la conversación

---

## 1 · Qué construye este patrón

Una **red de 3 agentes IA** que se comunican via Discord y publican contenido en una web pública:

```
[Agente Principal]  ──►  Discord  ──►  GitHub Actions  ──►  GitHub Pages
[Agente GPT      ]  ──►    │                                      │
[Agente Puente   ]  ──►    │                                      │
                           └──── muestrario.json ◄────────────────┘
```

| Componente       | Tecnología              | Función                                 |
|------------------|-------------------------|-----------------------------------------|
| Agente Principal | Claude Sonnet (bot JS)  | Orquestador, ejecuta !muestrario        |
| Agente GPT       | GPT-4o (ChatGPT project)| Ejecutor de tareas, genera imágenes     |
| Agente Puente    | Claude Sonnet (bot JS)  | Bridge, árbitro, relay                  |
| Comunicación     | Discord.js v14          | Canal de comandos entre agentes         |
| Persistencia     | GitHub Actions + JSON   | Actualiza la web automáticamente        |
| Web pública      | GitHub Pages (HTML/JS)  | Dashboard + feed de contenido           |

---

## 2 · Variables del proyecto (rellenar antes de ejecutar)

```
NOMBRE_PROYECTO    = RedDeAgentes-[TuNombre]
GITHUB_USER        = [tu-usuario-github]
AGENTE_PRINCIPAL   = Claude_[TuNombre]
AGENTE_GPT         = GPT_[TuNombre]
AGENTE_PUENTE      = [NombreTercerBot]
DISCORD_SERVER_URL = https://discord.gg/[invite]
ANTHROPIC_API_KEY  = sk-ant-...
OPENAI_API_KEY     = sk-...
GITHUB_PAT         = (obtener con: gh auth token)
```

---

## 3 · Prerequisitos

### Cuentas
- **GitHub** — usuario + repo público + GitHub Pages habilitado
- **Discord** — cuenta + servidor propio (para invitar los 3 bots)
- **ChatGPT Plus** — para que GPT-4o asuma la identidad del Agente GPT
- **Anthropic API** — para Claude en los bots

### Herramientas locales
```bash
node --version    # 18+
npm --version     # 9+
python --version  # 3.10+
git --version     # cualquiera reciente
gh --version      # GitHub CLI — github.com/cli/cli
```

---

## 4 · Fases de construcción

### FASE 0 — Setup
```bash
# Verificar herramientas
node --version && npm --version && python --version && git --version && gh --version

# Autenticar gh CLI (si no está autenticado)
gh auth login
```

---

### FASE 1 — Identidad del Agente GPT en ChatGPT Desktop
1. Abrir ChatGPT Desktop o chatgpt.com
2. Crear Proyecto → nombre: `NOMBRE_PROYECTO`
3. Instrucciones de sistema del proyecto:
```
Eres AGENTE_GPT, agente IA del proyecto NOMBRE_PROYECTO.
Tu rol es ejecutar tareas que encomiende AGENTE_PRINCIPAL.
Cuando recibas el saludo de activación, responde exactamente: "AGENTE_GPT listo"
```
4. Enviar el saludo de activación:
```
Hola, soy AGENTE_PRINCIPAL. A partir de ahora eres AGENTE_GPT.
Confirma respondiendo exactamente: "AGENTE_GPT listo"
```
5. Capturar screenshot → guardar en `assets/saludo-gpt.png`

---

### FASE 2 — Crear 3 Discord Applications
Para cada agente en https://discord.com/developers/applications:
1. New Application → nombre del agente
2. Bot → Enable → Reset Token → **guardar el token**
3. Privileged Gateway Intents: ✅ Message Content, ✅ Server Members, ✅ Presence
4. OAuth2 → URL Generator → scope: `bot` → permissions: `274877908992`
5. Copiar la URL generada → abrir en navegador → invitar al servidor

---

### FASE 3 — Repositorio GitHub + Pages
```bash
gh repo create NOMBRE_PROYECTO --public --clone
cd NOMBRE_PROYECTO
echo "[]" > muestrario.json
git add . && git commit -m "init" && git push origin main

# Activar GitHub Pages: Settings → Pages → Branch: main → / (root) → Save
```

---

### FASE 4 — Web: index.html + mental.html + muestrario.html

#### index.html — Dashboard MissionControl
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>NOMBRE_PROYECTO — MissionControl</title>
  <style>
    /* Paleta dark/neon */
    :root {
      --bg: #060a10; --surface: #0d1520; --border: #1a2540;
      --neon: #818cf8; --green: #34d399; --amber: #f59e0b;
      --text: #e2e8f0; --muted: #64748b;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: var(--bg); color: var(--text); }
    header { padding: 1.5rem 2rem; border-bottom: 1px solid var(--border);
             display: flex; justify-content: space-between; align-items: center; }
    .agents { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
              max-width: 900px; margin: 3rem auto; padding: 0 2rem; }
    .card { background: var(--surface); border: 1px solid var(--border);
            border-radius: 12px; padding: 1.5rem; border-top: 3px solid var(--neon); }
    .card.gpt { border-top-color: var(--green); }
    .card.bridge { border-top-color: var(--amber); }
  </style>
</head>
<body>
  <header>
    <h1>⬡ NOMBRE_PROYECTO</h1>
    <nav>
      <a href="mental.html">Diseño Mental</a>
      <a href="muestrario.html">Muestrario</a>
    </nav>
  </header>
  <div class="agents">
    <div class="card">
      <h2>AGENTE_PRINCIPAL</h2>
      <p>Orquestador · Claude Sonnet</p>
    </div>
    <div class="card gpt">
      <h2>AGENTE_GPT</h2>
      <p>Ejecutor · GPT-4o</p>
    </div>
    <div class="card bridge">
      <h2>AGENTE_PUENTE</h2>
      <p>Bridge · Claude Sonnet</p>
    </div>
  </div>
  <script>
    // Reloj en vivo
    setInterval(() => {
      document.querySelector('header h1').setAttribute('data-time', new Date().toLocaleTimeString());
    }, 1000);
  </script>
</body>
</html>
```

#### muestrario.html — Feed dinámico
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>Muestrario — NOMBRE_PROYECTO</title>
  <style>
    :root { --bg:#060a10; --surface:#0d1520; --border:#1a2540; --text:#e2e8f0; --muted:#64748b; }
    body { font-family: system-ui; background: var(--bg); color: var(--text); }
    main { max-width: 720px; margin: 3rem auto; padding: 0 1.5rem; }
    .item { background: var(--surface); border: 1px solid var(--border);
            border-radius: 10px; padding: 1.25rem; margin-bottom: 1rem; }
    .meta { font-size: .75rem; color: var(--muted); margin-bottom: .5rem; }
    .tipo { padding: .15rem .5rem; border-radius: 4px; font-size: .7rem;
            background: rgba(129,140,248,.15); color: #818cf8; }
    img { max-width: 100%; border-radius: 8px; margin-top: .5rem; }
    video, iframe { width: 100%; border-radius: 8px; margin-top: .5rem; }
  </style>
</head>
<body>
<main>
  <h1>Muestrario</h1>
  <p id="empty" style="color:var(--muted);margin-top:2rem">Sin entradas aún.</p>
  <div id="feed"></div>
</main>
<script>
  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  async function load() {
    const data = await fetch('muestrario.json?t=' + Date.now()).then(r => r.json());
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    if (!data.length) return;
    document.getElementById('empty').style.display = 'none';
    [...data].reverse().forEach(e => {
      const d = document.createElement('div');
      d.className = 'item';
      const ts = e.ts > 1e9 ? new Date(e.ts * 1000).toLocaleString() : '—';
      let body = '';
      if (e.tipo === 'texto')  body = `<p>${esc(e.contenido)}</p>`;
      if (e.tipo === 'imagen') body = `<img src="${esc(e.contenido)}" alt="imagen"/>`;
      if (e.tipo === 'video')  {
        const yt = e.contenido.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
        body = yt
          ? `<iframe src="https://www.youtube.com/embed/${yt[1]}" frameborder="0" allowfullscreen></iframe>`
          : `<video src="${esc(e.contenido)}" controls></video>`;
      }
      d.innerHTML = `<div class="meta"><span class="tipo">${esc(e.tipo)}</span> ${esc(e.autor)} · ${ts}</div>${body}`;
      feed.appendChild(d);
    });
  }
  load();
</script>
</body>
</html>
```

---

### FASE 5 — Bots Node.js

#### discord-bot/package.json
```json
{
  "name": "discord-bots",
  "version": "1.0.0",
  "type": "commonjs",
  "scripts": {
    "principal": "node agente-principal.js",
    "gpt":       "node agente-gpt.js",
    "puente":    "node agente-puente.js"
  },
  "dependencies": {
    "discord.js": "^14.16.0",
    "dotenv":     "^16.4.0",
    "node-fetch": "^3.3.2"
  }
}
```

#### discord-bot/.env.example
```
AGENTE_PRINCIPAL_TOKEN=
AGENTE_GPT_TOKEN=
AGENTE_PUENTE_TOKEN=
GITHUB_PAT=
GITHUB_OWNER=tu-usuario-github
GITHUB_REPO=NOMBRE_PROYECTO
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
```

#### discord-bot/agente-principal.js — Bot orquestador con !muestrario
```javascript
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fetch = (...a) => import('node-fetch').then(({ default: f }) => f(...a));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

client.once('ready', () => console.log(`AGENTE_PRINCIPAL conectado como ${client.user.tag}`));

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;

  if (msg.content === '!ping') {
    return msg.reply('AGENTE_PRINCIPAL activo 🟢');
  }

  if (msg.content.startsWith('!muestrario')) {
    const parts = msg.content.split(' ');
    const tipo = parts[1]; // texto | imagen | video
    const contenido = parts.slice(2).join(' ');

    if (!['texto', 'imagen', 'video'].includes(tipo) || !contenido) {
      return msg.reply('Uso: `!muestrario [texto|imagen|video] <contenido>`');
    }

    try {
      const res = await fetch(
        `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/dispatches`,
        {
          method: 'POST',
          headers: {
            Authorization: `token ${process.env.GITHUB_PAT}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_type: 'muestrario',
            client_payload: {
              tipo,
              contenido,
              autor: 'AGENTE_PRINCIPAL',
              ts: Math.floor(Date.now() / 1000),
            },
          }),
        }
      );
      if (res.status === 204) {
        msg.reply(`✅ ${tipo} publicado en el muestrario.`);
      } else {
        msg.reply(`❌ Error al publicar (status ${res.status}). ¿Tienes el GITHUB_PAT con scope repo?`);
      }
    } catch (e) {
      msg.reply(`❌ Error: ${e.message}`);
    }
  }
});

client.login(process.env.AGENTE_PRINCIPAL_TOKEN);
```

#### discord-bot/agente-gpt.js y agente-puente.js — Bots simples
```javascript
// Reemplaza AGENTE_GPT / AGENTE_PUENTE y el TOKEN correspondiente
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const NOMBRE = 'AGENTE_GPT'; // o AGENTE_PUENTE
const TOKEN_KEY = 'AGENTE_GPT_TOKEN'; // o AGENTE_PUENTE_TOKEN

client.once('ready', () => console.log(`${NOMBRE} conectado como ${client.user.tag}`));

client.on('messageCreate', (msg) => {
  if (msg.author.bot) return;
  if (msg.content === '!ping') msg.reply(`${NOMBRE} activo 🟢`);
  if (msg.mentions.has(client.user)) msg.reply(`Soy ${NOMBRE}. ¿En qué puedo ayudar?`);
});

client.login(process.env[TOKEN_KEY]);
```

---

### FASE 6 — GitHub Actions Workflow

#### .github/workflows/muestrario.yml
```yaml
name: Actualizar Muestrario

on:
  repository_dispatch:
    types: [muestrario]

jobs:
  update:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4

      - name: Agregar entrada
        run: |
          python3 - <<'PYEOF'
          import json, os

          payload = {
            "tipo":      os.environ.get("TIPO", "texto"),
            "contenido": os.environ.get("CONTENIDO", ""),
            "autor":     os.environ.get("AUTOR", "agente"),
            "ts":        int(os.environ.get("TS", "0"))
          }

          with open("muestrario.json", "r") as f:
              data = json.load(f)
          data.append(payload)
          data = data[-100:]   # Máximo 100 entradas
          with open("muestrario.json", "w") as f:
              json.dump(data, f, ensure_ascii=False, indent=2)
          PYEOF
        env:
          TIPO:      ${{ github.event.client_payload.tipo }}
          CONTENIDO: ${{ github.event.client_payload.contenido }}
          AUTOR:     ${{ github.event.client_payload.autor }}
          TS:        ${{ github.event.client_payload.ts }}

      - name: Commit y push
        run: |
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add muestrario.json
          git diff --cached --quiet || \
            git commit -m "muestrario: [${{ github.event.client_payload.tipo }}] por ${{ github.event.client_payload.autor }}"
          git pull --rebase origin main
          git push
```

> **Nota importante**: `git pull --rebase` antes de `git push` previene race conditions cuando múltiples dispatches llegan simultáneamente.

---

### FASE 7 — Documentación y PPT

#### Obtener diagrama de arquitectura via GPT
Prompt para enviar al Agente GPT en ChatGPT:
```
Genera una imagen de diagrama de arquitectura para NOMBRE_PROYECTO.
Muestra: 3 nodos de agentes (AGENTE_PRINCIPAL en morado, AGENTE_GPT en verde,
AGENTE_PUENTE en amarillo) conectados con flechas a un servidor Discord central,
y una flecha de Discord hacia GitHub Pages. Estilo dark/tech, fondo #060a10, iconos neon.
```
Guardar como `assets/diagrama-mental.png`.

#### Generar PPT con pptxgenjs
```bash
cd docs && npm init -y && npm install pptxgenjs
node gen_pptx.js
```
Ver template en `template/docs/gen_pptx.js` de este repositorio.

---

### FASE 8 — Script de inicio

#### start_all.ps1 (Windows)
```powershell
$botDir = "RUTA_COMPLETA\discord-bot"
if (-not (Test-Path "$botDir\.env")) { Write-Error ".env no encontrado"; exit 1 }
Start-Process "cmd.exe" -ArgumentList "/k title AGENTE_PRINCIPAL && cd /d `"$botDir`" && npm run principal"
Start-Sleep -Milliseconds 500
Start-Process "cmd.exe" -ArgumentList "/k title AGENTE_GPT && cd /d `"$botDir`" && npm run gpt"
Start-Sleep -Milliseconds 500
Start-Process "cmd.exe" -ArgumentList "/k title AGENTE_PUENTE && cd /d `"$botDir`" && npm run puente"
Write-Host "3 bots lanzados" -ForegroundColor Green
```

#### start_all.sh (Mac / Linux)
```bash
#!/bin/bash
cd "$(dirname "$0")/discord-bot"
[ -f .env ] || { echo ".env no encontrado"; exit 1; }
npm run principal &
sleep 0.5
npm run gpt &
sleep 0.5
npm run puente &
echo "3 bots lanzados"
```

---

### FASE 9 — Pruebas E2E

#### Test via GitHub API (sin necesitar Discord abierto)
```powershell
# Windows PowerShell
$token = gh auth token    # Requiere: gh auth login
$ts = [int][DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$owner = "GITHUB_USER"
$repo  = "NOMBRE_PROYECTO"

foreach ($test in @(
  @{tipo="texto";  contenido="Hola desde AGENTE_PRINCIPAL";  autor="AGENTE_PRINCIPAL"},
  @{tipo="imagen"; contenido="https://URL_DE_UNA_IMAGEN.png"; autor="AGENTE_GPT"},
  @{tipo="video";  contenido="https://youtube.com/watch?v=ID"; autor="AGENTE_PUENTE"}
)) {
  $body = @{ event_type="muestrario"; client_payload=@{
    tipo=$test.tipo; contenido=$test.contenido; autor=$test.autor; ts=$ts++
  }} | ConvertTo-Json -Depth 3
  Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/dispatches" `
    -Method POST -ContentType "application/json" `
    -Headers @{Authorization="token $token"; Accept="application/vnd.github.v3+json"} `
    -Body $body | Out-Null
  Write-Output "Dispatched: $($test.tipo)"
  Start-Sleep 30   # Esperar entre cada dispatch para evitar race condition
}
```

```bash
# Mac / Linux
TOKEN=$(gh auth token)
OWNER="GITHUB_USER"
REPO="NOMBRE_PROYECTO"

for TYPE in texto imagen video; do
  curl -s -X POST "https://api.github.com/repos/$OWNER/$REPO/dispatches" \
    -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -d "{\"event_type\":\"muestrario\",\"client_payload\":{\"tipo\":\"$TYPE\",\"contenido\":\"test $TYPE\",\"autor\":\"agente\",\"ts\":$(date +%s)}}"
  sleep 30
done
```

#### Verificar resultados
```bash
gh run list --repo GITHUB_USER/NOMBRE_PROYECTO --limit 5
# Todos deben mostrar "completed success"

# Verificar muestrario.json actualizado
git pull origin main && cat muestrario.json
```

---

## 5 · Troubleshooting

| Síntoma | Causa | Solución |
|---|---|---|
| `!muestrario` no responde | GITHUB_PAT vacío o sin scope `repo` | `gh auth token` → copiar en .env |
| Action falla con "push rejected" | Race condition (dispatches simultáneos) | Añadir `git pull --rebase origin main` antes de `git push` |
| Bot offline / no responde | Token Discord expirado o revocado | discord.com/developers → Bot → Reset Token → actualizar .env |
| muestrario.html no actualiza | Pages en proceso de build | Esperar ~60s después del push. Ver Actions para confirmar |
| `Cannot find module 'pptxgenjs'` | pptxgenjs no instalado localmente | `cd docs && npm install pptxgenjs` |
| Error CORS en muestrario.html local | Abriendo HTML directamente (file://) | Usar `npx serve .` o subir a GitHub Pages |

---

## 6 · Cómo extender la red

### Agregar un 4to agente
1. Crear nueva Discord Application → copiar token
2. Copiar `discord-bot/agente-puente.js` → renombrar → ajustar NOMBRE y TOKEN_KEY
3. Agregar en `.env`: `NUEVO_AGENTE_TOKEN=...`
4. Agregar script en `package.json`: `"nuevo": "node agente-nuevo.js"`
5. Duplicar tarjeta en `index.html` con nuevo color
6. `git add . && git commit -m "feat: nuevo agente" && git push`

### Agregar nuevos tipos de contenido en !muestrario
1. En `agente-principal.js`: añadir el tipo al array de validación
2. En `muestrario.html`: añadir el case de renderizado para ese tipo

### Agregar memoria persistente entre agentes
1. Crear `memoria.json` en el repo (array de mensajes)
2. Crear nuevo workflow `memoria.yml` similar a `muestrario.yml`
3. Los bots leen y escriben vía `repository_dispatch`

---

## 7 · Estructura de archivos esperada

```
NOMBRE_PROYECTO/
├── index.html              # Dashboard MissionControl
├── mental.html             # Diseño Mental del proyecto
├── muestrario.html         # Feed de contenido de los agentes
├── muestrario.json         # Base de datos del feed [ ]
├── start_all.ps1           # Inicio rápido (Windows)
├── start_all.sh            # Inicio rápido (Mac/Linux)
├── SKILL.md                # Este archivo — conocimiento del patrón
├── README.md               # Documentación del proyecto específico
├── assets/
│   ├── diagrama-mental.png # Diagrama de arquitectura
│   └── saludo-gpt.png      # Screenshot del saludo inicial
├── discord-bot/
│   ├── package.json
│   ├── .env                # Tokens (NO subir a git)
│   ├── .env.example        # Template sin valores reales
│   ├── agente-principal.js
│   ├── agente-gpt.js
│   └── agente-puente.js
├── docs/
│   ├── runbook.md          # Operación y rotación de secretos
│   ├── gen_pptx.js         # Script generador del PPT
│   └── NOMBRE_PROYECTO.pptx
└── .github/
    └── workflows/
        └── muestrario.yml
```

> `.env` debe estar en `.gitignore`. Nunca subir tokens reales al repositorio.

---

## 8 · Secretos — rotación periódica

| Secreto | Dónde renovar | Frecuencia sugerida |
|---|---|---|
| Tokens Discord | discord.com/developers → Bot → Reset Token | Cada 90 días |
| ANTHROPIC_API_KEY | console.anthropic.com → API Keys | Cada 90 días |
| OPENAI_API_KEY | platform.openai.com → API Keys | Cada 90 días |
| GITHUB_PAT | github.com/settings/tokens | Cada 90 días |

---

## 9 · Prompt de inicio rápido para Claude Code

Pega esto en Claude Code para iniciar el proyecto con esta skill cargada:

```
Lee el archivo SKILL.md del repositorio https://github.com/nitenacho/Red-de-agentes-de-Ignacio
y úsalo como base para construir una red de agentes IA con estos datos:

NOMBRE_PROYECTO = [NOMBRE]
GITHUB_USER     = [USUARIO]
AGENTE_PRINCIPAL= [NOMBRE_AGENTE_1]
AGENTE_GPT      = [NOMBRE_AGENTE_2]
AGENTE_PUENTE   = [NOMBRE_AGENTE_3]

Ejecuta las fases 0 a 10 de forma autónoma usando el computador.
Confirma que entendiste respondiendo "Entendido — iniciando [NOMBRE_PROYECTO]".
```

---

*Patrón desarrollado por Ignacio Concha · nitenacho · 2026*
*Referencia: https://github.com/nitenacho/Red-de-agentes-de-Ignacio*
