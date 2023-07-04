FROM node:18-alpine

WORKDIR /api

COPY . .

RUN yarn

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start:build"]
