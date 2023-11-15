/* eslint-disable indent */
/* eslint-disable no-tabs */
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const UsersController = {
	PostUser: async (req, res) => {
		try {
			// Get the JWT token from the 'Authorization' header
			const jwtToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
			console.log(jwtToken);
			console.log(req.body.username);

			if (!jwtToken) {
				console.error('JWT token not found in the Authorization header');
				return res.status(400).json({ error: 'JWT token not provided' });
			}

			// Decode the JWT token to get user information (e.g., userId)
			const decodedToken = jwt.verify(jwtToken, secret);
			console.log(decodedToken.username);

			if (!decodedToken.username) {
				console.log('kakka' + decodedToken.username);
				console.error('Invalid or missing username in the JWT token');
				return res.status(400).json({ error: 'Invalid or missing username in the JWT token' });
			}

			// Assuming 'username' is the correct field in your JWT
			const userId = decodedToken.username;
			console.log(userId);
			const userName = req.body.username;
			console.log('tässä on' + userName);

			// Save the user to the database
			const user = new User({
				userId: userId,
				userName: userName
			});
			await user.save();

			// Respond with a success message or other appropriate response
			return res.status(201).json({ message: 'User added successfully' });
		} catch (error) {
			console.error('Internal server error:', error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	}
};

module.exports = UsersController;
