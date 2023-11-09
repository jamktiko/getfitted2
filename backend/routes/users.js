/*
localhost:3000/users -reitit
users/register -reitistä voidaan tehdä käyttäjä kantaan
users/login -reitistä voidaan loggautua olemassa olevalla käyttäjällä
*/
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const googleCon = require('../controllers/GoogleController'); // google-reittien kontrolleri
const userCon = require('../controllers/UserController');

// Kirjautuminen Googlen tunnareilla Svelte-lomakkeelta
router.post('/glogin', googleCon.authenticateGUser);

// Postaaminen usercontrollerilla.
router.post('/users', userCon.PostUser);

module.exports = router;
