FROM node:10.15.3-alpine

ENV APP_WORKDIR=/usr/src/app/

RUN apk update && apk upgrade && \
   apk add --virtual build-deps git openssh-client py-pip make g++

COPY package.json package-lock.json $APP_WORKDIR
WORKDIR $APP_WORKDIR

RUN npm ci
COPY .env.example tsconfig.json tsconfig-app.json $APP_WORKDIR
COPY src $APP_WORKDIR/src
RUN npm run build

RUN apk del build-deps
RUN rm -rf tsconfig.json tsconfig-app.json src
RUN npm prune --production

EXPOSE 3000
ENTRYPOINT ["node", "build/index.js"]
