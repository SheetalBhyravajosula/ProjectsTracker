angular
  .module("ProjectService", [])
  .service('Project', function ($http, $q) {
      var deffered =$q.defer();
      this.getProjects = function () {
       $http.get("/projects/getProjects").then(function success(response){
          deffered.resolve(response);
        },function error(response){
          deffered.reject(response);
        });
        return deffered.promise;
      }
      this.getProjectById = function (id) {
        $http.get("/projects/getProjectById/"+id).then(function success(response){
           deffered.resolve(response);
         },function error(response){
           deffered.reject(response);
         });
         return deffered.promise;
       }
  });
