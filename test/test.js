'use strict'

const fs = require('fs');
const path = require('path');
const http = require('http');
const assert = require('assert');
const express = require('express');
const favicon = require('..');

const file = path.join(__dirname, 'favicon.png');

const app = express();
app.use(favicon(file));

const server = http.createServer(app);
server.listen(3001, () => {
 console.info('server is running.');
 http.get('http://127.0.0.1:3001/blabla/favicon.png', (res) => {
   assert.equal(res.headers['content-type'], 'image/png', 'wrong mime type');
   let received = [];
   res.on('data', (chunk) => received.push(chunk));
   res.on('end', () => {
        const data = fs.readFileSync(file);
    const isEqual = Buffer.compare(data, Buffer.concat(received)) === 0;
    assert.ok(isEqual, 'received data is not equal');
    console.info('test passed.');
    server.close((() => process.exit(0)));
   });
  })
  .on('error', assert.ifError);
});