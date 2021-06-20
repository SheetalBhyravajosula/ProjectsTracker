angular
  .module("ProjectController", ["ProjectService", "LoginService"])
  .controller("ProjectController", [
    "Project",
    "Login",
    "$location","$scope","$mdDialog",
    function (Project, Login, $location,$scope,$mdDialog) {
      let vm = this;
      vm.projData = Project.projects;
      vm.AddDisabled = true;
      vm.allProjects = function () {
        vm.loading = true;
        Project.getProjects()
          .then(function ({ data }) {
            vm.projData = data.data;
            Project.setProjects(vm.projData);
            vm.loading = false;
          })
          .catch(function (err) {
            vm.projData = err;
            vm.loading = false;
          });
      };
      vm.allProjects();
      vm.projectRights = Login.projectRights;
      if (Login.currentUser && Login.currentUser.role === "Admin")
        vm.AddDisabled = false;
      vm.AddNewProject = function () {
        Project.setProject(null);
        $location.path("/projects/new");
      };
      vm.Edit = function (project) {
        Project.setProject(project);
        Project.setFormType(true);
        $location.path("/projects/" + project.ProjectName);
      };
      vm.View = function (project) {
        Project.setProject(project);
        Project.setFormType(false);
        $location.path("/projects/" + project.ProjectName);
      };
      vm.Delete = function (ev,project) {
        let config = {
          controller: "DeleteModalController",
          templateUrl: "views/deleteModal.html",
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen,
          locals: {
            obj: project,
            type: "Project",
            DeleteMessage:"Are you sure you want to delete?\nDeleting Project will delete all the corresponding employees and tasks !"
          },
        };
        $mdDialog.show(config).then(() => {
          vm.allProjects();
        });
      };
    },
  ]);
