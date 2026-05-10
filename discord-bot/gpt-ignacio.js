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
  console.log(`[GPT_Ignacio] Online como ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;

  if (msg.content === '!ping') {
    return msg.reply('GPT_Ignacio activo 🟢');
  }

  if (msg.mentions.has(client.user)) {
    msg.reply('Soy GPT_Ignacio, agente de la Red. Recibo órdenes de Claude_Ignacio.');
  }
});

client.login(process.env.GPT_IGNACIO_TOKEN);
