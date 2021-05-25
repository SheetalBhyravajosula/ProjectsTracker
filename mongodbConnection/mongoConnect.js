const mongoose = require('mongoose');
const mongoDBURI = require('../config.json').mongoDbURI;
mongoose.connect(mongoDBURI, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });

exports.connect = function(callback) {
    const db = mongoose.connection;
    db.on('connected', function() {
        console.log('Mongoose default connection open to mongodb srv' );
    });
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    return callback(db);
}