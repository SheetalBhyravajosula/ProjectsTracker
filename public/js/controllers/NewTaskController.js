angular
  .module("NewTaskController", [
    "EmployeeService",
    "ProjectService",
    "ReportService", 'TaskService'
  ])
  .controller("NewTaskController", [
    "Employee",
    "Project",
    "Task", '$filter',
    "$location",
    "$scope",
    function (Employee, Project, Task, $filter, $location, $scope) {
      let vm = this;
      var form = document.querySelector("form");
      $scope.task = Task.task;
      $scope.saveDisabled = true;
      $scope.projects = Project.projects;
      $scope.employees = Employee.employees;
      $scope.task.TaskStartDate = $scope.task && new Date($scope.task.TaskStartDate);
      $scope.task.TaskEndDate = $scope.task && new Date($scope.task.TaskEndDate);
      $scope.task.Employee = $scope.task && $scope.task.Employee.toString();
      $scope.task.TaskType = $scope.task && $scope.task.TaskType.toString();
      $scope.task.Duration = $scope.task && parseInt($scope.task.Duration.$numberDecimal);
      console.log($scope.task);
      form.addEventListener("change", function () {
        if ($scope.saveDisabled) $scope.saveDisabled = false;
      });

      Task.getTaskTypes().then(function(response){
        $scope.taskTypes=response.data.data;
      }).catch(function(err){
        $scope.taskTypes=err.data;
      });
      $scope.checkDate = function(){
        if($scope.task && $scope.task.TaskStartDate > $scope.task.TaskEndDate){
          $scope.errMessage="Start Date should be earlier than End Date";
        }
        else{
          $scope.errMessage="";
        }
      }
      $scope.save = function(task){
        vm.task = task;
        let proj = Project.projects.find(p => p.ProjectName === vm.task.Project );
        vm.task.Project =  proj && proj._id;
        let emp = Employee.employees.find(e => e.EmployeeId === parseInt(vm.task.Employee));
        vm.task.Employee = emp && emp._id;
        if(Task.task == null || Task.task == undefined){
          Task.createTask(vm.task).then(function(response){
            console.log(response);
            $location.path('/tasks')
          }).catch(function(err){
            console.log(err);
          });
        }
        else{
          Task.modifyTask(vm.task).then(function(response){
            console.log(response);
            $location.path('/tasks')
          }).catch(function(err){
            console.log(err);
          });
        }
      }
      $scope.AllTasks = function(){
        $location.path('/tasks');
      }
    }
  ]);