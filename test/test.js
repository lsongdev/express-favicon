var express = require('express');
var favicon = require('../index');
var http = require('http');

var app = express();

app.use(favicon(__dirname + '/favicon.ico'));


app.listen(3001, function(){
	console.log('server is running .');
	http.get('http://127.0.0.1:3001/blabla/favicon.ico', function(res){
		var data = '';
		res.on('data', function(chunk){
			data += chunk;
		});
		res.on('end', function(){
			var is_ok = (data.trim() == 'test');
			console.log('test: %s', is_ok);
			process.exit(is_ok ? 0 : 1);
		});
	});
	
});
