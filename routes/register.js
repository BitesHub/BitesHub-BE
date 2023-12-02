const express = require('express');
const { check, validationResult, body } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

require('../utils/db');
const User = require('../model/user');

router.get('/', (req, res) => {
	res.render('register', {
		title: 'Halaman Register',
		layout: './layouts/main-layout',
	});
});

router.post(
	'/',
	[
		check('username', 'Username Sudah Digunakan!').custom(async (username) => {
			const dupe = await User.findOne({ username });
			if (dupe) throw new Error();
			return true;
		}),
		body('email')
			.isEmail()
			.withMessage('Email yang anda input tidak valid')
			.custom(async (email) => {
				const dupe = await User.findOne({ email });
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
			res.json(errors.array());
		} else {
			const { username, email, password } = req.body;
			const saltRound = 10;
			bcrypt
				.hash(password, saltRound)
				.then((hash) => {
					User.insertMany({
						username,
						email,
						password: hash,
					});
				})
				.then(() => {
					res.redirect('/login');
				});
		}
	}
);

module.exports = router;
