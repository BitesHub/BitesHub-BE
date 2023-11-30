const express = require('express');
const { check, validationResult, body } = require('express-validator');
const router = express.Router();

require('../utils/db');
const User = require('../model/user');

router.get('/', (req, res) => {
	res.send('homeUser');
});

/* GET users listing. */
router.get('/login', (req, res) => {
	res.render('login', {
		title: 'Halaman Login',
		layout: './layouts/main-layout',
	});
});

router.post(
	'/login',
	check('email', 'Email yang anda masukkan tidak valid').isEmail(),
	async (req, res) => {
		const errors = validationResult(req);
		const { email, password } = req.body;
		const cek = await User.findOne({ email });
		if (cek && cek.password === password) {
			res.send('login berhasil');
		} else {
			res.send('email atau password salah!');
		}
	}
);

router.get('/register', (req, res) => {
	res.render('register', {
		title: 'Halaman Register',
		layout: './layouts/main-layout',
	});
});

router.post(
	'/register',
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
			res.send(errors.array());
		} else {
			const { username, email, password } = req.body;
			await User.insertMany({
				username,
				email,
				password,
			}).then((result) => {
				res.send(result);
			});
		}
	}
);

module.exports = router;
