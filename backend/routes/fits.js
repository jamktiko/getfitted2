/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const FitCont = require('../controllers/FitsContoroller');
const FitsController = require('../controllers/FitsContoroller');

// Etsi kaikki postaukset http://localhost:3000/fits
router.get('/', FitCont.findAll);

// Etsi postaukset käyttäjän userId:n perusteella http://localhost:3000/fits/114137952706567841882
router.get('/:userId', FitsController.FindById);

//  http://localhost:3000/fits/https://s3.amazonaws.com/getfitted/fitti/be084d4074839a526ad4781239bbd53e75fc508643fe3b0058304f46fbb25859
router.delete('/:imageUrl/', FitsController.DeleteFit);

// Lähettää kuvan s3 buckettiin ja tallentaa kuvaurlin sekä useridn.
router.post('/api/posts', upload.single('image'), FitsController.PostFit);

module.exports = router;
