angular
  .module("ProfileController", ["LoginService", "TaskService", "ReportService","EmployeeService"])
  .controller("ProfileController", [
    "Login",
    "Task",
    "Report","Employee",
    "$location",
    "$scope",
    function (Login, Task, Report,Employee, $location, $scope) {
      let vm = this;
      $scope.User = Login.currentUser;
      $scope.show = false;
      vm.getAllTasks = function (user) {
        Report.getTasksByEmpId(user.EmployeeId)
          .then(function (response) {
            vm.taskData = response.data.data;
            vm.taskData.forEach((task) => {
              task.startDate = moment(task.TaskStartDate).format("DD-MM-YYYY");
              task.endDate = moment(task.TaskEndDate).format("DD-MM-YYYY");
            });
            $scope.User.Tasks = vm.taskData;
            $scope.User.TasksNum =
              $scope.User.Tasks && $scope.User.Tasks.length;
          })
          .catch((err) => {
            console.log(err);
            $scope.User.Tasks = [];
            $scope.User.TasksNum = 0;
          });
      };
      vm.getAllTasks($scope.User);
      $scope.showTasks = function () {
        $scope.show = !$scope.show;
      };
      $scope.Edit = function (task) {
        Task.setFormType(true);
        Task.setTask(task);
        $location.path("/tasks/" + task.TaskDescription);
      };
      $scope.Delete = function (task) {
        Task.deleteTask(task)
          .then(function (response) {
            console.log(response);
            $scope.TasksNum = $scope.TasksNum - 1;
            $scope.User.Tasks = $scope.User.Tasks.filter(
              (item) => item !== response.data.data
            );
          })
          .catch(function (err) {
            console.log(err);
          });
        vm.getAllTasks($scope.User);
      };
      $scope.View = function (task) {
        Task.setTask(task);
        Task.setFormType(false);
        $location.path("/tasks/" + task.TaskDescription);
      };
      $scope.EditProfile = function (employee) {
        Employee.setEmployee(employee);
        $location.path("/employees/" + employee.EmployeeId);
      };
    },
  ]);
