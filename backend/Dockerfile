FROM node:22-alpine

WORKDIR /app

# Копируем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходники
COPY . .

EXPOSE 3000

# Режим разработки с автоперезагрузкой
CMD ["npm", "run", "start:dev"]

