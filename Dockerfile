FROM node:16

WORKDIR .

COPY . .

RUN npm install

CMD ["node", "index.js"]
