const userService = require("../services/userServices");

exports.getUserByCredentials = function (req, res) {
  const creds = req.body.credentials;
  userService.getUserByCredentials(creds, function (result) {
    if (result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not retrieve users error occured`,
      });
    } else if (result == "DoesNotExist") {
      res.status(404).json({
        status: "Failure",
        message: `Could not get user ${creds.userId}:${result} not found`,
      });
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
        Authorization: result.token,
      });
      res.end(JSON.stringify(result));
    }
  });
};

exports.getUserSQByUserId = function (req, res) {
  const userId = req.params.id;
  userService.getUserSQByUserId(userId, function (result) {
    if (result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not retrieve user error occured`,
      });
    } else if (result == "DoesNotExist") {
      res.status(404).json({
        status: "failure",
        message: `Could not get user ${userId}:${result} not found`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};
exports.createUser = function (req, res) {
  const user = req.body.user;
  console.log(user);
  userService.createUser(user, function (result) {
    if (result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not create user ${user.userId} error occured`,
      });
    } else if (result == "Exists") {
      res.status(500).json({
        status: "failure",
        message: `Could not create user ${user.userId}:${result} already exists`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

// exports.deleteUser = function (req, res) {
//   const userId = req.params.userId;
//   userService.deleteUser(userId, function (result) {
//     if (result == false) {
//       res.status(500).json({
//         status: "Internal Server Error",
//         message: `Could not delete user ${userId} error occured`,
//       });
//     } else if (result == "DoesNotExist") {
//       res.status(404).json({
//         status: "failure",
//         message: `Could not modify user ${userId}:${result} not found`,
//       });
//     } else {
//       res.status(200).json({
//         status: "success",
//         data: result,
//       });
//     }
//   });
// };

exports.modifyUserPassword = function (req, res) {
  const updateUser = req.body.updateUser;
  userService.modifyUserPassword(updateUser, function (result) {
    if (result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not modify user ${updateUser.userId} error occured`,
      });
    } else if (result == "DoesNotExist") {
      res.status(404).json({
        status: "failure",
        message: `Could not modify user ${updateUser.userId}:${result} not found`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};
