FROM node:14.3.0-alpine3.10

RUN apk add --update tini

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm cache clean --force

COPY . .

CMD [ "/sbin/tini", "--", "npm", "start" ]