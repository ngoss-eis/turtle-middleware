FROM node:carbon

WORKDIR /usr/src/app
COPY package.json ./
COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
