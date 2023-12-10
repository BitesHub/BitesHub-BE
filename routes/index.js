const express = require('express');
const { authenticateToken } = require('../utils/auth');
// const { FieldPath } = require('@google-cloud/firestore');
const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
	res.status(200).json({
		data: {
			nama: 'blabla',
			datanya: 'blabla',
		},
	});
});

module.exports = router;
