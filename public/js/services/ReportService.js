angular
  .module("ReportService", ["ngMaterial"])
  .service("Report", function ($http, $q , $cookies) {
    this.headers = {
      "Content-Type": "application/json",
      Authorization: $cookies.get("AuthToken"),
    };
    this.getEmployeesByProjectName = function (project) {
      var deffered = $q.defer();
      var req = {
        method: "GET",
        url: "/reports/getEmployeesbyProjectName/" + project.ProjectName,
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
    this.getTasksByEmpId = function (employee) {
      var deffered = $q.defer();
      var req = {
        method: "GET",
        url: "/reports/getTasksbyEmpID/" + employee.EmployeeId,
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
