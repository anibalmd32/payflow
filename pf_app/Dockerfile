FROM node:lts-alpine3.19 AS base
ENV DIR /pf_app
WORKDIR $DIR

FROM base AS build
RUN apk update && apk add --no-cache dumb-init
COPY pf_app/package*.json $DIR
COPY pf_app/tsconfig*.json $DIR
COPY pf_app/src $DIR/src
COPY pf_app/public $DIR/public
COPY pf_app/prisma $DIR/prisma
RUN npm ci
RUN npm run build && npm prune --production

FROM base AS production
ENV USER=node
ENV NODE_ENV=prod
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist
COPY --from=build $DIR/prisma $DIR/prisma
COPY --from=build $DIR/public $DIR/public
USER $USER
CMD [ "dumb-init", "node", "dist/app.js" ]