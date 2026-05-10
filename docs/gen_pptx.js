const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Claude_Ignacio";
pres.title  = "Red de Agentes de Ignacio";

// Palette
const C = {
  bg1:     "060A10",
  bg2:     "0D1520",
  bg3:     "0A1628",
  surface: "111D2E",
  border:  "1A2540",
  purple:  "7C3AED",
  neon:    "818CF8",
  green:   "10B981",
  amber:   "F59E0B",
  text:    "E2E8F0",
  muted:   "64748B",
  white:   "FFFFFF",
};

// ─────────────────────────────────────────────
// SLIDE 1 — PORTADA
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg1 };

  // Subtle glow circles
  s.addShape(pres.shapes.OVAL, { x: -1.5, y: -1, w: 5, h: 5, fill: { color: C.purple, transparency: 88 }, line: { color: C.bg1, width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: 7, y: 2.5, w: 4, h: 4, fill: { color: C.green, transparency: 90 }, line: { color: C.bg1, width: 0 } });

  // Agent dots
  const dots = [
    { x: 3.1, color: C.purple, label: "Claude_Ignacio" },
    { x: 4.7, color: C.green,  label: "GPT_Ignacio" },
    { x: 6.3, color: C.amber,  label: "ClawFrankie" },
  ];
  dots.forEach(d => {
    s.addShape(pres.shapes.OVAL, { x: d.x, y: 1.0, w: 0.35, h: 0.35, fill: { color: d.color }, line: { color: d.color, width: 0 } });
    s.addText(d.label, { x: d.x - 0.35, y: 1.42, w: 1.05, h: 0.22, fontSize: 7, color: C.muted, align: "center", fontFace: "Calibri" });
  });

  // Title
  s.addText("Red de Agentes", { x: 1, y: 1.85, w: 8, h: 1.0, fontSize: 44, bold: true, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
  s.addText("de Ignacio", { x: 1, y: 2.75, w: 8, h: 0.8, fontSize: 44, bold: true, color: C.neon, fontFace: "Calibri", align: "center", margin: 0 });

  // Subtitle
  s.addText("MissionControl  ·  Claude_Ignacio  ·  GPT_Ignacio  ·  ClawFrankie", {
    x: 1, y: 3.7, w: 8, h: 0.45,
    fontSize: 13, color: C.muted, fontFace: "Calibri", align: "center", margin: 0,
  });

  // Date
  s.addText("2026-05-10", { x: 1, y: 4.9, w: 8, h: 0.3, fontSize: 10, color: C.muted, fontFace: "Calibri", align: "center", margin: 0 });
}

// ─────────────────────────────────────────────
// SLIDE 2 — OBJETIVO
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg2 };

  s.addText("Objetivo", { x: 0.6, y: 0.4, w: 8.8, h: 0.65, fontSize: 32, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });

  // Left column — main objective text
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.25, w: 4.5, h: 3.5, fill: { color: C.surface }, line: { color: C.border, width: 1 } });
  s.addText("Construir una red de 3 agentes IA que se comunican vía Discord y publican contenido en una web pública alojada en GitHub Pages.", {
    x: 0.75, y: 1.4, w: 4.2, h: 1.5,
    fontSize: 14, color: C.text, fontFace: "Calibri", valign: "top", margin: 0,
  });

  const goals = [
    { icon: "🤖", text: "Claude Sonnet 4.6 como agente principal" },
    { icon: "🟢", text: "GPT-4o como agente ejecutor" },
    { icon: "🟡", text: "ClawFrankie como agente puente" },
    { icon: "🌐", text: "Web pública en GitHub Pages" },
  ];
  goals.forEach((g, i) => {
    s.addText(g.icon + "  " + g.text, {
      x: 0.75, y: 2.95 + i * 0.45, w: 4.2, h: 0.4,
      fontSize: 12, color: C.text, fontFace: "Calibri", margin: 0,
    });
  });

  // Right column — tech stack
  s.addShape(pres.shapes.RECTANGLE, { x: 5.4, y: 1.25, w: 4.0, h: 3.5, fill: { color: C.surface }, line: { color: C.border, width: 1 } });
  s.addText("Stack tecnológico", { x: 5.55, y: 1.35, w: 3.7, h: 0.35, fontSize: 11, bold: true, color: C.neon, fontFace: "Calibri", margin: 0 });

  const stack = [
    ["Discord.js v14", "Bots Node.js"],
    ["discord.py", "Bots Python"],
    ["Anthropic SDK", "Claude 4.6"],
    ["OpenAI SDK", "GPT-4o"],
    ["GitHub Actions", "CI/CD + dispatch"],
    ["GitHub Pages", "Hosting web"],
  ];
  stack.forEach(([name, desc], i) => {
    s.addText(name, { x: 5.55, y: 1.78 + i * 0.47, w: 2.0, h: 0.38, fontSize: 11, bold: true, color: C.text, fontFace: "Calibri", margin: 0 });
    s.addText(desc, { x: 7.55, y: 1.78 + i * 0.47, w: 1.7, h: 0.38, fontSize: 10, color: C.muted, fontFace: "Calibri", margin: 0 });
  });
}

