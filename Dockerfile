FROM node:16

WORKDIR /booking-site-back
COPY package.json .
RUN npm install
COPY . .
CMD npm start
