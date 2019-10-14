const passport = require('passport');

exports.googleAuth = passport.authenticate('google', {
	scope: [ 'https://www.googleapis.com/auth/plus.login' ]
});

exports.googleCallback = passport.authenticate('google', {
	failureRedirect: '/failure'
});

exports.success = (req, res, next) => {
	res.redirect('/success');
};
