FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN cp .env.example .env

RUN npm run build

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/docker-entrypoint.sh"]
