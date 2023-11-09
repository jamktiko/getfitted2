/* eslint-disable indent */
/* eslint-disable no-tabs */
/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/
const Fit = require('../models/Fits');
const { s3, bucketName } = require('../s3Config');
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET; // Tässä tulisi olla salainen avain

const FitsController = {
	// 1) Kaikkien Fittien haku
	findAll: (req, res) => {
		Fit.find((error, fits) => {
			if (error) {
				throw error;
			}
			res.json(fits);
		});
	},
	// 2) Fitti kuvan lisääminen
	AddImage: async (req, res) => {
		try {
			const newImage = await Fit.create(req.body);
			res.json(newImage);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},
	// Etsii idn perusteella.
	FindById: async (req, res) => {
		try {
			const newFit = await Fit.find({
				userId: req.params.userId
			});
			res.json(newFit);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	// 3) Fittikuvan poistaminen
	DeleteFit: async (req, res) => {
		try {
			const imageUrl = req.params.imageUrl;
			const fitpic = await Fit.deleteOne({ imageUrl: imageUrl });
			res.json(fitpic);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	// postaa s3, postaa tietokantaan id ja kuvaurlin ja kuvannimiurlin ja mahdollisen descriptionin
	PostFit: async (req, res) => {
		try {
			let signedUrl = null;
			const folderPath = 'fitti/';
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
				console.log('tämä on' + { jwtToken });

				// Save the image URL and the user's identifier (e.g., userId) in the "fits" collection
				const imageUrl = `https://s3.amazonaws.com/${bucketName}/${params.Key}`;
				const fit = new Fit({
					imageUrl: imageUrl,
					userId: userId, // Extract the user identifier from the decoded token
					// eslint-disable-next-line indent
					kuvaUrl: signedUrl,
					imageDescription: req.body.caption
				});

				await fit.save();
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

module.exports = FitsController;
