angular
  .module("EmployeeFormController", ["EmployeeService", "ProjectService"])
  .controller("EmployeeFormController", ["Employee","Project","$location","$window",
    function (Employee, Project,$location,$window) {
      let vm = this;
      vm.disableID = Employee.disableID;
      vm.employee = Employee.employee;
      vm.projects = Project.projects;
      vm.save = function (emp) {
        vm.e = emp;
        if (Employee.employee === null) {
         Employee.createEmployee(vm.e)
            .then(function () {
              vm.disableID = true;
              Employee.setEmployee(vm.employee);
              $location.path('/employees');
            })
            .catch(function (err) {
              console.log(err);
              alert("Failed to submit:" +err.data.message)
            });
        } else {
          Employee.updateEmployee(vm.e)
            .then(function () {
              vm.disableID = true;
              Employee.setEmployee(vm.employee);
              $location.path('/employees');
            })
            .catch(function (err) {
              alert("Failed to submit:" +err.data.message)
              console.log(err);
            });
        }
      };
      vm.goBack = function(){
        $window.history.back();
      }
    },
  ]);
