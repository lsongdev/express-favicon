'use strict'

const express = require('express');
const favicon = require('../index');
const http = require('http');

const app = express();

app.use(favicon(__dirname + '/favicon.ico'));


app.listen(3001, () => {
	console.log('server is running .');
	http.get('http://127.0.0.1:3001/blabla/favicon.ico', (res) => {
		let data = '';
		res.on('data', (chunk) => {
			data += chunk;
		});
		res.on('end', () => {
			const is_ok = data.trim() === 'test';
			console.log('test: %s', is_ok);
			process.exit(is_ok ? 0 : 1);
		});
	});
});
