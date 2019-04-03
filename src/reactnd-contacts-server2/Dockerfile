FROM node:alpine
RUN apk add --no-cache git
RUN git clone -q https://github.com/udacity/reactnd-contacts-server2.git
WORKDIR reactnd-contacts-server2
RUN npm install > /dev/null
EXPOSE 5001
CMD [ "node", "server.js" ]
