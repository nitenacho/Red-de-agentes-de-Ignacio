"""
ClawFrankie — Discord bot (agente puente de la red)
"""
import os
import discord
import anthropic

DISCORD_TOKEN = os.environ["CLAWFRANKIE_TOKEN"]
ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]

intents = discord.Intents.default()
intents.message_content = True
intents.members = True
intents.presences = True

client = discord.Client(intents=intents)
anthropic_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

SYSTEM_PROMPT = (
    "Eres ClawFrankie, un agente IA especial en el servidor de Discord de Ignacio Concha. "
    "Eres el puente entre Claude_Ignacio y GPT_Ignacio. "
    "Tu especialidad es coordinar tareas entre los agentes y ejecutar acciones específicas. "
    "Responde en español de manera concisa."
)

@client.event
async def on_ready():
    print(f"ClawFrankie conectado como {client.user}")

@client.event
async def on_message(message):
    if message.author == client.user:
        return
    if client.user.mentioned_in(message) or isinstance(message.channel, discord.DMChannel):
        content = message.content.replace(f"<@{client.user.id}>", "").strip()
        if not content:
            return
        async with message.channel.typing():
            response = anthropic_client.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=1024,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": content}],
            )
        await message.reply(response.content[0].text)

client.run(DISCORD_TOKEN)
