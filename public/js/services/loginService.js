angular
  .module("LoginService", ["ngMaterial", "EmployeeService", "ProjectService"])
  .service("Login", [
    "Employee",
    "Project",
    "$http",
    "$q",
    function (Employee, Project, $http, $q) {
      this.loginSuccess = false;
      this.employeeRights = new Array();
      this.projectRights = new Array();
      this.login = function (user, pass) {
        var deffered = $q.defer();
        let creds = {
          userId: user,
          password: pass,
        };
        let login = { credentials: creds };
        var req = {
          method: "POST",
          url: "/users/login",
          data: JSON.stringify(login),
          headers: { "Content-Type": "application/json" },
        };
        $http(req).then(
          function success(response) {
            deffered.resolve(response);
          },
          function error(response) {
            deffered.reject(response);
          }
        );
        return deffered.promise;
      };
      this.setLoginSuccess = function (value) {
        this.loginSuccess = value;
      };
      this.setUser = function (user) {
        this.user = user;
      };
      this.setAuthToken = function (response) {
        let authtoken = response.headers()["authorization"];
        document.cookie = "AuthToken =" + authtoken;
      };
      // this.checkPermissions = function (user) {
      //   if(user ==="admin"){
      //     this.setUser(user);
      //   this.setEmployeeRights(user);
      //   this.setProjectRights(user);
      //   }
      //   else{
      //     let loggedUser = Employee.employees.find(
      //       (e) => e.EmployeeId === parseInt(user)
      //     );
      //     this.setUser(loggedUser);
      //     this.setEmployeeRights(loggedUser);
      //     //this.setProjectRights(loggedUser);
      //   }

      // };
      //   this.setEmployeeRights = function (loggedUser) {
      //     if (loggedUser === "admin") {
      //       this.employeeRights[loggedUser] = {
      //         view: true,
      //         edit: true,
      //         delete: true,
      //       };
      //     } else {
      //       Employee.employees.forEach((emp) => {
      //         if (emp.Project === loggedUser.Project) {
      //           this.employeeRights[emp.EmployeeId] = {
      //             view: true,
      //             edit: true,
      //             delete: true,
      //           };
      //         }
      //       });
      //     }
      //   };
      //   this.setProjectRights = function (loggedUser) {
      //     if (loggedUser === "admin") {
      //       this.projectRights[loggedUser] = {
      //         view: true,
      //         edit: true,
      //         delete: true,
      //       };
      //     } else {
      //       Project.projects.forEach((proj) => {
      //         this.projectRights[proj.ProjectName] = {
      //           view: true,
      //           edit: false,
      //           delete: false,
      //         };
      //       });
      //     }
      //   };
    },
  ]);
