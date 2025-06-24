FROM node:20.21.0

WORKDIR /home

COPY ./ ./

RUN yarn install
RUN yarn build
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
