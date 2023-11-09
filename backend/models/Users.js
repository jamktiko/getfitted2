const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	userId: { type: String, required: false },
	userName: { type: String, required: false },
	myLikes: { type: String, required: false }
});

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
