FROM node:18-alpine

RUN npm install -g pnpm

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Create app directory
WORKDIR /home/node/app


COPY package.json ./
COPY pnpm-lock.yaml ./

USER node

RUN pnpm install

COPY --chown=node:node . .

EXPOSE 5050

CMD [ "pnpm", "start:prod" ]

