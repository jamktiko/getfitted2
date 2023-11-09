/* eslint-disable indent */
/* eslint-disable no-tabs */
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET; // Tässä tulisi olla salainen avain

const UsersController = {
	PostUser: async (req, res) => {
		try {
			// Get the JWT token from the 'Authorization' header
			const jwtToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

			if (jwtToken) {
				// Decode the JWT token to get user information (e.g., userId)
				const decodedToken = jwt.verify(jwtToken, secret); // Assuming 'secret' is your JWT secret
				const userId = decodedToken.username;

				if (decodedToken && decodedToken.payload) {
					// Parse the payload JSON
					const payload = JSON.parse(atob(decodedToken.payload.split('.')[1]));
					const userName = payload.name; // Access the 'name' field from the payload
					console.log(userName);
					const user = new User({
						userId: userId,
						userName: req.body.username
					});
					await user.save();

					// Now you can use userName or any other payload data as needed
				} else {
					console.error('Invalid or missing payload in the JWT token');
					res.status(400).json({ error: 'Invalid JWT token' });
				}
			} else {
				console.error('JWT token not found in the Authorization header');
				res.status(400).json({ error: 'JWT token not provided' });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
};

module.exports = UsersController;
