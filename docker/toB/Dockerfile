FROM node:20.0.0-slim AS development

# 作業ディレクトリを/usr/src/appに設定しています。
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y locales curl

COPY ./tob/package.json /usr/src/app
RUN npm install