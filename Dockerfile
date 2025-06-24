FROM node:20.15.0

WORKDIR /home

COPY ./ ./

RUN yarn install --ignore-engines
RUN yarn build
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
