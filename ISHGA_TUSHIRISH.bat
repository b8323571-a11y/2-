@echo off
title AuraMarket AI - Server va Web Platforma
color 0b
echo ======================================================================
echo          AuraMarket AI - Mini Marketplace + Sun'iy Intellekt
echo ======================================================================
echo.
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"

echo [1/2] Server tekshirilmoqda...
echo [2/2] Sayt brauzerda ochilmoqda: http://localhost:5000
echo.

start "" "http://localhost:5000"

node server/index.js
if %errorlevel% neq 0 (
    echo.
    echo Serverni ishga tushirishda xatolik!
    echo Iltimos, Node.js o'rnatilganligini tekshiring.
    pause
)
