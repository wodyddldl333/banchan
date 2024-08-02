# Stage 1: Build the React app
#첫번째 앱 (웹)
FROM node:20-alpine AS build-web

WORKDIR /app/Web

COPY package.json ./
RUN npm install

COPY packages/Web .

RUN npm run build

RUN npm install --save-dev @types/node

RUN npm install --save-dev ts-node

RUN npm install @types/node --save-dev

RUN npm install @types/crypto-js --save-dev

#두번째 앱 (모바일)

FROM node:20-alpine AS build-mobile

WORKDIR /app/Mobile

COPY package.json ./
RUN npm install

RUN npm install --save-dev @types/node

RUN npm install --save-dev ts-node

RUN npm install @types/node --save-dev

RUN npm install @types/crypto-js --save-dev

COPY packages/Mobile .

RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build-web /app/Web/dist /usr/share/nginx/html
COPY --from=build-mobile /app/Mobile/dist /usr/share/nginx/html

COPY ./shared/public/assets /usr/share/nginx/html/assets
# Copy custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]