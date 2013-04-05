var mongodb = require('mongodb');

exports.initialise = function(host, port, db, callback) {
	exports.client = new mongodb.Db(db, new mongodb.Server(host, port, {}));
	exports.client.open(function(error, passedClient) {
		if (error) {
			return callback(error);
		}
		return callback(null);
	});
};

exports.find = function(collectionName, query, fields, sort, callback) {	
	exports.client.collection(collectionName, function(error, collection) {
		if (error) {
			return callback(error);
		}
		collection.find(query, fields, function(error, cursor) {
			if (error) {
				return callback(error);
			}
			if (typeof sort !== 'undefined' && sort !== null) {
				cursor.sort(sort);
			}

			cursor.toArray(function(error, documents) {
				if (error) {
					return callback(error);
				}
				return callback(null, documents);
			});
		});
	});
};