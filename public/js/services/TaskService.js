angular
  .module("TaskService", ["ngMaterial"])
  .service("Task", function ($http, $q , $cookies) {
    this.task = null;
    this.disable = false;
    this.Edit = true;
    this.headers = {
       "Content-Type": "application/json",
       "Authorization" : $cookies.get('AuthToken')
      }
    this.setFormType=function(value){
      this.Edit=value;
    }
    this.setTask = function(task){
      this.task = task;
      if (this.task && this.task.TaskDescription){
        this.disable = true;
      }
    }
    this.getTaskTypes = function () {
      var deffered = $q.defer();
      var req = {
        method: "GET",
        url: "/tasks/getTaskTypes",
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

    this.getTasks = function () {
      var deffered = $q.defer();
      var req = {
        method: "GET",
        url: "/tasks/getTasks",
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

    this.createTask = function (task) {
      var deffered = $q.defer();
      let createTask = { task: task };
      var req = {
        method: "POST",
        url: "/tasks/createTask",
        data: JSON.stringify(createTask),
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
    this.deleteTask = function (task) {
      var deffered = $q.defer();
      var req = {
        method: "GET",
        url: "/tasks/deleteTask/" + task.TaskDescription,
        params: {TaskStartDate : task.TaskStartDate , TaskEndDate : task.TaskEndDate},
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
    }

    this.modifyTask = function (task) {
      var deffered = $q.defer();
      let modifyTask = { updateTask: task };
      var req = {
        method: "POST",
        url: "/tasks/modifyTask/" + task.TaskDescription,
        data: JSON.stringify(modifyTask),
        params: {TaskStartDate : task.TaskStartDate , TaskEndDate : task.TaskEndDate},
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

  });