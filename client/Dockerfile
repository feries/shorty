FROM node:lts-alpine

# Create api directory
WORKDIR /app
ADD . /app

EXPOSE ${CLIENT_PORT}

# Install globals
RUN yarn global add create-react-app
RUN yarn install --force

CMD yarn && yarn start
