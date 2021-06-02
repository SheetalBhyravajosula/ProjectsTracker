angular
  .module("ReportService", ["ngMaterial"])
  .service("Report", function ($http, $q) {
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
  });
