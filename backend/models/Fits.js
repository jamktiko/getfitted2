const mongoose = require('mongoose');

const FitsSchema = new mongoose.Schema({
  imageUrl: { type: String, required: false },
  userId: { type: String, required: true },
  kuvaUrl: { type: String, required: false },
  imageDescription: { type: String, required: false },
});

const FitsModel = mongoose.model('Fits', FitsSchema);

module.exports = FitsModel;
