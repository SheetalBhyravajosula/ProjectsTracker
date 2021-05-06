const express = require("express");
const taskService = require("../services/taskServices");

exports.getTasks = function(req, res) {
    taskService.getTasks(function(result) {
        if (result == false) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: `Could not retrieve tasks error occured`
              });
        }else {
            res.status(200).json({
                status: 'success',
                data: result
              });
        }
    });
};
exports.getTaskTypes = function(req, res) {
    taskService.getTaskTypes(function(result) {
        if (result == false) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: `Could not retrieve tasks error occured`
              });
        }else {
            res.status(200).json({
                status: 'success',
                data: result
              });
        }
    });
};

exports.createTaskType = function (req, res) {
    const taskType = req.body.taskType;
    console.log(taskType);
    taskService.createTaskType(taskType, function (result) {
      if (result == false) {
        res.status(500).json({
          status: "Internal Server Error",
          message: `Could not create project ${taskType.Description} error occured`,
        });
      } else if (result == "Exists") {
        res.status(500).json({
          status: "failure",
          message: `Could not create project ${taskType.Description}:${result} already exists`,
        });
      } else {
        res.status(200).json({
          status: "success",
          data: result,
        });
      }
    });
  };

exports.createTask = function(req, res) {
    const task = req.body.task;
    taskService.createTask(task, function(result) {
        if (result == false) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: `Could not create task ${task.TaskDescription} error occured`
              });
        } else if (result=="Exists") {
            res.status(500).json({
                status: 'failure',
                message: `Could not create task ${task.TaskDescription}:${result} already exists`
              });
        } else {
            res.status(200).json({
                status: 'success',
                data: result
              });
        }
    });
};

exports.deleteTask = function(req, res) {
    const taskDescription = req.params.taskDescription;
    const startDate = req.query.TaskStartDate || null;
    const endDate = req.query.TaskEndDate || null;
    taskService.deleteTask(taskDescription,startDate,endDate, function(result) {
        if (result == false) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: `Could not delete task ${taskDescription} error occured`
              });
        } else if (result=="DoesNotExist") {
            res.status(404).json({
                status: 'failure',
                message: `Could not modify task ${taskDescription}:${result} not found`
              });
        } else {
            res.status(200).json({
                status: 'success',
                data: result
              });
        }
    });
};

exports.modifyTask = function(req, res) {
    const updateTask = req.body.updateTask;
    const startDate = req.query.StartDate || null;
    const endDate = req.query.EndDate || null;
    const taskDescription = req.params.taskDescription;
    console.log(updateTask);
    taskService.modifyTask(updateTask, taskDescription, startDate, endDate,
        function(result) {
            if (result == false) {
                res.status(500).json({
                    status: 'Internal Server Error',
                    message: `Could not modify task ${taskDescription} error occured`
                  });
            } else if (result=="DoesNotExist") {
                res.status(404).json({
                    status: 'failure',
                    message: `Could not modify task ${taskDescription}:${result} not found`
                  });
            } else {
                res.status(200).json({
                    status: 'success',
                    data: result
                  });
            }
        });
};