FROM node:alpine

WORKDIR /app/backend

COPY . .

RUN yarn install

RUN yarn run build

EXPOSE 5000

CMD [ "yarn", "start" ]
