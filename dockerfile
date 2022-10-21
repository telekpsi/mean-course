FROM node:16.14.0 as build
WORKDIR /usr/src/app
COPY package*.json ./ 
RUN npm ci
COPY . ./ 
RUN npm run build 
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/meancourse /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/
EXPOSE 8080
