/* eslint-disable indent */
/* eslint-disable no-tabs */
/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/
const Clothe = require('../models/Clothes');
const { s3, bucketName } = require('../s3Config');
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
// const { Rembg } = require('rembg-node');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET; // Tässä tulisi olla salainen avain

const ClothesController = {
	// 1) Kaikkien Fittien haku
	findAll: (req, res) => {
		Clothe.find((error, fits) => {
			if (error) {
				throw error;
			}
			res.json(fits);
		});
	},

	// 2) Etsii kaikki vaatteet kategorian mukaan
	findByCategory: async (req, res) => {
		try {
			const newClothe = await Clothe.find({
				category: req.params.category
			});
			res.json(newClothe);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},
	// 3) Etsii idn perusteella.
	FindById: async (req, res) => {
		try {
			const newClothex = await Clothe.find({
				userId: req.params.userId
			});
			res.json(newClothex);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	// Vaatekuvan poistaminen
	DeleteClothe: async (req, res) => {
		try {
			const imageUrl = req.params.imageUrl;

			console.log('Deleting image with URL:', imageUrl);

			const fitpic = await Clothe.deleteOne({ imageUrl });

			if (fitpic.deletedCount === 0) {
				console.log('Image not found in the database.');
				return res.status(404).json({ message: 'Image not found' });
			}

			console.log('Image deleted successfully:', fitpic);

			res.status(204).end(); // 204 No Content - Success response without content
		} catch (error) {
			console.error('Error while deleting image:', error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	// 3) Lähettää kuvan S3 buckettiin ja tallentaa tiedot kantaan
	PostClothe: async (req, res) => {
		try {
			let signedUrl = null;
			const folderPath = 'vaatekappale/';
			const imageName = randomImageName();

			const params = {
				Bucket: bucketName,
				Key: folderPath + imageName,
				Body: req.file.buffer,
				ContentType: req.file.mimetype
			};

			const command = new PutObjectCommand(params);
			await s3.send(command);

			// Generate a SignedUrl
			const getObjectParams = {
				Bucket: bucketName,
				Key: folderPath + imageName
			};
			const getCommand = new GetObjectCommand(getObjectParams);
			signedUrl = await getSignedUrl(s3, getCommand, { expiresIn: 604800 });

			// Get the JWT token from the 'sessionStorage'
			const jwtToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
			console.log(jwtToken);
			if (jwtToken) {
				// Decode the JWT token to get user information (e.g., userId)
				const decodedToken = jwt.verify(jwtToken, secret); // Assuming 'secret' is your JWT secret
				const userId = decodedToken.username;

				// Save the image URL and the user's identifier (e.g., userId) in the "fits" collection
				const imageUrl = `https://s3.amazonaws.com/${bucketName}/${params.Key}`;
				const clothe = new Clothe({
					imageUrl: imageUrl,
					userId: userId, // Extract the user identifier from the decoded token
					category: req.body.category,
					kuvaUrl: signedUrl,
					imageDescription: req.body.caption
				});

				await clothe.save();
				console.log('Data saved successfully');

				res.send({ imageUrl });
			} else {
				res.status(403).send('Unauthorized: Missing JWT token in sessionStorage');
			}
		} catch (uploadError) {
			console.error(uploadError);
			res.status(500).send('Error uploading image');
		}
	}
};

module.exports = ClothesController;
