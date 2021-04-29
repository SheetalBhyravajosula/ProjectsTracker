angular
  .module("ReportService", ["ngMaterial"])
  .service("Report", function ($http, $q) {
    this.getEmployeesByProjectName = function (project) {
        var deffered = $q.defer();
        $http.get("/reports/getEmployeesbyProjectName/"+ project.ProjectName).then(
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