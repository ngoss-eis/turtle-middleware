FROM node:carbon

WORKDIR /usr/src/app
COPY package.json ./

RUN npm install && npm build

EXPOSE 3000

CMD [ "npm", "start" ]
