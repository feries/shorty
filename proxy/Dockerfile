FROM node:lts-alpine
MAINTAINER  (Claudio Quaglia) <claudio.quaglia@feries.it>

# Create api directory
WORKDIR /app
ADD . /app

EXPOSE PROXY_PORT

CMD yarn && yarn start
