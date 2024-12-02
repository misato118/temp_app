# コンテナの作成とコンテナ内にプロジェクトを作成する際の考え方

## このドキュメントの目的
コンテナを作成し、そのコンテナ内にプロジェクトを作成する際の考え方を示す。

## このドキュメントを読むと達成できること
Dockerfile、およびdocker-compose.ymlの作成と、作成したコンテナ内でプロジェクトを展開できるようになる

## はじめに
先にまとめを書くと、次のような流れでコンテナの作成、およびプロジェクトの初期化を行えば良い。

```
1. dockerfileの作成
2. docker-compose.ymlの作成（他コンテナとの連携がある場合のみ）
3. 作成したコンテナに入り、作られた環境内でプロジェクトを初期化
4. `docker-compose up`で毎回作成したプロジェクトが立ち上がるように起動コマンドを追加
```

なおこのドキュメントの題名にあるとおり、この内容を最初のプロジェクト作成時にのみ必要な考え方の方針を示したもので、実装中は特に意識する必要はない。

ただしコンテナの作成とプロジェクトの展開という基本的な内容は理解しておくべきであり、今後新たにプロジェクトを作成する際に困らなくすることで、ポートフォリオ作成だけにとどまらず、検証や個人プロジェクトの作成、さらには独自のアプリリリースなどに繋げられる。
ぜひ内容を簡単でもいいので理解しておいてほしい。

ここでは作成したコンテナにNextJS APPを作成、起動することを通して理解を深めてもらう。

## Dockerfileの作成
Dockerfileに記載する内容は基本的にコンテナ内の環境である。
椎茸栽培するには高温多湿の温室を用意するし、ウーパールーパーを育てるなら綺麗な水槽を用意する。
それと同じでNextJSのアプリを作るならそれに適した環境を作る必要がある。

まずは空の環境の整ったコンテナを用意し、コンテナができたらプロジェクトを展開する。
椎茸栽培をする際に最初に温室を立てて、環境を作ってから椎茸の原木を入れるのと同じだ。

```Dockerfile
FROM node:20.0.0-slim AS development

# 作業ディレクトリを/usr/src/appに設定しています。
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y locales curl
```

内容はそれほど難しくない。
作業ディレクトリの指定と、最小限に必要なものをインストールしているだけだ。
（何をインストールしているのか気になる場合は適当に調べて）

## docker-compose.ymlの作成
次にdocker-compose.ymlを作成していく。
このdocker-composeを利用する際は、基本的に複数コンテナを連携させることを目的としているため、連携させる必要がない、単独のコンテナのみ用意すればいい場合などは必要ない。

ただ基本的に検証や勉強用のコンテナでない限り実務でdocker-composeを利用しないことはあまりないため、ここに記すこととする。

```docker-compose.yml
services:
    tob:
        container_name: tob
        build:
            context: .
            dockerfile: ./docker/toB/Dockerfile
        ports:
            - "11001:3000"
        volumes:
            - ./tob:/usr/src/app
        tty: true
```

今回作成するアプリはtobという名前である。
上記内容もこれまた難しくなく、このコンテナをビルドするにあたって参照するDockerfileなどを指定しているだけである。

-------------------

### volumesについて
ローカルのディレクトリ内とコンテナのディレクトリ内をリンクさせるためのもの。
これがないとローカルで編集（VSCodeなどでファイルに変更）を加えても、コンテナ内で反映されず、また逆も然りになってしまう。

### ttyについて
初期コンテナ作成時にはプロジェクトが何も入っていないので、コンテナを立ち上げても起動するものがなくコンテナが自動終了してしまう。
このttyをtrueにすることで起動するものがなくてもコンテナを自動終了しないようにできる。

-------------------

ここまで書けたら、以下コマンドを実行してコンテナを立ち上げる。

```
docker-compose build
docker-compose up -d
```

## プロジェクトのInit
立ち上がったコンテナに入り、NextJSのプロジェクトを作成していく。

```
docker exec -it tob /bin/bash
```

コンテナに入れたら、ターミナルの表示が次のように変わるはずである。
```
root@18ab5b90ce0b:/usr/src/app#
```

ではここで、NextJSのプロジェクトを作成していこう。
作成コマンドの詳細に関しては[公式ドキュメント](https://nextjs.org/docs/pages/getting-started/installation)を参照してほしい。


```
npx create-next-app@latest
```

初めてこれを実行すると必要なもののインストールの許可を求められる。
```
Need to install the following packages:
  create-next-app@15.0.3
Ok to proceed? (y) y
```

これを許可すると対話的にプロジェクトを作成してくれる。

```shell
# プロジェクトをカレントディレクトに展開するため、project nameを.に指定する
✔ What is your project named? … .
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? …　Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like your code inside a `src/` directory? … No
✔ Would you like to use App Router? (recommended) … No
✔ Would you like to use Turbopack for next dev? … No
✔ Would you like to customize the import alias (@/* by default)? … No
Creating a new Next.js app in /usr/src/app.
```

作成できたらローカルのtobディレクトリ内でもNextJSのプロジェクトが展開されていることがわかる。

ここまでで次のことができるようになった。
- 作成した（環境の整った）コンテナ内にNextJSアプリを構築
- ローカルのtobディレクトリと、コンテナ内の`/usr/src/app`ディレクトリ内をリンク

念の為伝えておくと、NextJSアプリをあえてコンテナに入って作成したのは、わざわざNextJS用に環境を整えたコンテナ内で初期化作業する方が都合がいいためである。

ローカルで作成してもいいが、端末によって色々な設定が混ざったり、逆にPCにNextJS作成のための環境を構築する必要がある。プロジェクトごとにそんなことをしているとどんどんPC内が汚れていって収拾がつかなくなり、なぜか動かないみたいな状態になっても原因特定が難しくなっていく。

椎茸栽培のための温室、ウーパールーパーのための水槽を用意したなら、椎茸の菌を着床させる作業は温室内でやった方がいい。ウーパールーパーの水槽が近くにある状態でそんなことしてウーパールーパーの頭にキノコが生えたら最悪である。

## 立ち上げコマンドの修正
ここまででプロジェクトの初期化ができたので二回目以降、コンテナを立ち上げた際に自動的にNextJSのプロジェクトが立ち上がるようにdocker-compose.ymlを修正しておく。

```docker-compose.yml
services:
    tob:
        container_name: tob
        build:
            context: .
            dockerfile: ./docker/toB/Dockerfile
        ports:
            - "11001:3000"
        volumes:
            - ./tob:/usr/src/app
        tty: true
        command: npm run dev  # これを追加
```

再度
```
docker-compose build
docker-compose up -d
```

を実施し、`http://localhost:11001/`にブラウザからアクセスすると、コンテナ内で起動しているNextJS APPにアクセスできるようになっている。

以上がコンテナを作成し、そのコンテナ内にてプロジェクトの初期化を行う作業の概要である。