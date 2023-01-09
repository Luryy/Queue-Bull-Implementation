FROM node:16-alpine

RUN apk add --no-cache \
        curl \
        build-base \
        g++ \
        python3 \
        libcap

COPY . /app

WORKDIR /app

RUN yarn ci --silent

RUN yarn run build && rm -rf node_modules && yarn ci --production && yarn cache clean -f

RUN rm -rf /var/cache/apk/* \
  && rm -rf /usr/local/share/.cache/yarn/*

ENV NODE_ENV=production
RUN chown -R node:node /app

RUN setcap 'cap_net_bind_service=+ep' /usr/local/bin/node
USER node

ENV TZ=America/Sao_Paulo

CMD ["yarn","run", "start:prod", "--silent"]
