const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { makeToken } = require('../utils/auth');
require('dotenv').config();

require('../utils/db');
const User = require('../model/user');
router.use(cookieParser());

router.get('/', (req, res) => {
	res.render('login', {
		title: 'Halaman Login',
		layout: './layouts/main-layout',
	});
});

router.post(
	'/',
	check('email', 'Email yang anda masukkan tidak valid').isEmail(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.json(errors.array());
			return false;
		}
		const { email, password } = req.body;
		const cek = await User.findOne({ email });
		const decrypt = bcrypt.compare(password, cek.password);
		if (cek && decrypt) {
			const payload = {
				id: cek._id,
				name: cek.username,
			};
			const expiresIn = 60 * 15;
			const token = makeToken(payload, process.env.JWT_SECRET_TOKEN, expiresIn);
			// disini masih pake cookie, karna mo coba di web
			res.cookie('token', token, { httpOnly: true });
			res.redirect('/');
		} else {
			res.send('email atau password salah!');
		}
	}
);

module.exports = router;
