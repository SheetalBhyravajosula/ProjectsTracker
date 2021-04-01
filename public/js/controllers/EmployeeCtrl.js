angular
  .module("EmployeeController", [
    "EmployeeService",
    "ProjectService",
    "ngMaterial",
  ])
  .controller("EmployeeController", [
    "Employee",
    "Project",
    "$scope",
    function (Employee, Project, $scope) {
      $scope.empData = null;
      this.employees = null;
      Employee.getEmployees()
        .then(function ({ data }) {
          this.employees = data.data;
          this.employees.forEach((emp) => {
            Project.getProjectById(emp.Project)
              .then(function ({ data }) {
                if (data && data.data.ProjectName) {
                  let value = this.employees.find(
                    (e) => emp.EmployeeId == e.EmployeeId
                  );
                  this.employees.find(
                    (e) => emp.EmployeeId == e.EmployeeId
                  ).Project = data.data.ProjectName;
                }
              })
              .catch(function (err) {
                this.employees.Project = err;
              });
          });
          $scope.empData = this.employees;
        })
        .catch(function (err) {
          this.employees = err;
        });
    },
  ]);
