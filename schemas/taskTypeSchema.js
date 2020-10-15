const mongoose = require('mongoose');

const schema = mongoose.Schema;

const taskTypeSchema = new schema({
    _id : Number,
    Description :  {
        type :String,
        required : true,
        trim : true
    }
},{collection : 'TaskType'});

module.exports = mongoose.model('TaskType',taskTypeSchema);