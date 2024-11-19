FROM node:20.0.0-slim AS development

# 作業ディレクトリを/usr/src/appに設定しています。
WORKDIR /usr/src/app

# tzdataはタイムゾーンデータを提供し、tiniはPID 1問題に対処するために使用されます。
RUN apt-get update && apt-get -qq install -y --no-install-recommends \
    tzdata \
    tini \
    && rm -rf /var/lib/apt/lists/*

# 環境変数NODE_ENVをdevelopmentに設定しています。
ENV NODE_ENV development

# アプリケーションのソースコードをコピーし、所有者をnodeユーザーとnodeグループに設定しています。
COPY --chown=node:node ./api .

# package-lock.jsonに記載された依存関係をインストールしています。
RUN npm i

USER node