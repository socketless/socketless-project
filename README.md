# socketless

WIP: A websocket router for serverless apps.

Copyright (c) 2019 by Gadi Cohen, MIT licensed.

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

### Client

The client offers convenience methods on incoming messages and over the REST
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

## Roadmap

* Support multiple apps via host-based routing
* Support multiple instances (via redis? etcd?)
