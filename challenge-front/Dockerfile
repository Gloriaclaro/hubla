FROM node:19.5.0

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install

EXPOSE 3000

COPY . .

RUN npm run build

ENV BACKEND_HOST backend

CMD ["npm", "run", "dev"]