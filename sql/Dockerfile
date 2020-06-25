FROM mysql:8.0

COPY bootstrap/1-init.sql /docker-entrypoint-initdb.d/
COPY seed/2-dev.sql /docker-entrypoint-initdb.d/
