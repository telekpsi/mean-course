FROM node:16.14.0 as build
WORKDIR /usr/src/app
COPY package*.json ./ 
RUN npm install -g @angular/cli 
RUN npm install 
COPY . ./ 
RUN npm run build 
FROM nginx: alpine
COPY --from=build /source/dist/meancourse /usr/share/nginx/html
COPY --from=build /source/nginx.conf /etc/nginx/conf.d/
EXPOSE 8080
CMD [ "node", "server.js" ]
