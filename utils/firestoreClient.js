const Firestore = require('@google-cloud/firestore');
const dayjs = require('dayjs');

// buat testing
// require('dotenv').config();
// const path = require('path');
// const rootPath =
// 	process.env.ROOT_PATH || 'D:/Bangkit Things/CapstoneProject/BitesHub-App';
// const credentialsPath = path.join(rootPath, '/credentials.json');

const db = new Firestore({
	projectId: 'biteshub-app',
	keyFilename: 'credentials.json',
});

// add data Users
const addDataUsers = async (data) => {
	const { username, email, password } = data;
	const docRef = db.collection('users');
	await docRef.add({
		username,
		email,
		password,
	});
};

// adding post
const addPosts = async (data) => {
	const { description, fileUrl } = data;
	const docRef = db.collection('posts');
	const createdAt = dayjs().format('DD-MM-YYYY');
	console.log(createdAt);
	await docRef
		.add({
			description,
			fileUrl,
			createdAt,
		})
		.catch((err) => console.log(err));
};

// get all data
const showData = async (collection) => {
	const snapshot = await db.collection(collection).get();
	const data = [];
	snapshot.forEach((doc) => {
		data.push({
			id: doc.id,
			data: doc.data(),
		});
		console.log(doc.id, '=>', doc.data());
	});
	JSON.stringify(data);
	return data;
};

// get data by id
const getDataById = async (collection, id) => {
	const snapshot = await db.collection(collection).doc(id).get();
	if (snapshot.empty) {
		return false;
	} else {
		return snapshot.data();
	}
};

// get data by key
const getDataByKey = async (collection, key, value) => {
	const usersRef = db.collection(collection);
	const snapshot = await usersRef.where(key, '==', value).get();
	if (snapshot.empty) {
		return false;
	} else {
		const result = {
			data: snapshot.docs[0].data(),
			id: snapshot.docs[0].id,
		};
		return result;
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

// add comment
const addComment = async (collection, id, comment, username) => {
	const postsRef = db.collection(collection).doc(id).collection('comment');
	const createdAt = dayjs().format('DD-MM-YYYY');
	await postsRef.add({
		username,
		comment,
		createdAt,
	});
};

// get all comment
const showComment = async (collection, id) => {
	const snapshot = await db
		.collection(collection)
		.doc(id)
		.collection('comment')
		.get();
	const data = [];
	snapshot.forEach((doc) => {
		data.push({
			id: doc.id,
			data: doc.data(),
		});
	});
	JSON.stringify(data);
	return data;
};

// Delete postingan
const deleteDoc = async (id) => {
	const docRef = await db.collection('posts').doc(id);
	const subCollectionRef = await docRef.collection('comments').doc(id);

	subCollectionRef.delete();

	return docRef.delete();
};

// Add recipe
const addRecipe = async (data) => {
	const { title, username, ingredients, description, fileUrl } = data;
	const docRef = db.collection('recipes');
	const createdAt = dayjs().format('DD-MM-YYYY');
	console.log(createdAt);
	await docRef
		.add({
			username,
			title,
			ingredients,
			description,
			fileUrl,
			createdAt,
		})
		.catch((err) => console.log(err));
};

// delete recipe
const deleteRecipe = async (id) => {
	const docRef = await db.collection('recipes').doc(id);
	return docRef.delete();
};

module.exports = {
	addDataUsers,
	getDataByKey,
	addPosts,
	showData,
	getDataById,
	addComment,
	showComment,
	deleteDoc,
	addRecipe,
	deleteRecipe,
};
