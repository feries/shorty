FROM node:lts

# install our dependencies
RUN  apt-get update && apt-get install python make g++ gcc libtool

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && yarn
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
ADD . /opt/app

EXPOSE $SERVER_PORT

CMD yarn dev
