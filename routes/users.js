const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../utils/auth');
require('dotenv').config();

require('../utils/db');

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
