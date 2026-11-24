@echo off
title AuraMarket AI - Start
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"
start "" "http://localhost:5000"
node server/index.js
