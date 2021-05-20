angular
  .module("ProjectFormController", ["ProjectService"])
  .controller("ProjectFormController", [
    "Project",
    "$location",
    function (Project, $location) {
      let vm = this;
      var form = document.querySelector("form");
      vm.saveDisabled = Project.saveDisable;
      vm.disableName = Project.disableName;
      form.addEventListener("change", function () {
        if (vm.saveDisabled) vm.saveDisabled = false;
      });
      vm.Edit = Project.Edit;
      vm.projects = Project.projects;
      vm.project = Project.project;
      if (vm.project) {
        vm.project.ProjectType = vm.project && vm.project.ProjectType.toString();
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
      }
      vm.EditProject = function () {
        vm.Edit = true;
      };
      vm.save = function (proj) {
        let technology = proj.Technology.split(",");
        proj.Technology = technology;
        vm.p = proj;
        if (Project.project === null) {
          Project.createProject(vm.p)
            .then(function (response) {
              vm.disableName = true;
              console.log(response);
            })
            .catch(function (err) {
              console.log(err);
            });
          Project.setProject(vm.project);
          vm.saveDisabled = Project.saveDisable;
          $location.path("/projects");
        } else {
          Project.updateProject(vm.p)
            .then(function (response) {
              vm.disableName = true;
              console.log(response);
            })
            .catch(function (err) {
              console.log(err);
            });
          Project.setProject(vm.project);
          vm.saveDisabled = Project.saveDisable;
          $location.path("/projects");
        }
      };
    },
  ]);
