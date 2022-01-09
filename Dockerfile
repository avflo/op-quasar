FROM node:latest as base

WORKDIR /opfirequasar_app

COPY package.json ./
RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./dist

RUN npm i
RUN npm run build

EXPOSE ${PORT}

CMD [ "node", "dist/main.js" ]
