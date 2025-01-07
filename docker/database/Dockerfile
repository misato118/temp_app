FROM postgres:latest AS development

RUN apt-get update && \
    apt-get install -y curl

ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP