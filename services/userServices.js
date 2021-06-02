const exists = "Exists";
const doesNotExist = "DoesNotExist";
const bcrypt = require('bcryptjs');
const { getTasksByProjectName } = require('../controllers/reportsController');
const userSchema = require("../schemas/userSchema");

exports.getUserByCredentials = function (creds, callback) {
  userSchema.findOne({ userId: creds.userId }, async function (err, user) {
    if (err) {
      console.log("User does not exist");
      callback(false);
    }
    const isMatch = await bcrypt.compare(creds.password, user.password);
    if (!isMatch) {
      console.log("cannot login wrong password");
      callback(false);
    }
    else{
        const token = await user.generateAuthToken();
        console.log(user);
        callback(token);
    }
  });
};

exports.createUser = function(creds,callback){
    userSchema.exists(
        {
          userId: creds.id,
        },
    async function(error,bool){
        if (error) {
            console.log(error);
            callback(false);
          } else if (bool) {
            callback(exists);
          }
          else{
              const new_user = new userSchema({
                  userId : creds.id,
                  password : creds.pwd,
                  role : creds.role,
              });
              new_user.save(function (err, saved) {
                if (err) {
                  console.log(err);
                  callback(false);
                } else {
                  callback(saved);
                }
              });
          }
    })

}