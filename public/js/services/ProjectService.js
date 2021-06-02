angular
  .module("ProjectService", [])
  .service("Project", function ($http, $q, $cookies) {
    this.projects = null;
    this.project = null;
    this.disableName = false;
    this.Edit = true;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: $cookies.get("AuthToken"),
    };
    this.getProjects = function () {
      var deffered = $q.defer();
      var req = {
        method: "GET",
        url: "/projects/getProjects",
        headers: this.headers,
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
    this.getProjects().then(({ data }) => {
      this.setProjects(data.data);
    });
    this.getProjectById = function (id) {
      var deffered = $q.defer();
      var req = {
        method: "GET",
        url: "/projects/getProjectById/" + id,
        headers: this.headers,
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

    this.updateProject = function (project) {
      var deffered = $q.defer();
      let proj = { updateProject: project };
      var req = {
        method: "POST",
        url: "/projects/modifyProject/" + project.ProjectName,
        data: JSON.stringify(proj),
        headers: this.headers,
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

    this.createProject = function (project) {
      var deffered = $q.defer();
      let proj = { project: project };
      var req = {
        method: "POST",
        url: "/projects/createProject",
        data: JSON.stringify(proj),
        headers: this.headers,
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
    this.getProjectTypes = function () {
      var deffered = $q.defer();
      var req = {
        method: "GET",
        url: "/projects/getProjectTypes",
        headers: this.headers,
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
    this.setProjects = function (projects) {
      this.projects = projects;
    };
    this.setProject = function (project) {
      let tech = "";
      this.project = project;
      if (this.project && this.project.ProjectName) {
        this.disableName = true;
      }
      if (this.project && typeof this.project.Technology == "object") {
        this.project.Technology.forEach(function (i, idx, array) {
          if (idx === array.length - 1) {
            tech = tech + i;
          } else {
            tech = tech + i + ",";
          }
        });
        this.project.Technology = tech;
      }
    };
    this.deleteProject = function (project) {
      var deffered = $q.defer();
      var req = {
        method: "GET",
        url: "/projects/deleteProject/" + project.ProjectName,
        headers: this.headers,
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
    this.setFormType = function (value) {
      this.Edit = value;
    };
  });
