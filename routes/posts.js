const express = require('express');
const { authenticateToken } = require('../utils/auth');

const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const {
	addPosts,
	showData,
	getDataById,
	addComment,
	showComment,
	deleteDoc,
} = require('../utils/firestoreClient');

const router = express.Router();

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

router.get('/', authenticateToken, async (req, res) => {
	const data = await showData('posts').catch((error) => {
		res.json({ error: true, status: 'failed', message: error });
	});

	if (data == '') {
		res.status(200).json({
			error: false,
			status: 'success',
			message: 'Posts fetched successfully',
			postsList: 'data masih kosong',
		});
	} else {
		res.status(200).json({
			error: false,
			status: 'success',
			message: 'Posts fetched successfully',
			postsList: data,
		});
	}
});

router.post('/', authenticateToken, upload, async (req, res) => {
	const { description } = req.body;

	const fileName = new Date().getTime() + '-' + req.file.originalname;
	const fileBuffer = req.file.buffer;
	const file = bucket.file(fileName);
	await file.save(fileBuffer);

	const fileUrl = `https://storage.googleapis.com/biteshub/${fileName}`;

	addPosts({ description, fileUrl })
		.then(() => {
			res.status(201).json({
				error: false,
				status: 'success',
				message: 'Post success',
			});
		})
		.catch((err) =>
			res.status(400).json({
				error: 'true',
				status: 'failed',
				message: err,
			})
		);
});

router.delete('/', authenticateToken, async (req, res) => {
	const check = await getDataById('posts', req.body.id);
	if (check) {
		deleteDoc(req.body.id)
			.then(() => {
				res.status(200).json({
					error: false,
					status: 'success',
					message: `Document deleted successfully, id: ${req.body.id}`,
				});
			})
			.catch((err) => {
				res.status(400).json({
					error: true,
					status: 'failed',
					message: 'failed deleting document',
				});
			});
	} else {
		res.status(400).json({
			error: true,
			status: 'failed',
			message: 'Document Not Found!',
		});
	}
});

router.get('/detail', authenticateToken, async (req, res) => {
	const data = await getDataById('posts', req.query.id);
	const comment = await showComment('posts', req.query.id).catch((error) => {
		res.json({ error: true, status: 'failed', message: error });
	});
	if (data) {
		res.status(200).json({
			error: false,
			status: 'success',
			message: 'Post fetched successfully',
			postDetail: data,
			allComment: comment,
		});
	} else {
		res.status(400).json({
			error: true,
			status: 'failed',
			message: 'Data not Found!',
		});
	}
});

router.post('/comment', authenticateToken, async (req, res) => {
	const { id, comment, username } = req.body;
	const check = await getDataById('posts', id);
	if (check) {
		addComment('posts', id, comment, username)
			.then(() => {
				res.status(201).json({
					error: false,
					status: 'success',
					message: 'Comment successfuly added',
				});
			})
			.catch((err) => {
				res.status(400).json({
					error: true,
					status: 'failed',
					message: err,
				});
			});
	} else {
		res.status(400).json({
			error: true,
			status: 'failed',
			message: 'Document Not Found!',
		});
	}
});

module.exports = router;
