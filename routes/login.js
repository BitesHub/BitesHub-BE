const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const { makeToken } = require('../utils/auth');

require('dotenv').config();

const { getDataByKey } = require('../utils/firestoreClient');

router.post(
	'/',
	check('email', 'Email invalid').isEmail(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({
				errror: true,
				status: 'failed',
				message: errors.array(),
			});
			return false;
		}
		const { email, password } = req.body;
		const cek = await getDataByKey('users', 'email', email);
		if (cek.data) {
			const decrypt = await bcrypt.compare(password, cek.data.password);
			if (decrypt) {
				const payload = {
					id: cek.id,
					username: cek.data.username,
				};
				const token = makeToken(payload, process.env.JWT_SECRET_TOKEN);
				res.status(200).json({
					error: false,
					status: 'success',
					message: 'Login success',
					loginResult: {
						userId: cek.id,
						username: cek.data.username,
						token,
					},
				});
			} else {
				res.status(401).json({
					errror: true,
					status: 'failed',
					message: 'Login failed, username or password wrong',
				});
			}
		} else {
			res.status(401).json({
				errror: true,
				status: 'failed',
				message: 'Login failed, username or password wrong',
			});
		}
	}
);

module.exports = router;
