FROM node:lts-alpine

# Create api directory
WORKDIR /app
ADD . /app

EXPOSE CLIENT_PORT

# Install globals
RUN yarn global add create-react-app

CMD yarn && yarn start
