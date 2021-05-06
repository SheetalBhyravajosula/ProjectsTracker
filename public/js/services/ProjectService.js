angular.module("ProjectService", []).service("Project", function ($http, $q) {
  this.projects = null;
  this.project = null;
  this.disableName = false;
  this.saveDisable = true;
  this.Edit = true;
  this.getProjects = function () {
    var deffered = $q.defer();
    $http.get("/projects/getProjects").then(
      function success(response) {
        deffered.resolve(response);
      },
      function error(response) {
        deffered.reject(response);
      }
    );
    return deffered.promise;
  };
  this.getProjectById = function (id) {
    var deffered = $q.defer();
    $http.get("/projects/getProjectById/" + id).then(
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

  this.createProject = function (project) {
    var deffered = $q.defer();
    let proj = { project: project };
    var req = {
      method: "POST",
      url: "/projects/createProject",
      data: JSON.stringify(proj),
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
  this.getProjectTypes = function () {
    var deffered = $q.defer();
    $http.get("/projects/getProjectTypes").then(
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
    if (this.project && this.project.ProjectName){
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
  }
  this.setFormType=function(value){
    this.Edit=value;
  }

});
