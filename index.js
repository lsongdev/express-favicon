'use strict'

module.exports = (file, pattern) => {
	pattern = pattern || /\/favicon\.(png|ico)$/;

	return (req, res, next) => {
		if (pattern.test(req.url))
			res.sendFile(file);
		else next();
	};
};
