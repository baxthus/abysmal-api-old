FROM node:18

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 5000

CMD ["node", "dist/index.js"]