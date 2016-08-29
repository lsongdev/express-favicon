'use strict'

const fs = require('fs');

module.exports = (icon) => {
	let iconStream = null;
	if(fs.existsSync(icon)){
		iconStream = fs.readFileSync(icon);
	}else{
		throw new Error('favicon.ico is not found .');
	}
	return (req, res, next) => {
		if(/\/favicon\.ico$/.test(req.url)){
			res.set('Content-Type', 'image/x-icon');
			res.send(iconStream);
		}else{
			next();
		}
	}
};

