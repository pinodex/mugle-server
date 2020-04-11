FROM node:12.16-alpine3.11

ENV NODE_ENV=production

WORKDIR /mugle
COPY . .

RUN npm install

CMD npm start
