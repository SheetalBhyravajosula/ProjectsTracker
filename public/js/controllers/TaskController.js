angular
  .module("TaskController", [
    "TaskService",
    "EmployeeService",
    "ProjectService",
    "LoginService",
    "ngMaterial",
  ])
  .controller("TaskController", [
    "Task",
    "Login",
    "$location",
    function (Task, Login, $location) {
      let vm = this;
      vm.employee = {};
      vm.tasks = null;
      vm.taskData = null;
      vm.employees = null;
      vm.getTasksAll = function () {
        vm.loading = true;
        Task.getTasks()
          .then(function (response) {
            vm.loading = false;
            vm.taskData = response.data.data;
            vm.taskData.forEach((task) => {
              task.startDate = moment(task.TaskStartDate).format("DD-MM-YYYY");
              task.endDate = moment(task.TaskEndDate).format("DD-MM-YYYY");
            });
            vm.tasks = vm.taskData;
          })
          .catch((err) => {
            console.log(err);
            vm.loading = false;
          });
      };
      vm.getTasksAll();
      vm.sortDates = function (t) {
        return t["TaskStartDate"].split("-").reverse().join("-");
      };
      vm.Edit = function (task) {
        Task.disable = true;
        Task.setFormType(true);
        Task.setTask(task);
        $location.path("/tasks/" + task.TaskDescription);
      };
      vm.taskRights = Login.taskRights;
      vm.Delete = function (task) {
        Task.deleteTask(task)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (err) {
            console.log(err);
          });
        vm.getTasksAll();
      };
      vm.AddNewTask = function () {
        Task.disable = false;
        Task.setTask(null);
        $location.path("/tasks/newTask");
      };
      vm.View = function (task) {
        Task.setTask(task);
        Task.setFormType(false);
        $location.path("/tasks/" + task.TaskDescription);
      };
    },
  ]);
