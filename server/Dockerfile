FROM node:16

WORKDIR /usr/app/server

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

ENV NODE_PATH dist/src

COPY . ./

RUN yarn build

COPY bin/copy-files.sh /usr/app/server/bin/copy-files.sh
RUN chmod +x /usr/app/server/bin/copy-files.sh
RUN /usr/app/server/bin/copy-files.sh

COPY .env .env

EXPOSE $PORT

# RUN [ "yarn", "start:prod" ]
