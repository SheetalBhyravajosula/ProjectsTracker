angular
  .module("TaskService", ["ngMaterial"])
  .service("Task", function ($http, $q) {
    this.task = null;
    this.setTask = function(task){
      this.task = task;
    }
    this.getTaskTypes = function () {
      var deffered = $q.defer();
      $http.get("/tasks/getTaskTypes").then(
        function success(response) {
          deffered.resolve(response);
        },
        function error(response) {
          deffered.reject(response);
        }
      );
      return deffered.promise;
    };

    this.getTasks = function () {
      var deffered = $q.defer();
      $http.get("/tasks/getTasks").then(
        function success(response) {
          deffered.resolve(response);
        },
        function error(response) {
          deffered.reject(response);
        }
      );
      return deffered.promise;
    };

    this.createTask = function (task) {
      var deffered = $q.defer();
      let createTask = { task: task };
      var req = {
        method: "POST",
        url: "/tasks/createTask",
        data: JSON.stringify(createTask),
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
    this.deleteTask = function (task) {
      var deffered = $q.defer();
      var req = {
        method: "GET",
        url: "/tasks/deleteTask/" + task.TaskDescription,
        params: {TaskStartDate : task.TaskStartDate , TaskEndDate : task.TaskEndDate},
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

    this.modifyTask = function (task) {
      var deffered = $q.defer();
      let modifyTask = { updateTask: task };
      var req = {
        method: "POST",
        url: "/tasks/modifyTask/" + task.TaskDescription,
        data: JSON.stringify(modifyTask),
        params: {TaskStartDate : task.TaskStartDate , TaskEndDate : task.TaskEndDate},
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

  });