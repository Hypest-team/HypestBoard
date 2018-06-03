FROM node:latest

WORKDIR /usr/src/app

RUN npm i lerna -g --loglevel notice

COPY packages/server ./packages/server
COPY packages/client ./packages/client
COPY packages/overlays ./packages/overlays

COPY package.json .
COPY lerna.json .

WORKDIR /usr/src/app
RUN lerna bootstrap

WORKDIR /usr/src/app/packages/client
RUN npm run build

EXPOSE 3000

WORKDIR /usr/src/app/packages/server
CMD [ "npm", "start" ]
