/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const ClothesController = require('../controllers/ClothesController');

// http://localhost:3000/clothes/
router.get('/', ClothesController.findAll);

// http://localhost:3000/clothes/Shirts
router.get('/:category', ClothesController.findByCategory);

// http:localhost:3000/clothes/color/Black
router.get('/color/:color', ClothesController.findByColor);

// http:localhost:3000/clothes
router.get('/userid/:userId', ClothesController.FindByIdUserId);

////localhost:3000/clothes
router.post('/', ClothesController.AddImage);

//localhost:3000/clothes/650c2f5363961f7930b282df
router.delete('/:id', ClothesController.DeleteClothing);

module.exports = router;
