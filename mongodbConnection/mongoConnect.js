var mongoose = require('mongoose');
var mongoDBURI = require('../config.json').mongoDbURI;
mongoose.connect(mongoDBURI, { useNewUrlParser: true , useUnifiedTopology: true});

exports.connect=function(callback){
    var db = mongoose.connection;
    db.on('connected', function () {
        console.log('Mongoose default connection open to ' + mongoDBURI);
      }); 
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    return callback(db);
}