angular
  .module("ProjectFormController", ["ProjectService"])
  .controller("ProjectFormController", ["Project","$location","$scope",function (Project, $location, $scope) {
      let vm = this;
      var form = document.querySelector("form");
      $scope.saveDisabled = Project.saveDisable;
      $scope.disableName = Project.disableName;
      form.addEventListener("change", function () {
        if ($scope.saveDisabled) $scope.saveDisabled = false;
      });
      $scope.Edit = Project.Edit;
      $scope.project = Project.project;
      $scope.projects = Project.projects;
      Project.getProjectTypes().then(function(response){
        let newArray = response.data.data.filter((value) => Object.keys(value).length !== 0);
        $scope.projectTypes=newArray;
      }).catch(function(err){
        $scope.projectTypes=err.data;
      })
      $scope.EditProject = function(){
        $scope.Edit = true;
      }
      $scope.save = function (proj) {
        let technology = proj.Technology.split(',');
        proj.Technology = technology;
        vm.p = proj;
        if (Project.project === null) {
          Project.createProject(vm.p)
            .then(function (response) {
              $scope.disableName = true;
              console.log(response);
            })
            .catch(function (err) {
              console.log(err);
            });
          Project.setProject($scope.project);
          $scope.saveDisabled = Project.saveDisable;
          $location.path('/projects');
        } else {
          Project.updateProject(vm.p)
            .then(function (response) {
              $scope.disableName = true;
              console.log(response);
            })
            .catch(function (err) {
              console.log(err);
            });
          Project.setProject($scope.project);
          $scope.saveDisabled = Project.saveDisable;
          $location.path('/projects');
        }
      };
    },
  ]);
