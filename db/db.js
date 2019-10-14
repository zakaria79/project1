const mongodb = require('mongodb');
const keys = require('./../config/keys');

let db;

exports.connect = function(callback) {
	const client = new mongodb.MongoClient(keys.mongodbURI);
	client.connect(
		function(err) {
			if (err) {
				throw new Error('Connexion à la base de données impossible 1');
			}
			db = client.db('ozapp');
			callback();
		},
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	);
};

exports.getDB = function() {
	if (!db) {
		throw new Error('Connexion à la base de données impossible 2');
	}
	return db;
};
