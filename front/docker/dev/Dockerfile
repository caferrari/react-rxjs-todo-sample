FROM node:12-alpine

WORKDIR /src

COPY package.json yarn.lock /src/

RUN yarn

COPY .env tsconfig.json /src/

CMD [ "yarn", "start" ]