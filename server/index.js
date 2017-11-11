var express = require('express');
var bodyParser = require('body-parser');
var dataGrabber = require('../helper.js');
var Promise = require('bluebird');
var items = require('../database-mongo');
var db = require('../database-mongo/index.js');
var app = express();

dataGrabber.getInfoByCityName = Promise.promisify(dataGrabber.getInfoByCityName);

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


function timeManager(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

app.post('/items', function(req, res) {
	console.log(req.body);
	dataGrabber.getInfoByCityName(req.body.term)
		.then(function(data) {
			console.log(' hey its in app.post ', data.data.current.pollution.aqius);
			db.save(data.data.city, 
				data.data.state, 
				timeManager(new Date()).toString(), 
				Math.round((data.data.current.weather.tp * 1.8) + 32),
				data.data.current.pollution.aqius
				);
			res.statusCode = 201;
			res.end(res.statusCode.toString(), data);
		})
		.catch(function(err){
			 res.statusCode = 500;
			 res.end(res.statusCode.toString(), err);
		});
});

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

