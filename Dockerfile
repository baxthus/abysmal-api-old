FROM node:18

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENV PORT=8080

EXPOSE 8080

cmd [ "npm", "start" ]