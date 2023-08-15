FROM node:18.16.1

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3003

CMD ["node", "server"]