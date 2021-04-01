angular
  .module("EmployeeService", ['ngMaterial'])
  .service('Employee', function ($http, $q) {
      var deffered =$q.defer();
      this.getEmployees = function () {
       $http.get("/employees/getEmployees").then(function success(response){
          deffered.resolve(response);
        },function error(response){
          deffered.reject(response);
        });
        return deffered.promise;
      }
  });
