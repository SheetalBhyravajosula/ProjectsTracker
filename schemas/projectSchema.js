const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const projectSchema = new schema({    
    ProjectName : {
                     type :String,
                     required : true,
                     trim : true
                 },
    Category : {
                 type :String,
                 required : true,
                 trim : true
               },
    ProjectType : {
                    type : Number,
                    required : true,
                    ref : 'ProjectType'                 
                },
    Technology : {
                    required : true,
                    type : [String]
                },
    OnsiteCount : {
                    type : Number,
                    default : 0,
                    required : true
                  },
    OffshoreCount : {
                       type : Number,
                       default : 0,
                       required : true
                    },
    ClientName : {
                    type :String,
                    required : true,
                    trim : true
                 }
},{
    timestamps : true,
    collection : 'Project'
});

module.exports = mongoose.model('Project',projectSchema);