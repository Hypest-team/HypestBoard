FROM node:latest

WORKDIR /usr/src/app

RUN npm i lerna -g --loglevel notice

COPY packages/server ./packages/server
COPY packages/client ./packages/client
COPY packages/overlays ./packages/overlays

COPY lerna.json .
RUN lerna bootstrap

EXPOSE 3000

CMD [ "npm", "--prefix", "packages/server", "start" ]

