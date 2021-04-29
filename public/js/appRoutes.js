angular.module("appRoutes", []).config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $routeProvider

      // home page
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "MainController",
      })

      .when("/tasks/newTask", {
        templateUrl: "views/newTask.html",
        controller: "NewTaskController",
      })

      .when("/tasks", {
        templateUrl: "views/task.html",
        controller: "TaskController",
      })

      .when("/tasks/:description", {
        templateUrl: "views/newTask.html",
        controller: "NewTaskController",
      })

      .when("/employees", {
        templateUrl: "views/employee.html",
        controller: "EmployeeController",
        controllerAs: "EmployeeCtrl",
        css: "stylesheets/employee.css"
      })
      .when("/employees/:id", {
        templateUrl: "views/employeeForm.html",
        controller: "EmployeeFormController",
        controllerAs: "EmployeeFormCtrl",
        css: "stylesheets/employeeForm.css",
      })
      .when("/employees/new", {
        templateUrl: "views/employeeForm.html",
        controller: "EmployeeFormController",
        controllerAs: "EmployeeFormCtrl",
        css: "stylesheets/employeeForm.css",
      })
      .when("/projects", {
        templateUrl: "views/project.html",
        controller: "ProjectController",
        controllerAs: "ProjectCtrl"
      })
      .when("/projects/:name", {
        templateUrl: "views/projectForm.html",
        controller: "ProjectFormController",
        controllerAs: "ProjectFormCtrl"
      })
      .when("/projects/new", {
        templateUrl: "views/projectForm.html",
        controller: "ProjectFormController",
        controllerAs: "ProjectFormCtrl"
      })
      .otherwise({
        templateUrl: "views/home.html",
      });

    $locationProvider.html5Mode(true);
  },
]);
