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

client.once('ready', () => {
  console.log(`[ClawFrankie] Online como ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;

  if (msg.content === '!ping') {
    return msg.reply('ClawFrankie activo 🟢');
  }

  if (msg.mentions.has(client.user)) {
    msg.reply('Soy ClawFrankie, agente puente de la Red. Coordino entre Claude_Ignacio y GPT_Ignacio.');
  }
});

client.login(process.env.CLAWFRANKIE_TOKEN);
