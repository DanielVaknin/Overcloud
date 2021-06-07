# stage 1
FROM node:14.17.0-alpine as build
WORKDIR /app
COPY . .
RUN npm ci && npm run build --prod

# stage 2
FROM nginx:1.21.0-alpine
COPY --from=build /app/dist/client-angular /usr/share/nginx/html
EXPOSE 80
