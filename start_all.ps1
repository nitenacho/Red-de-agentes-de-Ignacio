# start_all.ps1 — Levanta los 3 bots Discord de la Red de Agentes de Ignacio
# Uso: .\start_all.ps1

$botDir = "C:\Users\incon\Red-de-agentes-de-Ignacio\discord-bot"

# Verificar .env
if (-not (Test-Path "$botDir\.env")) {
    Write-Error ".env no encontrado en $botDir. Copia .env.example y rellena los tokens."
    exit 1
}

# Lanzar bots en ventanas separadas
Start-Process "cmd.exe" -ArgumentList "/k title Claude_Ignacio && cd /d `"$botDir`" && npm run claude" -WindowStyle Normal
Start-Sleep -Milliseconds 500
Start-Process "cmd.exe" -ArgumentList "/k title GPT_Ignacio && cd /d `"$botDir`" && npm run gpt" -WindowStyle Normal
Start-Sleep -Milliseconds 500
Start-Process "cmd.exe" -ArgumentList "/k title ClawFrankie && cd /d `"$botDir`" && npm run claw" -WindowStyle Normal

Write-Host "✅ 3 bots lanzados. Comprueba los logs en cada ventana." -ForegroundColor Green
Write-Host "🌐 Web: https://nitenacho.github.io/Red-de-agentes-de-Ignacio/" -ForegroundColor Cyan
Write-Host "💬 Discord: https://discord.gg/3jUJW3pxN" -ForegroundColor Cyan
