const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config.json').JWT_SECRET;

const schema = mongoose.Schema;

const userSchema = new schema({
     userid : {
                type : String,
                required : true
              },
      password :  {
                    type : String,
                    required : true,
                    trim : true,    
                    minlength : 7,
                    validate(value) {
                        if(value.toLowerCase().includes('password'))
                        {
                            throw new Error('Cannot be password !')
                        }
                    }
                },
    tokens : [{
                token : {
                    type : String,
                    required : true
                }
             }],  

},{
    timestamps : true, 
    collection : 'User'
});
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id:user._id.toString() },JWT_SECRET)
    user.tokens = user.tokens.concat({token})   
    await user.save() 
    return token
}

userSchema.methods.toJSON = function () {
     const user = this
     const userObject = user.toObject()
     delete userObject.password
     delete userObject.tokens     
     return userObject
}

userSchema.statics.findByCredentials = async (userid, password) => {
     const user = await User.findOne({userid})
     if(!user){
         throw new Error('Unable to login')
     }     
     const isMatch = await bcrypt.compare(password,user.password)
     if(!isMatch){
         throw new Error('Unable to login')
     }
     return user
}

module.exports = mongoose.model('User',userSchema);