const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../utils/auth');
const {
	addRecipe,
	showData,
	deleteRecipe,
	getDataById,
} = require('../utils/firestoreClient');

router.post('/', authenticateToken, async (req, res) => {
	addRecipe(req.body)
		.then(() => {
			res.status(201).json({
				error: false,
				status: 'succes',
				message: 'Berhasil menambahkan resep',
			});
		})
		.catch((err) => {
			res.status(400).json({
				error: true,
				status: 'failed',
				message: err,
			});
		});
});

router.get('/', authenticateToken, async (req, res) => {
	showData('recipes')
		.then((result) => {
			if (result) {
				res.status(200).json({
					error: false,
					status: 'success',
					message: 'Success get all recipes',
					data: result,
				});
			} else {
				res.status(200).json({
					error: false,
					status: 'success',
					message: 'Resep masih kosong',
				});
			}
		})
		.catch((err) => {
			res.status(400).json({
				error: true,
				status: 'failed',
				message: err,
			});
		});
});

router.get('/detail', authenticateToken, async (req, res) => {
	getDataById('recipes', req.query.id)
		.then((result) => {
			if (result) {
				res.status(200).json({
					error: false,
					status: 'success',
					message: 'Success get recipe details',
					data: result,
				});
			} else {
				res.status(200).json({
					error: false,
					status: 'success',
					message: 'Recipes not found!',
				});
			}
		})
		.catch((err) => {
			res.status(400).json({
				error: true,
				status: 'failed',
				message: err,
			});
		});
});

router.delete('/', authenticateToken, async (req, res) => {
	deleteRecipe(req.body.id)
		.then(() => {
			res.status(200).json({
				error: false,
				status: 'success',
				message: 'Berhasil hapus resep',
			});
		})
		.catch((err) => {
			res.status(400).json({
				error: true,
				status: 'failed',
				message: err,
			});
		});
});

module.exports = router;
