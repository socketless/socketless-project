const request = require('request');

const SERVER_URL='http://localhost:4001/';

class SocketlessClient {

  constructor(opts = {}) {
    // connect to REDIS, fetch server list
    console.log(opts);
  }

  addTag(sid, tag) {
    request.post({ url: SERVER_URL+'addTag', json: { sid, tag }}, (err, res, body) => {
      console.log('addTag query got back', body);
    });
  }

  sendToSid(sid, msg) {
    // check if server list is up to date
    // send to correct server
  }

  sendToTag(tag, msg) {
    request.post({ url: SERVER_URL+'sendToTag', json: { tag, msg }}, (err, res, body) => {
      console.log('sendToTag query got back', body);
    });
  }

  sendToAll(msg, extra) {
    // check if server list up to date
    // send to all servers
  }

}

module.exports = SocketlessClient;
