angular
  .module("EmployeeController", [
    "EmployeeService",
    "LoginService",
    "ngMaterial",
  ])
  .controller("EmployeeController", [
    "Employee",
    "$location",
    "Login",
    "$mdDialog",
    "$scope",
    function (Employee, $location, Login, $mdDialog, $scope) {
      var vm = this;
      vm.employee = {};
      vm.empData = null;
      vm.employees = null;
      $scope.loginSuccess = Login.loginSuccess;
      $scope.errMessage = "";
      vm.loading = false;
      vm.AddDisabled = true;
      $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
      };
      $scope.openNav = function () {
        document.getElementById("mySidenav").style.width = "250px";
      };

      $scope.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
      };
      $scope.login = function (userName, password) {
        Login.login(userName, password)
          .then(async (response) => {
            Login.setAuthToken(response);
            Login.setLoginSuccess(true);
            $scope.loginSuccess = Login.loginSuccess;
            Login.setCurrentUser(vm.employees, response.data);
            await Login.setUserPermissions();
            $scope.userPerms = Login.currentEmployeeDetails;
            $scope.errMessage = "";
          })
          .catch((response) => {
            console.log(response);
            if (response.status === "400")
              $scope.errMessage = "No User Found! Please SignUp if New User";
            else {
              $scope.errMessage =
                "Wrong UserName/Password Login Failed! Please Try Again";
            }
          });
      };
      vm.reset = function () {
        this.userName = "";
        this.password = "";
      };
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
      $scope.logout = function () {
        $scope.closeNav();
        Login.setLoginSuccess(false);
        $scope.loginSuccess = Login.loginSuccess;
        this.userName = "";
        this.password = "";
        $location.path("/");
      };
      vm.getEmployeesAll = function () {
        vm.loading = true;
        Employee.getEmployees()
          .then(function ({ data }) {
            vm.employees = data.data;
            vm.empData = vm.employees;
            Employee.setEmployees(vm.employees);
            vm.loading = false;
          })
          .catch(function (err) {
            vm.employees = err;
            vm.loading = false;
          });
      };
      vm.getEmployeesAll();
      vm.employeeRights = Login.employeeRights;
      if (Login.currentUser && Login.currentUser.role === "Admin")
        vm.AddDisabled = false;
      vm.Edit = function (employee) {
        Employee.setEmployee(employee);
        $location.path("/employees/" + employee.EmployeeId);
      };
      vm.AddNewEmployee = function () {
        Employee.setEmployee(null);
        $location.path("/employees/new");
      };
      vm.Delete = function (ev, employee) {
        let config = {
          controller: "DeleteModalController",
          templateUrl: "views/deleteModal.html",
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen,
          locals: {
            obj: employee,
            type: "Employee",
            DeleteMessage:"Are you sure you want to delete?\nDeleting Employee will delete all the corresponding tasks !"
          },
        };
        $mdDialog.show(config).then(() => {
          vm.getEmployeesAll();
        });
      };
    },
  ]);
