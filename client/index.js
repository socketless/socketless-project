const request = require('request');
const querystring = require('querystring');

const SERVER_URL = process.env.SOCKETLESS_REST_URL || 'http://localhost:4000/';

function constructUrl(endPoint, query) {
  return SERVER_URL + endPoint + '?' + querystring.stringify(query);
}

function setReqOptsFromMsg(msg, reqOpts) {
  if (!reqOpts.headers)
    reqOpts.headers = {};

  if (typeof msg === 'string') {
    reqOpts.body = msg;
    reqOpts.headers['Content-Type'] = 'text/plain';
  } else
    throw new Error("unsure how to handle non-string types for now, open an issue");
}

class SocketlessClient {

  constructor(opts = {}) {
    // connect to REDIS, fetch server list
    console.log(opts);
  }

  incoming(req) {
    const msg = new IncomingMessageRequest(req);
    return msg;
  }

  sendToSid(sid, msg) {
    // check if server list is up to date
    // send to correct server
  }

  sendToTag(tag, msg) {
    const reqOpts = { url: constructUrl('sendToTag', { tag }) };
    setReqOptsFromMsg(msg, reqOpts);

    request.post(reqOpts, (err, res, body) => {
      console.log('sendToTag query got back', body);
    });
  }

  sendToAll(msg, extra) {
    // check if server list up to date
    // send to all servers
  }

}

class IncomingMessageRequest {

  constructor(req) {
    if (req.headers['x-socketless-msgdata'])
      this.data = JSON.parse(req.headers['x-socketless-msgdata']);

    this.sid = req.query.sid;

    console.log(this);
  }

  addTag(tag) {
    const url = constructUrl('addTag', { sid: this.sid, tag });
    request(url, (err, res, body) => {
      console.log('addTag query got back', body);
    });
  }

  setMessageData(key, val) {
    const url = constructUrl('setMessageData', { sid: this.sid, key, val });
    request(url, (err, res, body) => {
      console.log('setMessageData query got back', body);
    });
  }

}

module.exports = SocketlessClient;
