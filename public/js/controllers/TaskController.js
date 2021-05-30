angular.module("TaskController", ["TaskService","EmployeeService", "ProjectService", "ngMaterial"]).controller("TaskController",["Task","Employee", "Project", "$location",
function(Task,Employee, Project,$location) {
    let vm=this;
    vm.employee = {};
    vm.tasks = null;
    vm.taskData =null;
    vm.employees = null;
    vm.getTasksAll = function(){
      Task.getTasks().then(function(response){
        vm.taskData=response.data.data;
        vm.taskData.forEach(task => {
          task.startDate = moment(task.TaskStartDate).format('DD-MM-YYYY');
          task.endDate = moment(task.TaskEndDate).format('DD-MM-YYYY')
        });
        vm.tasks = vm.taskData;
      });
    }
    vm.getTasksAll();
    vm.sortDates = function(t) {
      return t['TaskStartDate'].split('-').reverse().join('-');
    };
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
  