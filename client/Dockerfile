FROM node:10

ARG NODE_ENV
ARG CLIENT_PORT
ARG SERVER_HOST
ARG SERVER_PORT
ARG HTTP_SCHEME
ARG DOMAIN
ARG SENTRY_URL_SHORTENER_CLIENT_DNS

ENV NODE_ENV=${NODE_ENV}
ENV REACT_APP_PORT=${CLIENT_PORT}
ENV REACT_APP_SERVER_HOST=${SERVER_HOST}
ENV REACT_APP_SERVER_PORT=${SERVER_PORT}
ENV REACT_APP_HTTP_SCHEME=${HTTP_SCHEME}
ENV REACT_APP_DOMAIN=${DOMAIN}
ENV REACT_APP_SENTRY_URL_SHORTENER_CLIENT_DNS=${SENTRY_URL_SHORTENER_CLIENT_DNS}

# set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install
RUN npm rebuild node-sass

# Copies everything over to Docker environment
COPY . .

# Uses port which is used by the actual application
EXPOSE ${CLIENT_PORT}

RUN echo "Exposing Client instance at port: ${CLIENT_PORT}"

# Finally runs the application
CMD [ "npm", "start" ]
