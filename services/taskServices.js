var express = require("express");
var TaskSchema = require("../schemas/tasksSchema");
exports.getTasks = function (callback) {
  TaskSchema.find({}, function (err, result) {
    if (err) {
      console.log("error in retrieving", err);
      callback(false);
    } else {
      callback(result);
    }
  });
};
exports.createTask = function (task, callback) {
  console.log(task);
  TaskSchema.findOne({TaskID:task.taskId}, function (err, result) {
    if (err) {
      console.log("error in retrieving tasks while creating", err);
      callback(false);
    }
    if (result) {
      console.log("this task already exists", result);
      callback("Exists");
    } else {
      var new_task = new TaskSchema({
        TaskID: task.taskId,
        TaskDescription: task.taskDescription,
        TaskTypeID: task.taskTypeId,
        ProjectID: task.projectId,
        EmpID: task.empId,
        TaskStartDate: task.taskStartDate,
        TaskEndDate: task.taskEndDate,
        Duration: task.duration,
      });
      new_task.save(function (err, saved) {
        if (err) {
          console.log("error in saving in services", err);
          callback(false);
        } else {
          console.log("saved successfully");
          callback(saved);
        }
      });
    }
  });
};

exports.deleteTask = function (task, callback) {
  TaskSchema.deleteOne(
    {
      $or: [{ TaskID: task }, { TaskDescription: task }],
    },
    function (err, result) {
      if (err) {
        console.log("error while deleting in services", err);
        callback(false);
      } else {
        console.log("Deleted task successfully having ID/Description", task);
        callback(result);
      }
    }
  );
};
