FROM nginx:1.17-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY configs/nginx.dev.conf /etc/nginx/nginx.conf

EXPOSE 80
