FROM postgres:14

COPY db/init.sql /docker-entrypoint-initdb.d/

RUN chmod +r /docker-entrypoint-initdb.d/init.sql
