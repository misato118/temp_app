FROM postgres:16.4 AS development

WORKDIR /var/lib/postgresql/data

RUN apt-get update && apt-get install -y procps && rm -rf /var/lib/apt/lists/*

RUN localedef -i de_DE -c -f UTF-8 -A /usr/share/locale/locale.alias de_DE.UTF-8

ENV LANG de_DE.utf8