FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

COPY .env ./

RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD [ "node", "index.js" ]

