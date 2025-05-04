# Etap budowania aplikacji
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etap serwowania z Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Kopiujemy własny plik konfiguracyjny Nginx (opcjonalnie)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]