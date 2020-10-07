var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var TaskSchema=new Schema({
    TaskID:String,
    TaskDescription:String,
    TaskTypeID:String,
    ProjectID:String,
    EmpID:String,
    TaskStartDate:String,
    TaskEndDate:String,
    Duration:String
},{collection:'TaskCollection'});

module.exports=mongoose.model('TaskCollection',TaskSchema);