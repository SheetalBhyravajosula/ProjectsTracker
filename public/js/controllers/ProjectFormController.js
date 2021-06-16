angular
  .module("ProjectFormController", ["ProjectService","LoginService"])
  .controller("ProjectFormController", [
    "Project","Login",
    "$location",
    function (Project, Login , $location) {
      let vm = this;
      vm.disableName = Project.disableName;
      vm.Edit = Project.Edit;
      vm.projects = Project.projects;
      vm.project = Project.project;
      Project.getProjectTypes()
        .then(function (response) {
          let newArray = response.data.data.filter(
            (value) => Object.keys(value).length !== 0
          );
          vm.projectTypes = newArray;
        })
        .catch(function (err) {
          vm.projectTypes = err.data;
        });
      vm.EditProject = function () {
        vm.Edit = true;
      };
      vm.projectRights = Login.projectRights;
      vm.save = function (proj) {
        let technology = proj.Technology.split(",");
        proj.Technology = technology;
        vm.p = proj;
        if (Project.project === null) {
          Project.createProject(vm.p)
            .then(function (response) {
              vm.disableName = true;
              console.log(response);
              Project.setProject(vm.project);
              $location.path("/projects");
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          Project.updateProject(vm.p)
            .then(function (response) {
              vm.disableName = true;
              console.log(response);
              Project.setProject(vm.project);
              $location.path("/projects");
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      };
    },
  ]);
