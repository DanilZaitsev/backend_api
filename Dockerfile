FROM node:16.13.0-alpine

ENV http_proxy=http://webproxystatic-bc.tsl.telus.com:8080/
ENV https_proxy=http://webproxystatic-bc.tsl.telus.com:8080/

RUN apk update
RUN apk add --update make git htop net-tools nano

WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .
RUN mkdir -p logs

EXPOSE 3000

CMD ["npm", "run", "start"]
