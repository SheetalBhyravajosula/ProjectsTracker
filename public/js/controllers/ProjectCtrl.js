angular
  .module("ProjectController", ["ProjectService","LoginService"])
  .controller("ProjectController", [
    "Project","Login",
    "$location",
    function (Project,Login, $location) {
      let vm = this;
      vm.projData = Project.projects;
      vm.allProjects = function () {
        Project.getProjects()
          .then(function ({ data }) {
            vm.projData = data.data;
            Project.setProjects(vm.projData);
          })
          .catch(function (err) {
            vm.projData = err;
          });
      };
      vm.allProjects();
     // vm.projectRights = Login.projectRights;
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
      vm.Delete = function (project) {
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
