require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

const GITHUB_OWNER = process.env.GITHUB_OWNER || 'nitenacho';
const GITHUB_REPO  = process.env.GITHUB_REPO  || 'Red-de-agentes-de-Ignacio';
const GITHUB_PAT   = process.env.GITHUB_PAT;

async function dispatchMuestrario(tipo, contenido) {
  const { default: fetch } = await import('node-fetch');
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/dispatches`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_PAT}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'muestrario',
        client_payload: { tipo, contenido, autor: 'Claude_Ignacio', ts: Date.now() },
      }),
    }
  );
  return res.status;
}

client.once('ready', () => {
  console.log(`[Claude_Ignacio] Online como ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;

  if (msg.content === '!ping') {
    return msg.reply('Claude_Ignacio activo 🟢');
  }

  if (msg.content.startsWith('!muestrario ')) {
    const parts = msg.content.slice('!muestrario '.length).split(' ');
    const tipo = parts[0];
    const contenido = parts.slice(1).join(' ');

    if (!['texto', 'imagen', 'video'].includes(tipo)) {
      return msg.reply('❌ Tipo inválido. Usa: `!muestrario texto|imagen|video <contenido>`');
    }
    if (!contenido) {
      return msg.reply('❌ Falta el contenido. Usa: `!muestrario texto|imagen|video <contenido>`');
    }
    if (!GITHUB_PAT) {
      return msg.reply('❌ GITHUB_PAT no configurado en .env');
    }

    try {
      const status = await dispatchMuestrario(tipo, contenido);
      if (status === 204) {
        msg.reply(`✅ Muestrario actualizado — tipo: \`${tipo}\`, contenido: \`${contenido}\``);
      } else {
        msg.reply(`⚠️ GitHub respondió con status ${status}. Verifica el PAT y los permisos.`);
      }
    } catch (err) {
      console.error(err);
      msg.reply('❌ Error al disparar workflow en GitHub.');
    }
    return;
  }

  if (msg.mentions.has(client.user)) {
    msg.reply('Soy Claude_Ignacio. Usa `!ping` o `!muestrario <tipo> <contenido>`.');
  }
});

client.login(process.env.CLAUDE_IGNACIO_TOKEN);
