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
      .otherwise({
        templateUrl: "views/home.html",
      });

    $locationProvider.html5Mode(true);
  },
]);
