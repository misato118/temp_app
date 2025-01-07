FROM node:20.0.0-slim AS development

# 作業ディレクトリを/usr/src/appに設定しています。
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y locales curl

ENV POSTGRES_USER=postgres \
    POSTGRES_PASSWORD=password

# COPY ./api/package*.json .

# RUN npm ci --only=production

# COPY ./api .
# RUN npx prisma generate && npm run build

# # 本番環境はdistを使用することでサイズを縮小する
# FROM node:22.11 AS production

# WORKDIR /usr/src/app

# COPY --from=development /usr/src/app/dist ./dist
# COPY --from=development /usr/src/app/node_modules ./node_modules
# CMD ["node", "./dist/main.js"]