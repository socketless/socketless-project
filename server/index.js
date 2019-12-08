const WebSocket = require('ws');
const express = require("express");
const uuidv4 = require('uuid/v4');
const request = require('request');
const bodyParser = require('body-parser');

const SOCKETLESS_WEBSOCKET_PORT = process.env.SOCKETLESS_WEBSOCKET_PORT || 4000;
const SOCKETLESS_REST_PORT = process.env.SOCKETlESS_WEBSOCKET_PORT || 4001;
const SOCKETLESS_ON_MSG_URL = 'http://localhost:3000/api/onMsg';

/*
  TODO

  - API
    - debug=true parameter, return number of sockets sent to, timing stats
    - should always return JSON answer with some info.

*/

const server = {

  init(config) {
    this.instanceId = uuidv4();

    const wss = this.wss = new WebSocket.Server({
      port: SOCKETLESS_WEBSOCKET_PORT,
      // allow optional settings
    });

    console.log("Listening for WebSocket connections on port "
      + SOCKETLESS_WEBSOCKET_PORT);

    this.sockets = new Map();
    this.socketCounter = 0;
    this.tags = new Map();

    wss.on('connection', ws => {
      const socketId = this.socketCounter++;
      this.sockets.set(socketId, ws);

      // REST call to ON_CONNECTION_URL
      console.log('client connect', socketId);

      ws.on('message', message => {
        console.log('received: %s', message);
        request.post({url: SOCKETLESS_ON_MSG_URL, json: { sid: socketId, data: message }}, (error, response, body) => {
          console.log('error:', error);
          console.log('statusCode:', response && response.statusCode);
          console.log('body:', body);
        });
      });

      // ws.send('something');
    });

    // REST server
    const rest = express();

    rest.listen(SOCKETLESS_REST_PORT, () => {
      console.log("Listening for internal REST requests on port "
        + SOCKETLESS_REST_PORT);
    });

    //rest.use(bodyParser.json());

    rest.get('/addTag', (req, res) => {
      console.log('server addTag', req.query, req.body);
      const socket = this.sockets.get(parseInt(req.query.sid));
      const tag = req.query.tag;

      if (!this.tags.has(tag))
        this.tags.set(tag, new Set());

      this.tags.get(tag).add(socket);
      res.sendStatus(200);
    });

    rest.post('/sendToTag', (req, res) => {
      console.log('server post', req.query, req.body);

      const socketsWithTag = this.tags.get(req.query.tag);

      if (socketsWithTag)
        req.on('data', chunk => {
          const str = chunk.toString();
          socketsWithTag.forEach(
            socket => socket.send(str)
          );
        });

      res.sendStatus(200);
    });

  }

};


module.exports = server;
