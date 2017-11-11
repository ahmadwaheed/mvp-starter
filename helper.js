var request = require('request');
var config = require('./config.js');
var Promise = require('bluebird');

//request = Promise.promisifyAll(request);

var getInfoByCityName = function (cityName, callback) {
	var obj = {
		url:'http://api.airvisual.com/v2/city?city=' + cityName + '&state=California&country=USA&key=' + config.key
		//method: 'GET'
	}


	// request.getAsync(obj) 
	// 	.then(function(err, res, body) {
	// 		console.log(body);
	// 		var parsed = JSON.parse(body);
	// 		return parsed;
	// 	})
	// 	.catch(function(err) {
	// 		console.log('error is coming from helper', err);
	// 	});
	request(obj, function(err, res, body){
		if (err) {
			console.log('error is ', err);
			callback(err, null);
		} else {
			//console.log(body);
			var parsed = JSON.parse(body);
			//console.log('hi it is getting data successfully ', parsed);
			callback(null, parsed);
		}
	});
}

// getInfoByCityName('woodland', function (err, data) {
// });

module.exports.getInfoByCityName = getInfoByCityName;