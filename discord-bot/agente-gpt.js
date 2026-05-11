require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once("ready", () => {
  console.log(`GPT_Ignacio conectado como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const meMencionan = message.mentions.has(client.user);
  const esDM = !message.guild;

  if (!meMencionan && !esDM) return;

  const contenido = message.content
    .replace(`<@${client.user.id}>`, "")
    .replace(`<@!${client.user.id}>`, "")
    .trim();

  const respuesta = generarRespuestaGPTIgnacio(contenido, message.author.username);

  await message.reply(respuesta);
});

function generarRespuestaGPTIgnacio(texto, autor) {
  if (!texto) {
    return "GPT_Ignacio listo. ¿Qué tarea debo ejecutar?";
  }

  return `Recibido, ${autor}. Soy GPT_Ignacio y ejecutaré la tarea asignada:\n\n\"${texto}\"`;
}

client.login(process.env.GPT_IGNACIO_TOKEN);
