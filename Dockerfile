# FROM docker.io/library/node:20-alpine AS build_node_modules

# RUN npm install -g npm@latest

# WORKDIR /app

# COPY dist /app

# RUN npm i --omit=dev

# FROM docker.io/library/node:lts-alpine
FROM node:22-alpine

WORKDIR /app

# 指定默认语言环境（locale），否则new Date().toLocaleString()格式不对
ENV LANG=zh_CN.UTF-8

# 安装 tzdata，仅保留上海时区,若挂载/etc/localtime，则注释掉这段
RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    # 删除其他时区数据，减小镜像
    && rm -rf /usr/share/zoneinfo/* \
    && mkdir -p /usr/share/zoneinfo/Asia \
    && cp /etc/localtime /usr/share/zoneinfo/Asia/Shanghai
# 有些程序优先读 TZ，建议加上
ENV TZ=Asia/Shanghai

# COPY --from=build_node_modules /app /app

COPY dist /app

COPY deploy.sh /app/deploy.sh

EXPOSE 3000

RUN chmod +x /app/deploy.sh

ENTRYPOINT ["/app/deploy.sh"]
