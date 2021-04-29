angular
  .module("EmployeeFormController", ["EmployeeService", "ProjectService"])
  .controller("EmployeeFormController", ["Employee","Project","$location",
    function (Employee, Project,$location) {
      let vm = this;
      var form = document.querySelector("form");
      vm.saveDisabled = Employee.saveDisable;
      vm.disableID = Employee.disableID;
      form.addEventListener("change", function () {
        if (vm.saveDisabled) vm.saveDisabled = false;
      });
      vm.employee = Employee.employee;
      vm.projects = Project.projects;
      vm.save = function (emp) {
        vm.e = emp;
        let project = vm.projects.find(
          (id) => id.ProjectName === emp.Project
        );
        vm.e.Project = project._id;
        if (Employee.employee === null) {
          Employee.createEmployee(vm.e)
            .then(function (response) {
              vm.employee.Project = project.ProjectName;
              vm.disableID = true;
              console.log(response);
            })
            .catch(function (err) {
              vm.employee.Project = project.ProjectName;
              console.log(err);
            });
          Employee.setEmployee(vm.employee);
          vm.saveDisabled = Employee.saveDisable;
          $location.path('/employees');
        } else {
          Employee.updateEmployee(vm.e)
            .then(function (response) {
              vm.employee.Project = project.ProjectName;
              vm.disableID = true;
              console.log(response);
            })
            .catch(function (err) {
              vm.employee.Project = project.ProjectName;
              console.log(err);
            });
          Employee.setEmployee(vm.employee);
          vm.saveDisabled = Employee.saveDisable;
          $location.path('/employees');
        }
      };
    },
  ]);
