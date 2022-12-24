FROM node:19.3.0 as frontend-build

WORKDIR /app

ENV PATH /app/node_module/.bin:$PATH

COPY packages/client/ ./packages/client
COPY packages/server/ ./packages/server
COPY package.json ./
COPY lerna.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
RUN yarn workspace @scoreman/client build

EXPOSE 3000

CMD yarn workspace @scoreman/server run start --baseUrl=/scoreman --useCors=true

