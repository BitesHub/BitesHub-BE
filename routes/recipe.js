const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../utils/auth');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const {
	addRecipe,
	showData,
	deleteRecipe,
	getDataById,
} = require('../utils/firestoreClient');

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const storage = new Storage({
	projectId: 'biteshub-app',
	keyFilename: 'credentials.json',
});

const bucket = storage.bucket('biteshub');

const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter,
}).single('fileUrl');

router.post('/', authenticateToken, upload, async (req, res) => {
	const { title, username, ingredients, description } = req.body;
	const fileName = new Date().getTime() + '-' + req.file.originalname;
	const fileBuffer = req.file.buffer;
	const file = bucket.file(fileName);
	await file.save(fileBuffer);

	const fileUrl = `https://storage.googleapis.com/biteshub/${fileName}`;

	addRecipe({ title, username, ingredients, description, fileUrl })
		.then(() => {
			res.status(201).json({
				error: false,
				status: 'success',
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
