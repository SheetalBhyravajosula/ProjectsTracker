var express = require("express");
var taskService = require("../services/taskServices");

exports.getTasks = function (req, res) {
  //const db = req.app.locals.db;
  taskService.getTasks(function (tasks) {
    if (tasks == false) {
      console.log("error in controller", err);
      res.send("couldnt retrieve tasks");
    } else {
      res.send(tasks);
    }
  });
};
exports.createTask = function (req, res) {
  // var task={
  //     taskId:req.body.taskId,
  //     taskDescription:req.body.taskDescription,
  //     taskTypeId:req.body.taskTypeId,
  //     projectId:req.body.projectId,
  //     empId:req.body.projectId,
  //     taskStartDate:req.body.startDate,
  //     taskEndDate:req.body.endDate,
  //     duration:req.body.duration
  // }
  var task = req.body.task;
  taskService.createTask(task, function (result) {
    if (result == false) {
      console.log("error in controller", err);
      res.send("could not save task");
    } else if (result == "Exists") {
      console.log("Could not save task already exists", result);
      res.send("Could not save task already exists");
    } else {
      console.log("Saved successfully", result);
      res.send("Saved successfully",result);
    }
  });
};

exports.deleteTask = function (req, res) {
  var task = req.params.task;
  taskService.deleteTask(task, function (result) {
    if (result == false) {
      console.log("error in deleting", err);
      res.send("could not delete task");
    } else {
      console.log("Deleted task of ID/Description", task);
      res.send("Deleted Task");
    }
  });
};
