FROM node:21

RUN mkdir /app

USER node

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN npm ci

COPY --chown=node:node . .

CMD npm install
