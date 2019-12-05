# socketless

WIP: websocket router for serverless apps

## Usage

```js
const server = require('socketless/server');

// default settings, use environment variables
server.init();

// OR, with optional config
server.init({
  // TODO
});
```

```
SOCKETLESS_WEBSOCKET_PORT=3000
SOCKETLESS_REST_PORT=3001

SOCKETLESS_ON_CONNECT_URL=
SOCKETLESS_ON_MESSAGE_URL=

# TODO
SOCKETLESS_REST_ALLOW=127.0.0.1
REDIS_DB=
```
