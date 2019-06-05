FROM node:8

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --quiet
RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD [ "nodemon", "-L", "src/index.js" ]