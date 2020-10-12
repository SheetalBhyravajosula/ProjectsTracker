const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({    
    TaskDescription: {
                        type :String,
                        required : true,
                        trim : true
                     },
    TaskType: {
                type : Number,
                required : true,
                ref : 'TaskType'
              },
    Project: {
                type : mongoose.Schema.Types.ObjectId,
                required : true,                
                ref : 'Project'
             },
    Employee : {
                 type : String,
                 required : true,
                 ref : 'Employee'
               },
    TaskStartDate:Date,
    TaskEndDate:Date,
    Duration:mongoose.Types.Decimal128
}, {
    timestamps : true,
    collection : 'Task'
});

module.exports = mongoose.model('Task',TaskSchema);