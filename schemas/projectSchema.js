const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const projectSchema = new schema({    
    ProjectName :  {
                    type :String,
                    required : true,
                    trim : true
                 },
    Category : {

    },
    ProjectType : {
                    type : Number,
                    required : true,
                    ref : 'ProjectType'
                },
    Technology : {
                    required : true,
                    type : String
                }
},{
    timestamps : true,
    collection : 'Project'
});

module.exports = mongoose.model('Project',projectSchema);