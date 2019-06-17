FROM node:12-alpine

WORKDIR /src

COPY package.json yarn.lock /src/

RUN yarn

CMD [ "yarn", "dev-start" ]