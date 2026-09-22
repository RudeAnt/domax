FROM node:22-alpine

WORKDIR /app

# Сначала только манифесты для кэширования слоев
COPY package*.json ./
RUN npm install

# Копируем остальной код
COPY . .

EXPOSE 5173

# Запуск Vite с пробросом наружу и поллингом для HMR внутри контейнера
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

