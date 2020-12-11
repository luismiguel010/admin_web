#stage 1
FROM node:15.4.0-alpine3.10 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/admin-web /usr/share/nginx/html