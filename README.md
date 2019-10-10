# REGISGEN

## About the author:

This project has been developed by Fernando Domínguez Santamaría ([fernandomain.com](https://fernandomain.com)) as part of the final degree work for his Degree in Computer Engineering at the International University of La Rioja ([UNIR](https://wwww.unir.net)).

## About the project:

This project consists in a proof of concept of an electronic registry of general-purpose documents.

It makes use, among others, of the following technologies:

1. [Node.js](https://nodejs.org), [Express](https://expressjs.com) and [MySQL](https://www.mysql.com/) *(for the back-end part of the system; web and db servers)*.
2. [Bootstrap](https://getbootstrap.com/), [AngularJS](https://angularjs.org/) and [Pug](https://pugjs.org) *(for the front-end part of the system)*.
3. [Docker](https://www.docker.com/), [Npm](ww.npmjs.com), [Mocha.js](https://mochajs.org/) and [Chai.js](https://chaijs.com/)*(for the development process cycle; build, deploy, testing)*.

For start using this system, you only need to have Docker installed in your computer, nothing else. The docker-compose.yml file creates a bind mount directory that allows you to test anyting live, just change the code for the server or client and it will inmediately become available.

The data for the MySQL will persist between launches.

To bring the project up first [install Docker and docker-compose](https://www.docker.com/), then run:

```
docker-compose up
```

The docker-compose.yml file routes port 80 on your host to the AngularJS app running on 3000 on the Docker environment, so once the system is up just go to http://localhost.

To bring it down:

```
docker-compose down
```

If you change your Dockerfile and must rebuild the MySQL, Node.js or AngularJS app images, run:

```
docker-compose up --build
```


1. Starts a MySQL server container based on the [official image](https://hub.docker.com/_/mysql/),
2. Starts a [Node.js 10.8.0](https://hub.docker.com/_/node/) app that waits for the database to become responsive, and run all migrations and seeds if necessary,
3. Starts an AngularJS app (also based on [Node.js 10.8.0](https://hub.docker.com/_/node/)).

You only need to have [Docker](https://www.docker.com/) installed in your computer, nothing else.

## License:

You can find the license for this project at the LICENSE file.