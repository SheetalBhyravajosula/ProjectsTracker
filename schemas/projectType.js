const mongoose = require('mongoose');

const schema = mongoose.Schema;

const projectTypeSchema = new schema({
    _id : Number,
    Description :  {
        type :String,
        required : true,
        trim : true
    }
},{collection : 'ProjectType'});

module.exports = mongoose.model('ProjectType',projectTypeSchema);