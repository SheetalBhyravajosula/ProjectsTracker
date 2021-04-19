angular
  .module("ProjectController", ["ProjectService"])
  .controller("ProjectController", [
    "Project",
    "$location",
    "$scope",
    function (Project, $location, $scope) {
      let vm = this;
      $scope.projData = Project.projects;
      vm.allProjects = function () {
        Project.getProjects()
          .then(function ({ data }) {
            $scope.projData = data.data;
            Project.setProjects($scope.projData);
          })
          .catch(function (err) {
            $scope.projData = err;
          });
      };
      vm.allProjects();
      $scope.AddNewProject = function () {
        Project.setProject(null);
        $location.path("/projects/new");
      };
      $scope.Edit = function (project) {
        Project.setProject(project);
        Project.setFormType(true);
        $location.path("/projects/" + project.ProjectName);
      };
      $scope.View = function (project) {
        Project.setProject(project);
        Project.setFormType(false);
        $location.path("/projects/" + project.ProjectName);
      };
      $scope.Delete = function (project) {
        Project.deleteProject(project)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (err) {
            console.log(err);
          });
          vm.allProjects();
      };
    },
  ]);
