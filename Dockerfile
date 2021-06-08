FROM node:14

RUN mkdir -p /app
WORKDIR /app
ADD . /app

RUN npm ci

CMD ["npm", "start"]