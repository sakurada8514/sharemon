FROM mysql/mysql-server:8.0

ENV MYSQL_DATABASE=sharemon_local \
  MYSQL_USER=sharemon \
  MYSQL_PASSWORD=sharemon \
  MYSQL_ROOT_PASSWORD=sharemon \
  TZ=Asia/Tokyo

COPY ./my.cnf /etc/my.cnf
RUN chmod 644 /etc/my.cnf