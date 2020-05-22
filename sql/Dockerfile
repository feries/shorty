FROM mysql:8.0

ADD bootstrap/init.sql /docker-entrypoint-initdb.d
ADD seed/dev.sql /docker-entrypoint-initdb.d
