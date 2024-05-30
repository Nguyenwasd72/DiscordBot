# will work on this later
# this file is for hosting

FROM node:16

WORKDIR .
COPY . .

RUN npm install
CMD ["node", "index.js"]
