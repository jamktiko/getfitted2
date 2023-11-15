/* eslint-disable indent */
/* eslint-disable no-tabs */
const createToken = require('../createToken.js');
const validateSocialToken = require('../validatesocialtoken.js');

const GoogleController = {
	/* Metodi jolla kirjaudutaan olemassa olevalla Googlen käyttäjällä
       Käyttäjän idtoken saadaan frontendistä ja se validoidaan Googlen palvelussa.
       Onnistuneen validaation tuloksena saadaan käyttäjädataa, eli userid, joka
       sijoitetaan JWT-tokeniin joka lähetetään frontendiin. Frontendissä JWT:tä
       voidaan käyttää esim. sovelluksessa liikkumiseen ja REST-apin reittien authorisaatioon.
    */
	authenticateGUser: function (req, res, next) {
		// Googlelta frontendissä saatu token
		const token = req.body.gtoken;

		// async -funktio palauttaa promisen, joka tässä käsitellään then -metodilla
		validateSocialToken(token).then(function (userid) {
			// userid eli käyttäjän yksilöllinen Google-tunnus laitetaan JWT-tokeniin
			const user = { username: userid };
			const jwttoken = createToken(user); // tokenin luontimetodi
			console.log('Valmis JWT: ' + jwttoken);
			res.json({
				success: true,
				message: 'Tässä on valmis JWT-token!',
				token: jwttoken
			});
		});
	}
};

module.exports = GoogleController;
