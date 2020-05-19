FROM node:lts-alpine

# Create api directory
WORKDIR /app
ADD . /app

EXPOSE $PROXY_PORT

CMD yarn && yarn dev
