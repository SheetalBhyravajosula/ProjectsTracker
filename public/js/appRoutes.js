angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })

    .when('/employees', {
            templateUrl: 'views/employee.html',
            controller: 'EmployeeController'
        })
        .otherwise({
            templateUrl: 'views/home.html'
        });


    $locationProvider.html5Mode(true);

}]);