/* eslint-disable indent */
/* eslint-disable no-tabs */
/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/
const Clothe = require('../models/Clothes');

const ClothesController = {
	// 1) Kaikkien vaatteiden haku
	findAll: (req, res) => {
		Clothe.find((error, clothes) => {
			if (error) {
				throw error;
			}
			res.json(clothes);
		});
	},

	// 2) Vaatteen haku kategorisoiden
	findByCategory: (req, res) => {
		Clothe.find({ category: req.params.category }, (error, clothes) => {
			if (error) {
				throw error;
			}
			res.json(clothes);
		});
	},

	// 3) Vaatteen haku varin perusteella
	findByColor: (req, res) => {
		Clothe.find({ color: req.params.color }, (error, clothes) => {
			if (error) {
				throw error;
			}
			res.json(clothes);
		});
	},
	FindByIdUserId: async (req, res) => {
		try {
			const newClothes = await Clothe.find({
				userId: req.params.userId
			});
			res.json(newClothes);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	// 4) Vaatteen haku id perusteella
	findImageById: (req, res) => {
		Clothe.findOne({ jwtToken: req.headers.authorization }, (error, clothes) => {
			if (error) {
				throw error;
			}
			res.json(clothes.imageUrl);
		});
	},

	// 5) Vaatteen lisääminen
	AddImage: async (req, res) => {
		try {
			const newImage = await Clothe.create(req.body);
			res.json(newImage);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	// 6) Vaatteen poistaminen
	DeleteClothing: async (req, res) => {
		try {
			const clothing = await Clothe.findOneAndDelete({ _id: req.params.id });
			res.json(clothing);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
};

module.exports = ClothesController;
