FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env .env

RUN npx prisma generate

RUN npm run build

EXPOSE 3002

#CMD ["node", "dist/main"]
CMD ["npm", "run", "start:dev"]