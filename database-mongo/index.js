var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  cityName: String,
  state: String, 
  timeStamp: String,
  temprature: Number,
  airQaulityIndex: Number
});

var Item = mongoose.model('Item', itemSchema);

var save = function (cityName, state, timeStamp, temprature, airQaulityIndex) {
  console.log('airQaulityIndex is ', airQaulityIndex);
  var obj = {
    cityName: cityName,
    state: state,
    timeStamp: timeStamp,
    temprature: temprature,
    airQaulityIndex: airQaulityIndex
  }; 

  var doc = new Item(obj);
  doc.save(function(err, success) {
    if (err) {
      console.log('error has occured while saving data into db', err);
    } else {
      console.log('data has successfully been saved', success);
    }
  })
}

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.save = save;