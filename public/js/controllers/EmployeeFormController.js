angular
  .module("EmployeeFormController", ["EmployeeService", "ProjectService"])
  .controller("EmployeeFormController", ["Employee","Project","$location","$scope",
    function (Employee, Project,$location, $scope) {
      let vm = this;
      var form = document.querySelector("form");
      $scope.saveDisabled = Employee.saveDisable;
      $scope.disableID = Employee.disableID;
      form.addEventListener("change", function () {
        if ($scope.saveDisabled) $scope.saveDisabled = false;
      });
      $scope.employee = Employee.employee;
      $scope.projects = Project.projects;
      $scope.save = function (emp) {
        vm.e = emp;
        let project = $scope.projects.find(
          (id) => id.ProjectName === emp.Project
        );
        vm.e.Project = project._id;
        if (Employee.employee === null) {
          Employee.createEmployee(vm.e)
            .then(function (response) {
              $scope.employee.Project = project.ProjectName;
              $scope.disableID = true;
              console.log(response);
            })
            .catch(function (err) {
              $scope.employee.Project = project.ProjectName;
              console.log(err);
            });
          Employee.setEmployee($scope.employee);
          $scope.saveDisabled = Employee.saveDisable;
          $location.path('/employees');
        } else {
          Employee.updateEmployee(vm.e)
            .then(function (response) {
              $scope.employee.Project = project.ProjectName;
              $scope.disableID = true;
              console.log(response);
            })
            .catch(function (err) {
              $scope.employee.Project = project.ProjectName;
              console.log(err);
            });
          Employee.setEmployee($scope.employee);
          $scope.saveDisabled = Employee.saveDisable;
          $location.path('/employees');
        }
      };
    },
  ]);
