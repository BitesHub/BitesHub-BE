const express = require('express');
const { check, validationResult, body } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

const { addDataUsers, getDataByKey } = require('../utils/firestoreClient');

router.post(
	'/',
	[
		check('username', 'Username Sudah Digunakan!').custom(async (username) => {
			const dupe = await getDataByKey('username', username);
			if (dupe) throw new Error();
			return true;
		}),
		body('email')
			.isEmail()
			.withMessage('Email yang anda input tidak valid')
			.custom(async (email) => {
				const dupe = await getDataByKey('email', email);
				if (dupe) throw new Error('Email Sudah Digunakan!');
				return true;
			}),
		body('password')
			.isLength({ min: 5 })
			.withMessage('Password harus lebih dari 5 digit')
			.custom((password, { req }) => {
				const confirmPass = req.body.confirmPass;
				if (password !== confirmPass) {
					throw new Error('Confirm password tidak sama dengan Password');
				}
				return true;
			}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({
				error: true,
				status: 'failed',
				message: errors.array(),
			});
		} else {
			const { username, email, password } = req.body;
			const saltRound = 10;
			bcrypt
				.hash(password, saltRound)
				.then((hash) => {
					addDataUsers({ username, email, password: hash });
				})
				.then(() => {
					res.status(201).json({
						error: false,
						status: 'success',
						message: 'User Created',
					});
				});
		}
	}
);

module.exports = router;
