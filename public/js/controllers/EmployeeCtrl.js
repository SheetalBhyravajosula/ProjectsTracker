angular
  .module("EmployeeController", [
    "EmployeeService",
    "ProjectService",
    "LoginService",
    "ngMaterial",
  ])
  .controller("EmployeeController", [
    "Employee",
    "$location",
    "Login",
    "$scope",
    function (Employee, $location, Login, $scope) {
      var vm = this;
      vm.employee = {};
      vm.empData = null;
      vm.employees = null;
      vm.employeeRights = new Array();
      $scope.loginSuccess = Login.loginSuccess;
      $scope.errMessage = "";
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
        Login.login(userName, password);
        $scope.loginSuccess = Login.loginSuccess;
        if (!$scope.loginSuccess) {
          $scope.errMessage = "Wrong UserName/Password Login Failed!";
          this.userName = "";
          this.password = "";
        } else {
          $scope.errMessage = "";
        }
      };
      $scope.logout = function () {
        $scope.closeNav();
        Login.setLoginSuccess(false);
        $scope.loginSuccess = Login.loginSuccess;
        this.userName = "";
        this.password = "";
      };
      vm.getEmployeesAll = function () {
        Employee.getEmployees()
          .then(function ({ data }) {
            vm.employees = data.data;
            vm.empData = vm.employees;
            Employee.setEmployees(vm.employees);
          })
          .catch(function (err) {
            vm.employees = err;
          });
      };
      vm.getEmployeesAll();
      vm.employeeRights = Login.employeeRights;
      vm.Edit = function (employee) {
        Employee.setEmployee(employee);
        $location.path("/employees/" + employee.EmployeeId);
      };
      vm.AddNewEmployee = function () {
        Employee.setEmployee(null);
        $location.path("/employees/new");
      };
      vm.Delete = function (employee) {
        Employee.deleteEmployee(employee)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (err) {
            console.log(err);
          });
        vm.getEmployeesAll();
      };
    },
  ]);