const mongoose = require('mongoose');

const User = mongoose.model('user', {
	username: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	password: {
    type: String,
    require: true,
	},
});

module.exports = User;
