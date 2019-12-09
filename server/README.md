# socketless-server

WIP: A websocket router for serverless apps.

## Quick Start

```js
const server = require('socketless/server');

server.init(/* optional config */);
```

```
# Lambdas to be called on new connection or incoming message
SOCKETLESS_ON_CONNECT_URL=
SOCKETLESS_ON_MESSAGE_URL=

# Ports (and their defaults) to accept new connections
SOCKETLESS_WEBSOCKET_PORT=3000
SOCKETLESS_REST_PORT=3001

# TODO
SOCKETLESS_REST_ALLOW=127.0.0.1
REDIS_DB=
```
