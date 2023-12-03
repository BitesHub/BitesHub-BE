const Firestore = require('@google-cloud/firestore');
require('dotenv').config();
const path = require('path');
const rootPath =
	process.env.ROOT_PATH || 'D:/Bangkit Things/CapstoneProject/BitesHub-App';
const credentialsPath = path.join(rootPath, '/credentials.json');
const db = new Firestore({
	projectId: 'biteshub-app',
	keyFilename: credentialsPath,
});

// add data
const addDataUsers = async (data) => {
	const { username, email, password } = data;
	const docRef = db.collection('users').doc();
	await docRef.set({
		username,
		email,
		password,
	});
};

// get all data
const showData = async () => {
	const snapshot = await db.collection('users').get();
	snapshot.forEach((doc) => {
		console.log(doc.id, '=>', doc.data());
	});
	return snapshot;
};

// get data by id
const getDataById = async (id) => {
	const snapshot = await db.collection('users').doc(id).get();
	if (snapshot.empty) {
		console.log('No such document!');
	} else {
		console.log('Document data:', snapshot.data());
	}
};

const getDataByKey = async (key, value) => {
	const usersRef = db.collection('users');
	const snapshot = await usersRef.where(key, '==', value).get();
	if (snapshot.empty) {
		return false;
	} else {
		return snapshot.docs[0].data();
	}
};

//update data
const updateData = async (data) => {
	const { id, email, password, username } = data;
	await db
		.collection('users')
		.doc(id)
		.update({
			email,
			password,
			username,
		})
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
};

module.exports = { addDataUsers, getDataByKey };
