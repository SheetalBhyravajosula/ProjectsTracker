angular
  .module("LoginService", [
    "ngMaterial",
    "EmployeeService",
    "ProjectService",
    "ReportService",
  ])
  .service("Login", [
    "Employee",
    "Project",
    "Report",
    "$http",
    "$q",
    function (Employee, Project, Report, $http, $q) {
      this.loginSuccess = false;
      this.employeeRights = new Array();
      this.projectRights = new Array();
      this.taskRights = new Array();
      this.currentEmployeeDetails = null;
      this.currentUser = null;
      this.rights = {
        view: true,
        edit: true,
        delete: true,
        add: true,
      };
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
      this.signUp = function (user) {
        var deffered = $q.defer();
        let creds = {
          userId: user.userId,
          password: user.password,
          role: user.role,
          securityQuestion: user.securityQuestion,
          securityAnswer: user.securityAnswer,
        };
        let login = { user: creds };
        var req = {
          method: "POST",
          url: "/users/createUser",
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
      this.getUserByID = function (userId) {
        var deffered = $q.defer();
        var req = {
          method: "GET",
          url: "/users/getUserSQByUserId/" + userId,
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
      this.setAuthToken = function (response) {
        let authtoken = response.headers()["authorization"];
        document.cookie = "AuthToken =" + authtoken;
      };
      this.modifyUser = function (user) {
        var deffered = $q.defer();
        let creds = {
          userId: user.userId,
          password: user.password,
          role: user.role,
        };
        let forgot = { updateUser: creds };
        var req = {
          method: "POST",
          url: "/users/modifyUser",
          data: JSON.stringify(forgot),
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
      this.setCurrentUser = function (employees, user) {
        this.currentUser = employees.find(
          (emp) => emp.EmployeeId === parseInt(user.userId)
        );
        if (this.currentUser) this.currentUser.role = user.role;
      };
      this.setUserPermissions = async function () {
        if (this.currentUser) {
          this.currentEmployeeDetails = await this.getFormattedEmployeeDetails(
            this.currentUser
          );
          this.setEmployeeRights(this.currentEmployeeDetails);
          this.setProjectRights(this.currentEmployeeDetails);
          this.setTaskRights(this.currentEmployeeDetails);
        }
      };
      this.getFormattedEmployeeDetails = async function (user) {
        await Report.getTasksByEmpId(user.EmployeeId)
          .then((response) => {
            user.Tasks = response.data.data;
            this.currentEmployeeDetails = user;
          })
          .catch(() => {
            user.Tasks = [];
          });
        return user;
      };

      this.setEmployeeRights = function (loggedUser) {
        let rights = {
          view: true,
          edit: true,
          delete: true,
        };
        if (loggedUser.role === "Admin") {
          Employee.employees.forEach((emp) => {
            this.employeeRights[emp.EmployeeId] = rights;
          });
        } else {
          this.employeeRights[loggedUser.EmployeeId] = rights;
        }
      };
      this.setProjectRights = function (loggedUser) {
        let rights = {
          view: true,
          edit: true,
          delete: true,
        };
        if (loggedUser.role === "Admin") {
          Project.projects.forEach((proj) => {
            this.projectRights[proj.ProjectName] = rights;
          });
        } else {
          Project.projects.forEach((proj) => {
            rights.delete = false;
            rights.edit = false;
            this.projectRights[proj.ProjectName] = rights;
          });
        }
      };
      this.setTaskRights = function (loggedUser) {
        Employee.employees.forEach((emp) => {
          let rights = {
            view: true,
            edit: true,
            delete: true,
          };
          if (
            emp.Project === loggedUser.Project ||
            loggedUser.role === "Admin"
          ) {
            this.taskRights[emp.EmployeeId] = rights;
          } else {
            rights.delete = false;
            rights.edit = false;
            this.taskRights[emp.EmployeeId] = rights;
          }
        });
      };
    },
  ]);
