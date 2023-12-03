const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		res.status(401).json({
			error: true,
			status: 'unauthorize',
			message: 'Invalid token',
		});
		return false;
	}
	jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err) => {
		if (err) {
			res.status(401).json({
				error: true,
				status: 'unauthorize',
				message: 'Invalid token',
			});
			return false;
		}
	});
	next();
};

const makeToken = (payload, secret) => {
	const token = jwt.sign(payload, secret);

	return token;
};

module.exports = { authenticateToken, makeToken };
