const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    EmployeeId : {
                    type : Number,
                    required : true,
                    unique : true,
                    validate(value) {
                        if(isNaN(value)){
                            throw new Error('Invalid employee id')
                        }
                    }
                 },
    EmployeeName : {
                       type : String,
                       required : true
                   },
    BillRate : {
                  type : Number,
                  default : 0
               } ,
    Project : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,                
                ref : 'Project'
              }            
},{
    timestamps : true,
    collection : 'Associate'
});
module.exports = mongoose.model('Associate',employeeSchema);