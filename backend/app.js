const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config(); //dotenv -moduuli tarvitaan jos aiotaan käyttää .env -filua
require('./dbconnection'); //kantayhteys

const vaateRouter = require('./routes/clothes');
const fitRouter = require('./routes/fits');
const users = require('./routes/users');

const app = express();

// cors avaa yhteyden palvelinsovelluksen ja asiakassovelluksen välille
// jos nämä sijaitsevat eri palvelimilla
const corsOptions = {
	origin: 'http://localhost:5173', // frontin osoite mihin saadaan olla yhteydessä
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); //cors kaikille reiteille

// Tässä

app.use('/clothes/', vaateRouter);
app.use('/fits/', fitRouter);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
module.exports = app;