// ─────────────────────────────────────────────
// SLIDE 3 — ARQUITECTURA
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg3 };

  s.addText("Arquitectura", { x: 0.6, y: 0.35, w: 8.8, h: 0.65, fontSize: 32, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });

  const agents = [
    { label: "Claude_Ignacio", role: "Orquestador principal", color: C.purple, details: ["Claude Sonnet 4.6", "Python + Node.js", "Discord bot", "Comando !muestrario"], x: 0.4 },
    { label: "GPT_Ignacio",    role: "Ejecutor de tareas",   color: C.green,  details: ["GPT-4o",           "ChatGPT Plus",     "Proyecto en chatgpt.com", "Confirmado: listo"], x: 3.55 },
    { label: "ClawFrankie",    role: "Agente puente",        color: C.amber,  details: ["Claude Sonnet 4.6", "Node.js",          "Bridge relay",  "Árbitro de la red"], x: 6.7 },
  ];

  agents.forEach(a => {
    // Card
    s.addShape(pres.shapes.RECTANGLE, { x: a.x, y: 1.1, w: 2.9, h: 3.5, fill: { color: C.surface }, line: { color: a.color, width: 1 } });
    // Top accent
    s.addShape(pres.shapes.RECTANGLE, { x: a.x, y: 1.1, w: 2.9, h: 0.12, fill: { color: a.color }, line: { color: a.color, width: 0 } });
    // Name
    s.addText(a.label, { x: a.x + 0.12, y: 1.28, w: 2.66, h: 0.4, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    s.addText(a.role,  { x: a.x + 0.12, y: 1.67, w: 2.66, h: 0.3, fontSize: 10, color: C.muted, fontFace: "Calibri", margin: 0 });
    // Details
    a.details.forEach((d, i) => {
      s.addText("▸  " + d, { x: a.x + 0.12, y: 2.1 + i * 0.5, w: 2.66, h: 0.4, fontSize: 11, color: C.text, fontFace: "Calibri", margin: 0 });
    });
  });

  // Center bottom — web
  s.addShape(pres.shapes.RECTANGLE, { x: 3.3, y: 4.7, w: 3.4, h: 0.65, fill: { color: C.neon, transparency: 15 }, line: { color: C.neon, width: 1 } });
  s.addText("🌐  GitHub Pages — MissionControl", { x: 3.3, y: 4.7, w: 3.4, h: 0.65, fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri", margin: 0 });

  // Arrows
  [[1.85, 4.65], [5.0, 4.65], [8.15, 4.65]].forEach(([ax]) => {
    s.addShape(pres.shapes.LINE, { x: ax, y: 4.6, w: 0, h: 0.1, line: { color: C.muted, width: 1 } });
  });
}

// ─────────────────────────────────────────────
// SLIDE 4 — FASES
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg2 };

  s.addText("Fases del proyecto", { x: 0.6, y: 0.35, w: 8.8, h: 0.65, fontSize: 32, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });

  const phases = [
    ["00", "Setup",              "git, gh CLI, Python, Node.js"],
    ["01", "ChatGPT Desktop",    "Login Plus, proyecto, Work with Apps"],
    ["02", "Saludo Claude→GPT",  "GPT_Ignacio confirma identidad"],
    ["03", "Bots Discord",       "!ping, !muestrario, JS + Python"],
    ["04", "Repo + Pages",       "GitHub + GitHub Pages activo"],
    ["05", "MissionControl",     "index.html dark + neón"],
    ["06", "Docs + PPT",         "RedDeAgentes.pptx + diagrama"],
    ["07", "Diseño Mental",      "mental.html con arquitectura"],
    ["08", "Muestrario",         "muestrario.html + repo_dispatch"],
    ["09", "Pruebas E2E",        "texto, imagen, video end-to-end"],
    ["10", "Cierre",             "README, runbook, entrega final"],
  ];

  const cols = [phases.slice(0, 6), phases.slice(6)];
  const xs = [0.4, 5.2];

  cols.forEach((col, ci) => {
    col.forEach((p, i) => {
      const y = 1.15 + i * 0.73;
      const x = xs[ci];
      // Number badge
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.52, h: 0.52, fill: { color: C.neon, transparency: 30 }, line: { color: C.neon, width: 1 } });
      s.addText(p[0], { x, y, w: 0.52, h: 0.52, fontSize: 11, bold: true, color: C.neon, align: "center", valign: "middle", fontFace: "Calibri", margin: 0 });
      // Title
      s.addText(p[1], { x: x + 0.6, y: y + 0.01, w: 4.0, h: 0.27, fontSize: 12, bold: true, color: C.text, fontFace: "Calibri", margin: 0 });
      // Description
      s.addText(p[2], { x: x + 0.6, y: y + 0.28, w: 4.0, h: 0.22, fontSize: 9, color: C.muted, fontFace: "Calibri", margin: 0 });
    });
  });
}

