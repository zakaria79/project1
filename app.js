var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

var db = require('./db/db');

var MongoDBStore = require('connect-mongodb-session')(session);

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var keys = require('./config/keys');

var store = new MongoDBStore({
	uri: keys.mongodbURI,
	collection: 'ozSession'
});

store.on('error', function(error) {
	console.log(error);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		secret: keys.sessionSecret,
		resave: false,
		saveUninitialized: false,
		store
	})
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleOauth.clientID,
			clientSecret: keys.googleOauth.clientSecret,
			callbackURL: 'http://localhost:3000/oauth2callback'
		},
		async function(token, tokenSecret, profile, done) {
			const result = await db.getDB().collection('users').findOneAndUpdate(
				{ googleID: profile.id },
				{ $set: { googleProfile: profile } },
				{
					upsert: true
				}
			);
			console.log(profile);
			return done(null, accessToken);
		}
	)
);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
