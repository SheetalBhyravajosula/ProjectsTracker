angular
  .module("NewUserController", ["LoginService"])
  .controller("NewUserController", [
    "Login",
    "$scope",
    "$mdDialog",
    "type",
    function (Login, $scope, $mdDialog, type) {
      $scope.type = type;
      $scope.roles = ["Employee", "Admin"];
      $scope.questions = ["Age", "Favourite Hobby", "Favourite Singer"];
      $scope.errMessage = "";
      $scope.ErrorFound = false;
      $scope.user = {};
      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.checkPassword = function () {
        $scope.errMessage = "";
        $scope.ErrorFound = false;
        if ($scope.user && $scope.user.password !== $scope.user.rePassword) {
          $scope.errMessage = "Re-Type correct password!";
          $scope.ErrorFound = true;
        }
      };
      $scope.submit = function (user) {
        $scope.errMessage = "";
        $scope.ErrorFound = false;
        Login.signUp(user)
          .then((response) => {
            console.log(response);
            $scope.user = {};
            $scope.type = "SignUpSuccess";
            $scope.print = "Sign Up Success";
            $scope.LoginMessage =
              "Thanks for registering! Please click on Close to Redirect to Projects Tracker Page";
          })
          .catch((err) => {
            $scope.errMessage =
              "Couldn't complete registration! Please try again (check if the user already exists)";
            $scope.ErrorFound = true;
            console.log(err);
          });
      };
      $scope.populateSecurityQ = function (userId) {
        if (userId) {
          Login.getUserByID(userId)
            .then((response) => {
              this.userSQ = response.data.data[0];
              $scope.user.securityQuestion =
                response.data.data[0].securityQuestion;
              $scope.user.role = response.data.data[0].UserData.role;
            })
            .catch((err) => {
              console.log(err);
              $scope.errMessage = "User Not Found! If new please Sign Up";
              $scope.ErrorFound = true;
            });
        }
      };
      $scope.checkAnswer = function () {
        $scope.errMessage = "";
        $scope.ErrorFound = false;
        if (
          $scope.user &&
          $scope.user.securityAnswer !== this.userSQ.securityAnswer
        ) {
          $scope.errMessage = "Wrong answer to question!";
          $scope.ErrorFound = true;
        }
      };
      $scope.modify = function (user) {
        Login.modifyUser(user)
          .then((response) => {
            $scope.type = "SignUpSuccess";
            $scope.print = "Password Changed!";
            $scope.LoginMessage =
              "Password Changed Successfully! Please click on Close to Redirect to Projects Tracker Page";
          })
          .catch((err) => {
            console.log(err);
          });
      };
    },
  ]);
