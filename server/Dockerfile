FROM node:lts-alpine
MAINTAINER  (Claudio Quaglia) <claudio.quaglia@feries.it>

# Create api directory
WORKDIR /app
ADD . /app

EXPOSE SERVER_PORT

CMD yarn && yarn start