// ─────────────────────────────────────────────
// SLIDE 5 — CÓMO EXTENDER
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg1 };

  s.addText("Cómo extender la red", { x: 0.6, y: 0.35, w: 8.8, h: 0.65, fontSize: 32, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  s.addText("Agregar un nuevo agente en 4 pasos", { x: 0.6, y: 0.98, w: 8.8, h: 0.3, fontSize: 13, color: C.muted, fontFace: "Calibri", margin: 0 });

  const steps = [
    { n: "1", icon: "⚙️", title: "Crear Discord Application", desc: "Ir a discord.com/developers → New Application → Bot → Copy Token. Habilitar intents: Message Content, Server Members, Presence.", color: C.purple },
    { n: "2", icon: "📝", title: "Crear el bot JS",           desc: "Copiar discord-bot/clawfrankie.js con el nuevo nombre. Agregar el token en discord-bot/.env y el script en package.json.", color: C.neon },
    { n: "3", icon: "🌐", title: "Agregar tarjeta en index.html", desc: "Duplicar una .agent-card en index.html con el color, nombre, App ID y descripción del nuevo agente.", color: C.green },
    { n: "4", icon: "🚀", title: "Publicar con git push",    desc: "git add . && git commit -m 'feat: nuevo agente X' && git push origin main — GitHub Pages se actualiza automáticamente.", color: C.amber },
  ];

  steps.forEach((step, i) => {
    const y = 1.45 + i * 0.98;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.85, fill: { color: C.surface }, line: { color: step.color, width: 1 } });
    // Left accent
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.08, h: 0.85, fill: { color: step.color }, line: { color: step.color, width: 0 } });
    // Number
    s.addText(step.n, { x: 0.65, y, w: 0.45, h: 0.85, fontSize: 20, bold: true, color: step.color, align: "center", valign: "middle", fontFace: "Calibri", margin: 0 });
    // Title
    s.addText(step.icon + "  " + step.title, { x: 1.18, y: y + 0.07, w: 7.2, h: 0.3, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    // Desc
    s.addText(step.desc, { x: 1.18, y: y + 0.4, w: 7.2, h: 0.38, fontSize: 10, color: C.muted, fontFace: "Calibri", margin: 0 });
  });

  // Footer
  s.addText("nitenacho.github.io/Red-de-agentes-de-Ignacio  ·  github.com/nitenacho/Red-de-agentes-de-Ignacio", {
    x: 0.5, y: 5.28, w: 9.0, h: 0.25, fontSize: 9, color: C.muted, align: "center", fontFace: "Calibri", margin: 0,
  });
}

// ─────────────────────────────────────────────
// WRITE
// ─────────────────────────────────────────────
const outPath = path.join("C:\\Users\\incon\\Red-de-agentes-de-Ignacio\\docs", "RedDeAgentes.pptx");
pres.writeFile({ fileName: outPath })
  .then(() => console.log("✅ Saved:", outPath))
  .catch(e => { console.error("❌", e); process.exit(1); });
