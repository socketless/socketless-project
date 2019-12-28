# socketless

WIP: A websocket router for serverless apps.

Copyright (c) 2019 by Gadi Cohen, MIT licensed.

| Package           | Version | Build | Coverage
| ----------------- | ------- | ----- | --------
| [socketless-server](https://github.com/socketless/socketless-server) | ![npm](https://img.shields.io/npm/v/socketless-server) | [![CircleCI](https://img.shields.io/circleci/build/github/socketless/socketless-server)](https://circleci.com/gh/socketless/socketless-server) | [![coverage](https://img.shields.io/codecov/c/github/socketless/socketless-server)](https://codecov.io/gh/socketless/socketless-server)
| [socketless-client](https://github.com/socketless/socketless-client) | ![npm](https://img.shields.io/npm/v/socketless-client) | [![CircleCI](https://img.shields.io/circleci/build/github/socketless/socketless-client)](https://circleci.com/gh/socketless/socketless-client) |[![coverage](https://img.shields.io/codecov/c/github/socketless/socketless-client)](https://codecov.io/gh/socketless/socketless-client)

## Introduction

Socketless consists of two parts...

* A socketless **server**, that runs as a microservice
  * Routes incoming messages to serverless lambdas
  * REST API to interact with and send messages to open sockets.
  * Simple data associations useful for the above.

* A socketless **client**, to be used inside your serverless lambdas.
  * Simplifies working with incoming messages and the REST API.

## Quick Start

### Server

Very little setup is required for basic use.  You just need:

```js
new require('socketless-server')();
```

and to set the following environment variables:

* SOCKETLESS_ON_CONNECT_URL - (optional) lambda to be called on new connection
* SOCKETLESS_ON_MESSAGE_URL - lambda to be called on new message received on a socket
* SOCKETLESS_WEBSOCKET_PORT - default: 3000
* SOCKETLESS_REST_PORT - default: 3001

For more information and optional config, see the [server README](./server/README.md).

For an example deployment on Zeit Now v1 (of just the router), see [socketless-examples/draw/server](https://github.com/socketless/socketless-examples/tree/master/draw/server) (demo at [draw.socketless.org](https://draw.socketless.org/), which combines with Zeit Now v2 serverless lambdas).

### Client

The client (running inside of your serverless lambdas) offers convenience methods on incoming messages and over the REST
API and looks like this (example `api/onMsg.js` lambda):

```js
const SocketlessClient = require('socketless-client');
const socketless = new SocketlessClient();

module.exports = (req, res) => {

  const imr = socketless.incoming(req);
  const msg = req.body; // use whatever body-parser suits your app.

  // Methods relevant to the socket that sent the message
  imr.setMessageData('sid', 'abc'); // available on next request in imr.data
  imr.addTag(msg.room);             // include socket in socketless.sendToTag

  // Methods to communicate with other sockets
  socketless.sendToTag(msg.room, msg.message);

});
```

For more examples and API docs, see the [client README](./client/README.md).

For an example deployment on Zeit Now v2 (of the serverless lambdas), see [socketless-examples/draw/server](https://github.com/socketless/socketless-examples/tree/master/draw/app/api) (demo at [draw.socketless.org](https://draw.socketless.org/), which combines with router hosted on Zeit Now v1).

## Roadmap

* Error handling, debug logging
* Tests
* Support multiple apps via host-based routing
* Support multiple instances (via redis? etcd?)
