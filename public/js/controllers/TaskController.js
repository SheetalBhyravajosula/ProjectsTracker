angular.module("TaskController", ["TaskService","EmployeeService", "ProjectService", "ngMaterial"]).controller("TaskController",["Task","Employee", "Project", "$location", "$scope",
function(Task,Employee, Project,$location, $scope) {
    let vm=this;
    $scope.employee = {};
    $scope.taskData = null;
    vm.employees = null;
    vm.getTasksAll = function(){
      Task.getTasks().then(function(response){
        vm.taskData=response.data.data;
        vm.taskData.forEach(task => {
          let emp = Employee.employees.find(emp=>emp._id===task.Employee);
          task.Employee = emp && emp.EmployeeId;
          let proj = Project.projects.find(pro=>pro._id===task.Project);
          task.Project = proj && proj.ProjectName;
        });
        $scope.taskData = vm.taskData;
      });
    }
    vm.getTasksAll();
    $scope.Edit = function(task) {
        Task.setTask(task);
        $location.path('/tasks/' + task.TaskDescription);
    }
    $scope.Delete = function(task){
        Task.deleteTask(task).then(function(response){
            console.log(response);
        }).catch(function(err){
            console.log(err);
        });
        vm.getTasksAll();
    }
    $scope.AddNewTask = function () {
      Task.setTask(null);
      $location.path("/tasks/newTask");
    };
},
]);
  