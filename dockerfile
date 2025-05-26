FROM alpine
COPY . /opt/nodos
WORKDIR /opt/nodos
RUN apk update
RUN apk upgrade
RUN apk add nodejs npm python3
RUN npm i
EXPOSE 5000

