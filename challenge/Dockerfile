FROM node:14.20.0

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install

EXPOSE 4000

COPY . .

RUN npm run build
