angular
  .module("NewTaskController", [
    "EmployeeService",
    "ProjectService",
    "ReportService",
    "TaskService",
    "LoginService",
  ])
  .controller("NewTaskController", [
    "Employee",
    "Project",
    "Task",
    "Login",
    "$window",
    "$location",
    function (Employee, Project, Task, Login, $window, $location) {
      let vm = this;
      vm.Edit = Task.Edit;
      vm.disable = Task.disable;
      vm.taskRights = Login.taskRights;
      vm.task = Task.task;
      vm.projects = new Array();
      if (Login.currentUser.role === "Admin") {
        vm.projects = Project.projects;
      } else {
        let pro = Project.projects.find(
          (proj) => proj.ProjectName === Login.currentUser.Project
        );
        vm.projects.push(pro);
      }
      Project.projects.forEach((proj) => {
        if (vm.projectRights && vm.projectRights[proj.ProjectName]) {
          vm.projects.push(proj);
        }
      });
      vm.employees = Employee.employees;

      if (vm && vm.task) {
        vm.task.TaskStartDate =
          vm.task.TaskStartDate && new Date(vm.task.TaskStartDate);
        vm.task.TaskEndDate =
          vm.task.TaskEndDate && new Date(vm.task.TaskEndDate);
        vm.task.Employee = vm.task.Employee && vm.task.Employee.toString();
        vm.task.TaskType = vm.task.TaskType && vm.task.TaskType.toString();
        vm.task.Duration =
          vm.task.Duration && parseInt(vm.task.Duration.$numberDecimal);
      }
      Task.getTaskTypes()
        .then(function (response) {
          vm.taskTypes = response.data.data;
        })
        .catch(function (err) {
          vm.taskTypes = null;
        });
      vm.checkDate = function () {
        if (vm.task && vm.task.TaskStartDate > vm.task.TaskEndDate) {
          vm.errMessage = "Start Date should be earlier than End Date";
        } else {
          vm.errMessage = "";
        }
      };
      vm.save = function (task) {
        vm.task = task;
        if (Task.task == null || Task.task == undefined) {
          Task.createTask(vm.task)
            .then(async function (response) {
              vm.disable = true;
              await Login.setUserPermissions();
              $location.path("/tasks");
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          Task.modifyTask(vm.task)
            .then(function (response) {
              vm.disable = true;
              $location.path("/tasks");
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      };
      vm.EditTask = function () {
        vm.Edit = true;
      };
      vm.goBack = function () {
        $window.history.back();
      };
    },
  ]);
