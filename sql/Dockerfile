FROM mysql:8.0

COPY bootstrap/init.sql /docker-entrypoint-initdb.d/
COPY seed/dev.sql /docker-entrypoint-initdb.d/
