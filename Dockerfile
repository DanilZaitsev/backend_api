FROM node:16.13.0-alpine

RUN apk update
RUN apk add --update make git htop net-tools nano

WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .
RUN mkdir -p logs

EXPOSE 3000

CMD ["npm", "run", "start"]
