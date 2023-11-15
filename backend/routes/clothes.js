/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const ClothesController = require('../controllers/ClothesController');

// Etsii kaikki vaatteet http://localhost:3000/clothes/
router.get('/', ClothesController.findAll);

//Etsi vaatteet kategorian mukaan http://localhost:3000/clothes/category/shoes
router.get('/:category', ClothesController.findByCategory);

//Etsi postaukset käyttäjän userId:n perusteella http://localhost:3000/clothes/userid/114137952706567841882
router.get('/userid/:userId', ClothesController.FindById);

//Tietyn fittikuvan poistoon http://localhost:3000/fits
router.delete('/:imageUrl/', ClothesController.DeleteClothe);

//Lähettää kuvan s3 buckettiin ja tallentaa kuvaurlin sekä useridn.
router.post('/api/posts', upload.single('image'), ClothesController.PostClothe);

module.exports = router;
