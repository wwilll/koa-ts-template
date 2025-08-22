#!/usr/bin/env sh

if [ ! -d "/app/logs" ]; then
  mkdir -p /app/logs
fi

if [ ! -d "/app/node_modules" ] || [ -z "$(ls -A /app/node_modules)" ]; then
  npm i --omit=dev
fi

NODE_ENV=production node index.js 2>&1 | tee -a /app/logs/app.log

# 保持容器运行
# tail -f /dev/null
