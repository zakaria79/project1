var express = require('express');
var router = express.Router();
const db = require('./../db/db');
var authControllers = require('./../controllers/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/auth/google', authControllers.googleAuth);
router.get('/oauth2callback', authControllers.googleCallback, authControllers.success);

router.get('/dbtest', async function(req, res) {
	try {
		const result = await db.getDB().collection('truc').insertOne({ name: 'zakaria' });
		res.json(result);
	} catch (err) {
		console.log(err);
		res.send("Une erreur est survenue à l'insertion");
	}
	res.send('aunriset');
});

router.get('/success', function(req, res) {
	res.send('Success!');
});

router.get('/failure', function(req, res) {
	res.send('Failure!!!');
});

router.get('/user', function(req, res) {
	res.json(req.user);
});

module.exports = router;
