FROM mysql:5.7

COPY bootstrap/init.sql /docker-entrypoint-initdb.d/
COPY seed/dev.sql /docker-entrypoint-initdb.d/
