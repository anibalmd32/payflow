FROM node:lts-alpine3.19 AS base
ENV DIR /pf_api
WORKDIR $DIR

FROM base AS build
RUN apk update && apk add --no-cache dumb-init
COPY package*.json $DIR
COPY tsconfig.json $DIR
COPY src $DIR
RUN npm ci
RUN npm run build && npm prune --production

FROM base AS production
ENV USER=node
ENV NODE_ENV=prod
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist
USER $USER
CMD [ "dumb-init", "node", "dist/app.js" ]