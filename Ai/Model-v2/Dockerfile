# FROM --platform=linux/amd64 ubuntu:20.04
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx puppeteer browsers install chrome

COPY . .

CMD ["node", "scrape.js"]
