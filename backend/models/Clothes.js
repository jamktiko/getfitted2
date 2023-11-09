const mongoose = require('mongoose');

const ClothesSchema = new mongoose.Schema({
  color: { type: String, required: false },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  jwtToken: { type: String, required: true },
});

const Clothes = mongoose.model('Clothes', ClothesSchema);

module.exports = Clothes;
