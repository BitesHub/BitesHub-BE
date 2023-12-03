const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../utils/auth');
require('dotenv').config();

router.get('/', authenticateToken, (req, res) => {
	res.send('homeUser');
});

router.get('/data', authenticateToken, (req, res) => {
	res.render('index', {
		title: 'halaman Home',
		layout: './layouts/main-layout',
	});
});

module.exports = router;
