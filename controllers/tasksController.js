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
exports.createTask = function(req, res) {
    const task = req.body.task;
    taskService.createTask(task, function(result) {
        if (result == false) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: `Could not create task ${task.taskDescription} error occured`
              });
        } else if (result=="Exists") {
            res.status(500).json({
                status: 'failure',
                message: `Could not create task ${task.taskDescription}:${result} already exists`
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
    const task = req.params.task;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    taskService.deleteTask(task,startDate,endDate, function(result) {
        if (result == false) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: `Could not delete task ${task.taskDescription} error occured`
              });
        } else if (result=="DoesNotExist") {
            res.status(404).json({
                status: 'failure',
                message: `Could not modify task ${ttask.taskDescriptionask}:${result} not found`
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
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    const task = req.params.task;
    console.log(updateTask);
    taskService.modifyTask(updateTask, task, startDate, endDate,
        function(result) {
            if (result == false) {
                res.status(500).json({
                    status: 'Internal Server Error',
                    message: `Could not modify task ${task.taskDescription} error occured`
                  });
            } else if (result=="DoesNotExist") {
                res.status(404).json({
                    status: 'failure',
                    message: `Could not modify task ${task.taskDescription}:${result} not found`
                  });
            } else {
                res.status(200).json({
                    status: 'success',
                    data: result
                  });
            }
        });
};