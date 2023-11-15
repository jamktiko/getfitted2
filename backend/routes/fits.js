/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const FitsController = require('../controllers/FitsContoroller');

//Etsi kaikki postaukset http://localhost:3000/fits
router.get('/', FitsController.findAll);

//Etsi postaukset käyttäjän userId:n perusteella http://localhost:3000/fits/114137952706567841882
router.get('/:userId', FitsController.FindById);

//Tietyn fittikuvan poistoon http://localhost:3000/fits
router.delete('/:imageUrl/', FitsController.DeleteFit);

//Lähettää kuvan s3 buckettiin ja tallentaa kuvaurlin sekä useridn.
router.post('/api/posts', upload.single('image'), FitsController.PostFit);

module.exports = router;
