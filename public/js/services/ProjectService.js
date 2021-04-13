angular
  .module("ProjectService", [])
  .service('Project', function ($http, $q) {
      this.projects = null;
      this.getProjects = function () {
        var deffered =$q.defer();
       $http.get("/projects/getProjects").then(function success(response){
          deffered.resolve(response);
        },function error(response){
          deffered.reject(response);
        });
        return deffered.promise;
      }
      this.getProjectById = function (id) {
        var deffered =$q.defer();
        $http.get("/projects/getProjectById/"+id).then(function success(response){
           deffered.resolve(response);
         },function error(response){
           deffered.reject(response);
         });
         return deffered.promise;
       }
       this.setProjects = function(projects){
        this.projects=projects;
       }
       
  });
