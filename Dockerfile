FROM  mhart/alpine-node-auto:latest
COPY . /var/www
RUN cd /var/www; yarn install; ls;
WORKDIR /var/www
EXPOSE 8007
CMD yarn run build && yarn run bootstrap && yarn run start