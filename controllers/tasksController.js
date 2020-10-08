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
      res.status(500).send("Could not save task");
    } else if (result == "Exists") {
      console.log("Could not save task already exists", result);
      res.status(500).send("Could not save task already exists");
    } else {
      console.log("Saved successfully", result);
      res.status(201).send("Created task successfully");
    }
  });
};

exports.deleteTask = function (req, res) {
  var task = req.params.task;
  taskService.deleteTask(task, function (result) {
    if (result == false) {
      console.log("error in deleting", err);
      res.status(500).send("Could not save task");
    } else if (result=="DoesNotExist") {
      console.log("Could not delete task of ID/Description", task, result);
      res.status(404).send("Record not found");
    } else {
      console.log("Deleted task of ID/Description", task);
      res.status(200).send("Deleted task successfully");
    }
  });
};

exports.modifyTask = function (req, res) {
  var updateTask = req.body.updateTask;
  var taskId = req.params.task;
  taskService.modifyTask(updateTask, taskId, function (result) {
    if (result == false) {
      console.log("error in modifying");
      res.status(500).send("Could not modify task");
    } else if (!result) {
      console.log("Could not modify task of ID/Description", taskId, result);
      res.status(404).send("Record not found");
    } else {
      console.log("Modified task of ID/Description", taskId, result);
      res.status(200).send("Modified task successfully");
    }
  });
};
