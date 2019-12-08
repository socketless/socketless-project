const request = require('request');
const querystring = require('querystring');

const SERVER_URL='http://localhost:4001/';

function constructUrl(endPoint, query) {
  return SERVER_URL + endPoint + '?' + querystring.stringify(query);
}

class SocketlessClient {

  constructor(opts = {}) {
    // connect to REDIS, fetch server list
    console.log(opts);
  }

  addTag(sid, tag) {
    const url = constructUrl('addTag', { sid, tag });
    request(url, (err, res, body) => {
      console.log('addTag query got back', body);
    });
  }

  sendToSid(sid, msg) {
    // check if server list is up to date
    // send to correct server
  }

  sendToTag(tag, msg) {
    const url = constructUrl('sendToTag', { tag });
    request.post({ url, body: msg }, (err, res, body) => {
      console.log('sendToTag query got back', body);
    });
  }

  sendToAll(msg, extra) {
    // check if server list up to date
    // send to all servers
  }

}

module.exports = SocketlessClient;
