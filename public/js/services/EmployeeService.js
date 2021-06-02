angular
  .module("EmployeeService", ["ngMaterial"])
  .service("Employee", function ($http, $q, $cookies) {
    this.employee = null;
    this.employees = null;
    this.disableID = false;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: $cookies.get("AuthToken"),
    };
    this.getEmployees = function () {
      var deffered = $q.defer();
      var req = {
        method: "GET",
        url: "/employees/getEmployees",
        headers: this.headers,
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

    this.setEmployee = function (employee) {
      this.employee = employee;
      this.disableID = this.employee && this.employee.EmployeeId;
    };

    this.setEmployees = function (employees) {
      this.employees = employees;
    };

    this.updateEmployee = function (employee) {
      var deffered = $q.defer();
      let emp = { updateEmployee: employee };
      var req = {
        method: "POST",
        url: "/employees/modifyEmployee/" + employee.EmployeeId,
        data: JSON.stringify(emp),
        headers: this.headers,
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
        headers: this.headers,
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
        headers: this.headers,
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
  });
