const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
	// const authHeader = req.headers['authorization'];
	// const token = authHeader && authHeader.split(' ')[1];
	const token = req.cookies.token;
	if (!token) return res.redirect('login');
	jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err) => {
		if (err) return res.redirect('/login');
	});
	next();
};

const makeToken = (payload, secret, expiresIn) => {
	const token = jwt.sign(payload, secret, {
		expiresIn,
	});

	return token;
};

module.exports = { authenticateToken, makeToken };
