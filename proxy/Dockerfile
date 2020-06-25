FROM nfqlt/node10:latest

ARG NODE_ENV
ARG PROXY_HOST
ARG PROXY_PORT
ARG DOMAIN
ARG SENTRY_URL_SHORTENER_PROXY_DNS
ARG DB_URL
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG DB_CONNECTION_LIMIT

ENV NODE_ENV=${NODE_ENV}
ENV PROXY_HOST=${PROXY_HOST}
ENV PROXY_PORT=${PROXY_PORT}
ENV DOMAIN=${DOMAIN}
ENV SENTRY_URL_SHORTENER_PROXY_DNS=${SENTRY_URL_SHORTENER_PROXY_DNS}
ENV DB_URL=${DB_URL}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV DB_CONNECTION_LIMIT=${DB_CONNECTION_LIMIT}

# Create app directory
WORKDIR /usr/src/proxy

# add `/proxy/node_modules/.bin` to $PATH
ENV PATH /proxy/node_modules/.bin:$PATH

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE ${PROXY_PORT}

RUN echo "Exposing Proxy instance at port: ${PROXY_PORT}"

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && npm start
