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

      .when("/employees", {
        templateUrl: "views/employee.html",
        controller: "EmployeeController",
        css: "stylesheets/employee.css"
      })
      .when("/employees/:id", {
        templateUrl: "views/employeeForm.html",
        controller: "EmployeeFormController",
        css: "stylesheets/employeeForm.css",
      })
      .when("/employees/new", {
        templateUrl: "views/employeeForm.html",
        controller: "EmployeeFormController",
        css: "stylesheets/employeeForm.css",
      })
      .when("/projects", {
        templateUrl: "views/project.html",
        controller: "ProjectController",
      })
      .when("/projects/:name", {
        templateUrl: "views/projectForm.html",
        controller: "ProjectFormController",
      })
      .when("/projects/new", {
        templateUrl: "views/projectForm.html",
        controller: "ProjectFormController",
      })
      .otherwise({
        templateUrl: "views/home.html",
      });

    $locationProvider.html5Mode(true);
  },
]);
