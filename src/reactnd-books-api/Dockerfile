FROM node:alpine
WORKDIR /app
COPY . .
RUN yarn install > /dev/null
EXPOSE 5001
CMD [ "node", "server.js" ]
