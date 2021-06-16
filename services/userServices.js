const exists = "Exists";
const doesNotExist = "DoesNotExist";
const bcrypt = require("bcryptjs");
const userSchema = require("../schemas/userSchema");
const userQASchema = require("../schemas/userSecurityQASchema");

exports.getUserByCredentials = function (creds, callback) {
  userSchema.findOne({ userId: creds.userId }, async function (err, user) {
    if (err) {
      callback(false);
    } else if (user === null) {
      console.log("User does not exist");
      callback(doesNotExist);
    } else {
      const isMatch = await bcrypt.compare(creds.password, user.password);
      if (!isMatch) {
        console.log("cannot login wrong password");
        callback(false);
      } else {
        const token = await user.generateAuthToken();
        user.token = token;
        callback(user);
      }
    }
  });
};

exports.createUser = function (creds, callback) {
  userSchema.exists(
    {
      userId: creds.userId,
    },
    function (error, bool) {
      if (error) {
        console.log(error);
        callback(false);
      } else if (bool) {
        callback(exists);
      } else {
        const new_user = new userSchema({
          userId: creds.userId,
          password: creds.password,
          role: creds.role,
        });
        new_user.save(function (err, saved) {
          if (err) {
            console.log(err);
            callback(false);
          } else {
            creds.userId = saved._id;
            exports.createUserQA(creds, function (err, res) {
              if (err) callback(false);
              else {
                callback(saved);
              }
            });
          }
        });
      }
    }
  );
};

exports.createUserQA = function (creds, callback) {
  userQASchema.exists(
    {
      userId: creds.userId,
    },
    function (error, bool) {
      if (error) {
        console.log(error);
        callback(false);
      } else if (bool) {
        callback(exists);
      } else {
        const new_userQA = new userQASchema({
          userId: creds.userId,
          securityQuestion: creds.securityQuestion,
          securityAnswer: creds.securityAnswer,
        });
        new_userQA.save(function (err, saved) {
          if (err) {
            console.log(err);
            callback(false);
          } else {
            callback(null, saved);
          }
        });
      }
    }
  );
};

exports.getUserSQByUserId = function (uId, callback) {
  userQASchema.aggregate(
    [
      {
        $lookup: {
          from: "User",
          localField: "userId",
          foreignField: "_id",
          as: "UserData",
        },
      },
      { $unwind: "$UserData" },
      {
        $match: { "UserData.userId": uId },
      },
      { $unset: "UserData.password" },
    ],
    function (err, res) {
      if (err) {
        callback(false);
      } else {
        callback(res);
      }
    }
  );
};

exports.modifyUserPassword = function (updateUser, callback) {
  const modify_user = {
    userId: updateUser.userId,
    password: updateUser.password,
    role: updateUser.role,
  };
  userSchema.findOneAndUpdate(
    { userId: updateUser.userId },
    modify_user,
    function (err, result) {
      if (err) {
        callback(false);
      } else if (result == null) {
        callback(doesNotExist);
      } else {
        callback(result);
      }
    }
  );
};
