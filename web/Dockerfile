FROM node:dubnium-jessie

ARG node_env=development

ENV HTTP_PROXY=http://newproxy.ah.nl:8080
ENV HTTPS_PROXY=http://newproxy.ah.nl:8080
ENV NO_PROXY=localhost,127.0.0.1,localaddress,.ecom.ahold.nl
ENV NODE_ENV=development

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

COPY . /app
