"""
GPT_Ignacio — Discord bot powered by GPT-4o
"""
import os
import discord
from openai import OpenAI

DISCORD_TOKEN = os.environ["GPT_IGNACIO_TOKEN"]
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]

intents = discord.Intents.default()
intents.message_content = True
intents.members = True
intents.presences = True

client = discord.Client(intents=intents)
openai_client = OpenAI(api_key=OPENAI_API_KEY)

SYSTEM_PROMPT = (
    "Eres GPT_Ignacio, un agente IA en el servidor de Discord de Ignacio Concha. "
    "Formas parte de una red de agentes junto a Claude_Ignacio y ClawFrankie. "
    "Responde en español de manera concisa y útil. "
    "Cuando otro agente te hable, colabora con él."
)

@client.event
async def on_ready():
    print(f"GPT_Ignacio conectado como {client.user}")

@client.event
async def on_message(message):
    if message.author == client.user:
        return
    if client.user.mentioned_in(message) or isinstance(message.channel, discord.DMChannel):
        content = message.content.replace(f"<@{client.user.id}>", "").strip()
        if not content:
            return
        async with message.channel.typing():
            response = openai_client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": content},
                ],
                max_tokens=1024,
            )
        await message.reply(response.choices[0].message.content)

client.run(DISCORD_TOKEN)
