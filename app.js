var express = require('express');
var config = require('./config.json');
var mongo = require('./lib/mongo');

console.dir(config);

mongo.initialise(config.mongo.host, config.mongo.port, config.mongo.db, function(error) {
	if (error) {
		console.error('Error connecting to MongoDB: ' + error);
	}
	else {
		var expressApp = express();

		expressApp.configure(function() {
			expressApp.use(express.bodyParser());
			expressApp.use(express.static(__dirname + '/public'));

			expressApp.get('/about', function(request, response){
				var body = JSON.stringify({ jabba: 'jibba' });
				response.setHeader('Content-Type', 'application/json');
				response.setHeader('Content-Length', body.length);
				response.end(body);
			});
		});

		// start the server
		expressApp.listen(config.port);
		console.log('Listening on port ' + config.port + '...');
	}
});