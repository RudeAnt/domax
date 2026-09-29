FROM node:22-alpine

WORKDIR /app

# Сначала только манифесты для кэширования слоев
COPY package*.json ./
RUN npm install

# Копируем остальной код
COPY . .

EXPOSE 8081

# Режим разработки с автоперезагрузкой (long polling к MAX, не принимает входящих HTTP-запросов
# кроме внутреннего /notify на EXPOSE-порту — см. src/notifyServer.ts)
CMD ["npm", "run", "dev"]
