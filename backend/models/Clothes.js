/* eslint-disable indent */
/* eslint-disable no-tabs */
const mongoose = require('mongoose');

const ClothesSchema = new mongoose.Schema({
	category: { type: String, required: false },
	imageUrl: { type: String, required: false },
	kuvaUrl: { type: String, required: false },
	userId: { type: String, required: true },
	imageDescription: { type: String, required: false }
});

const Clothes = mongoose.model('Clothes', ClothesSchema);

module.exports = Clothes;
