FROM node:10.8.0

RUN mkdir -p /opt/app

WORKDIR /opt
RUN apt-get -q update && apt-get -qy install netcat
RUN npm i npm@latest -g

WORKDIR /opt/app
COPY package.json package-lock.json* /opt/app/

WORKDIR /opt/app
RUN npm install && npm cache clean --force
ENV PATH /opt/app/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app

RUN chmod +x ./scripts/wait-for.sh
CMD sh -c './scripts/wait-for.sh mysql-server:3306 && nodemon server.js'

EXPOSE 5000