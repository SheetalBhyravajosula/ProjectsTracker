angular
  .module("EmployeeService", ["ngMaterial"])
  .service("Employee", function ($http, $q) {
    this.employee = null;
    this.employees = null;
    this.disableID = false;
    this.getEmployees = function () {
      var deffered = $q.defer();
      $http.get("/employees/getEmployees").then(
        function success(response) {
          deffered.resolve(response);
        },
        function error(response) {
          deffered.reject(response);
        }
      );
      return deffered.promise;
    };

    this.setEmployee = function (employee) {
      this.employee = employee;
      this.disableID = this.employee && this.employee.EmployeeId;
    };

    this.setEmployees = function(employees){
      this.employees = employees
    }

    this.updateEmployee = function (employee) {
      var deffered = $q.defer();
      let emp = { updateEmployee: employee };
      var req = {
        method: "POST",
        url: "/employees/modifyEmployee/" + employee.EmployeeId,
        data: JSON.stringify(emp),
        headers: { "Content-Type": "application/json" },
      };
      $http(req).then(
        function success(response) {
          deffered.resolve(response);
        },
        function error(response) {
          deffered.reject(response);
        }
      );
      return deffered.promise;
    };
    this.createEmployee = function (employee) {
      var deffered = $q.defer();
      let emp = { employee: employee };
      var req = {
        method: "POST",
        url: "/employees/createEmployee",
        data: JSON.stringify(emp),
        headers: { "Content-Type": "application/json" },
      };
      $http(req).then(
        function success(response) {
          deffered.resolve(response);
        },
        function error(response) {
          deffered.reject(response);
        }
      );
      return deffered.promise;
    };
    this.deleteEmployee = function (employee) {
      var deffered = $q.defer();
      var req = {
        method: "GET",
        url: "/employees/deleteEmployee/" + employee.EmployeeId,
        headers: { "Content-Type": "application/json" },
      };
      $http(req).then(
        function success(response) {
          deffered.resolve(response);
        },
        function error(response) {
          deffered.reject(response);
        }
      );
      return deffered.promise;
    }
  });
  