angular
  .module("DeleteModalController", [
    "EmployeeService",
    "ProjectService",
    "TaskService",
    "ReportService",
  ])
  .controller("DeleteModalController", [
    "Employee",
    "Project",
    "Task",
    "Report",
    "$scope",
    "$mdDialog",
    "obj",
    "type",
    "DeleteMessage",
    function (
      Employee,
      Project,
      Task,
      Report,
      $scope,
      $mdDialog,
      obj,
      type,
      DeleteMessage
    ) {
      let vm = this;
      $scope.type = type;
      $scope.obj = obj;
      $scope.DeleteMessage = DeleteMessage;
      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.delete = async function () {
        switch ($scope.type) {
          case "Employee": {
            await vm.deleteEmployee(obj);
            $scope.hide();
          }
          case "Project": {
            await vm.deleteProject(obj);
            $scope.hide();
          }
          case "Task": {
            await Task.deleteTask(obj);
            $scope.hide();
          }
        }
      };
      vm.deleteEmployee = async function (emp) {
        await Report.getTasksByEmpId(emp.EmployeeId).then((response) => {
          emp.Tasks = response.data.data;
          emp.Tasks.forEach(async (task) => {
            await Task.deleteTask(task);
          });
        }).catch((err)=>{
          console.log(err);
        });
        Employee.deleteEmployee(emp)
          .then((response) => {
            console.log(response);
          })
          .catch(function (err) {
            console.log(err);
          });
      };
      vm.deleteProject = async function (proj) {
        await Report.getEmployeesByProjectName(proj).then((response) => {
          proj.Employees = response.data.data;
          proj.Employees.forEach(async (emp) => {
            await vm.deleteEmployee(emp);
          });
        }).catch((err)=>{
          console.log(err);
        });
        Project.deleteProject(proj)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    },
  ]);
