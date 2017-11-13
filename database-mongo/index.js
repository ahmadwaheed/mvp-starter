var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true }); // in 'mongodb://localhost/test' a db is being created with 
                                                                        //  by the name specified in end point. (/test)

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

var Item = mongoose.model('Item', itemSchema); // in this step, a model is being created using schema described above and 
                                                //collection or tables name is being assigned 'items' in ('Item', itemSchema) part

var save = function (cityName, state, timeStamp, temprature, airQaulityIndex) {
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