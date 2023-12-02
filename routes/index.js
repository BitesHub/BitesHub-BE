const express = require('express');
const { authenticateToken } = require('../utils/auth');
const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
	if (req.cookies.token) {
		res.render('index', {
			title: 'halaman home',
			layout: './layouts/main-layout',
		});
	}
});

module.exports = router;
