require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const OpenAI = require('openai');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

client.once('clientReady', () => {
  console.log(`GPT_Ignacio conectado como ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;

  const isDM = msg.channel.type === 1;
  const isMention = msg.mentions.has(client.user);

  if (!isDM && !isMention) return;

  const texto = msg.content.replace(`<@${client.user.id}>`, '').trim();

  if (!texto) {
    return msg.reply('GPT_Ignacio listo. ¿Qué tarea debo ejecutar?');
  }

  if (texto === '!ping') {
    return msg.reply('GPT_Ignacio activo 🟢');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Eres GPT_Ignacio, un agente de IA de la Red de Agentes de Ignacio. Responde en español, de forma concisa y profesional.',
        },
        { role: 'user', content: texto },
      ],
    });

    const respuesta = completion.choices[0].message.content;
    await msg.reply(
      `Recibido. Soy GPT_Ignacio y ejecutaré la tarea asignada:\n"${texto}"\n\n${respuesta}`
    );
  } catch (err) {
    console.error('[GPT_Ignacio] Error OpenAI:', err.message);
    await msg.reply('Error al contactar con GPT. Reintenta en un momento.');
  }
});

client.login(process.env.GPT_IGNACIO_TOKEN);
