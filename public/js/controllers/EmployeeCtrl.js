angular
  .module("EmployeeController", [
    "EmployeeService",
    "ProjectService",
    "ngMaterial"
  ])
  .controller("EmployeeController", [
    "Employee",
    "Project",
    "$location",
    "$scope",
    function (Employee, Project, $location, $scope) {
      var vm = this;
      vm.employee = {};
      vm.empData = null;
      vm.employees = null;
      $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
      };
      $scope.openNav = function () {
        document.getElementById("mySidenav").style.width = "250px";
      };

      $scope.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
      };
      vm.getEmployeesAll = function () {
        Employee.getEmployees()
          .then(function ({ data }) {
            vm.employees = data.data;
            vm.employees.forEach((emp) => {
              Project.getProjects()
                .then(function ({ data }) {
                  vm.emp = emp;
                  let projects = data.data;
                  Project.setProjects(projects);
                  let project = projects.find((id) => id._id === emp.Project);
                  vm.emp.Project = project.ProjectName;
                })
                .catch(function (err) {
                  vm.employees.Project = err;
                });
            });
            vm.empData = vm.employees;
            Employee.setEmployees(vm.employees);
          })
          .catch(function (err) {
            vm.employees = err;
          });
      };
      vm.getEmployeesAll();
      vm.Edit = function (employee) {
        Employee.setEmployee(employee);
        $location.path("/employees/" + employee.EmployeeId);
      };
      vm.AddNewEmployee = function () {
        Employee.setEmployee(null);
        $location.path("/employees/new");
      };
      vm.Delete = function (employee) {
        Employee.deleteEmployee(employee)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (err) {
            console.log(err);
          });
        vm.getEmployeesAll();
      };
    },
  ]);