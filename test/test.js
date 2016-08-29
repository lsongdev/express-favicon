'use strict'

const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('../index');
const http = require('http');
const assert = require('assert');

const file = path.join(__dirname, 'favicon.ico');
const data = fs.readFileSync(file);

const app = express();
app.use(favicon(file));


app.listen(3001, () => {
	console.info('server is running.');
	http.get('http://127.0.0.1:3001/blabla/favicon.ico', (res) => {
		let received = [];
		res.on('data', (chunk) => received.push(chunk));
		res.on('end', () => {
			const isEqual = Buffer.compare(data, Buffer.concat(received)) === 0;
			assert.ok(isEqual, 'received data is not equal');
			console.info('test passed.');
			process.exit(0);
		});
	})
	.on('error', assert.ifError);
});
