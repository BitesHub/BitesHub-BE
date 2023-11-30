const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {
		title: 'Halaman Home',
		layout: './layouts/main-layout',
	});
});

module.exports = router;
