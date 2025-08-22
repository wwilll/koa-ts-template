#!/bin/bash

if [ ! -d "dist" ]; then
    mkdir dist
fi

# cp -r logs/ dist/logs

cp package.json dist/package.json
cp package-lock.json dist/package-lock.json

echo '文件复制完成'
