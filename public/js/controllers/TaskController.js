angular.module("TaskController", ["TaskService","EmployeeService", "ProjectService", "ngMaterial"]).controller("TaskController",["Task","Employee", "Project", "$location",
function(Task,Employee, Project,$location) {
    let vm=this;
    vm.employee = {};
    vm.taskData = null;
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
        vm.taskData = vm.taskData;
      });
    }
    vm.getTasksAll();
    vm.Edit = function(task) {
        Task.disable = true;
        Task.setFormType(true);
        Task.setTask(task);
        $location.path('/tasks/' + task.TaskDescription);
    }
    vm.Delete = function(task){
        Task.deleteTask(task).then(function(response){
            console.log(response);
        }).catch(function(err){
            console.log(err);
        });
        vm.getTasksAll();
    }
    vm.AddNewTask = function () {
      Task.disable = false;
      Task.setTask(null);
      $location.path("/tasks/newTask");
    };
    vm.View= function(task){
      Task.setTask(task);
      Task.setFormType(false);
      $location.path('/tasks/' + task.TaskDescription);
    }
},
]);
  