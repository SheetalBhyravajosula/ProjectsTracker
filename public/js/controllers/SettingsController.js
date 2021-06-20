angular.module("SettingsController", ["LoginService"]).controller("SettingsController", [
  "$location",
  "$mdDialog",
  "$scope","Login",
  function ($location,$mdDialog, $scope,Login) {
    $scope.profileSettings = function () {
      $location.path("/profile");
    };
    $scope.User = Login.currentUser;
    $scope.openPopup = function (ev, type) {
      let config = {
        controller: "NewUserController",
        templateUrl: "views/newUser.html",
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen,
        locals: {
          type: type,
        },
      };
      $mdDialog.show(config);
    };
  },
]);
