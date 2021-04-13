angular
  .module("ProjectController", ["ProjectService"])
  .controller("ProjectController", [
    "Project",
    "$scope",
    function (Project, $scope) {
     $scope.projData= {};
      Project.getProjects()
        .then(function ({ data }) {
          $scope.projData = data.data;
          Project.setProjects(data.data);
        })
        .catch(function (err) {
          $scope.projData = err;
        });
    },
  ]);
