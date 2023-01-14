FROM node:16

WORKDIR /usr/app/client

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . ./

RUN yarn build

EXPOSE 3000