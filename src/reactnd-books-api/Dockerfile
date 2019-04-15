FROM node:alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install > /dev/null
COPY . .
EXPOSE 5001
CMD [ "node", "server.js" ]
