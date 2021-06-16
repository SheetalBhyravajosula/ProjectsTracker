const TaskSchema = require("../schemas/tasksSchema");
const TaskTypeSchema = require("../schemas/taskTypeSchema");
const EmployeeSchema = require("../schemas/employeeSchema");
const ProjectSchema = require("../schemas/projectSchema");
const employeeService = require("./employeeServices");
const projectService = require("./projectServices");
const async = require("async");
const exists = "Exists";
const doesNotExist = "DoesNotExist";

// exports.getTasks = function (callback) {
//   TaskSchema.find({})
//     .lean()
//     .exec(async function (err, tasks) {
//       if (err) {
//         callback(false);
//       } else {
//         await Promise.all(
//           tasks.map(async (task) => {
//             await TaskTypeSchema.findOne(
//               { _id: task.TaskType },
//               function (e, taskType) {
//                 if (e) {
//                   callback(false);
//                 }
//                 task.TaskType = taskType && taskType.Description;
//               }
//             );
//             await ProjectSchema.findOne(
//               { _id: task.Project },
//               function (er, proj) {
//                 if (er) {
//                   callback(false);
//                 }
//                 task.Project = proj && proj.ProjectName;
//               }
//             );
//             await EmployeeSchema.findOne(
//               { _id: task.Employee },
//               function (error, emp) {
//                 if (error) {
//                   callback(false);
//                 }
//                 task.Employee = emp && emp.EmployeeId;
//               }
//             );
//           })
//         );
//         callback(tasks);
//       }
//     });
// };

exports.getTasks = function (callback) {
  TaskSchema.aggregate(
    [
      {
        $lookup: {
          from: "TaskType",
          localField: "TaskType",
          foreignField: "_id",
          as: "TaskTypeData",
        },
      },
      { $unwind: "$TaskTypeData" },
      { $set: { TaskType: "$TaskTypeData.Description" } },
      { $unset: "TaskTypeData" },
      {
        $lookup: {
          from: "Project",
          localField: "Project",
          foreignField: "_id",
          as: "ProjectData",
        },
      },
      { $unwind: "$ProjectData" },
      { $set: { Project: "$ProjectData.ProjectName" } },
      { $unset: "ProjectData" },
      {
        $lookup: {
          from: "Associate",
          localField: "Employee",
          foreignField: "_id",
          as: "EmployeeData",
        },
      },
      { $unwind: "$EmployeeData" },
      { $set: { Employee: "$EmployeeData.EmployeeId" } },
      { $unset: "EmployeeData" },
    ],
    function (err, res) {
      if (err) {
        callback(false);
      } else {
        callback(res);
      }
    }
  );
};

exports.getTaskTypes = function (callback) {
  TaskTypeSchema.find({}, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
};

exports.createTaskType = function (taskType, callback) {
  TaskTypeSchema.exists(
    {
      _id: taskType._id,
    },
    function (error, bool) {
      if (error) {
        callback(false);
      } else if (bool) {
        callback(exists);
      } else {
        const new_taskType = new TaskTypeSchema({
          _id: taskType._id,
          Description: taskType.Description,
        });
        new_taskType.save(function (err, saved) {
          if (err || saved == {}) {
            callback(false);
          } else {
            callback(saved);
          }
        });
      }
    }
  );
};

exports.createTask = function (task, callback) {
  TaskSchema.exists(
    {
      TaskDescription: task.TaskDescription,
      TaskStartDate: task.TaskStartDate,
      TaskEndDate: task.TaskEndDate,
    },
    async function (error, bool) {
      if (error) {
        callback(false);
      } else if (bool) {
        callback(exists);
      } else {
        async.parallel(
          {
            TaskType: function (cb) {
              TaskTypeSchema.findOne({ Description: task.TaskType }).exec(cb);
            },
            Project: function (cb) {
              ProjectSchema.findOne({ ProjectName: task.Project }).exec(cb);
            },
            Employee: function (cb) {
              EmployeeSchema.findOne({ EmployeeId: task.Employee }).exec(cb);
            },
          },
          function (err, result) {
            if (err) callback(false);
            task.TaskType = result && result.TaskType && result.TaskType._id;
            task.Project = result && result.Project && result.Project._id;
            task.Employee = result && result.Employee && result.Employee._id;
            const new_task = new TaskSchema({
              TaskDescription: task.TaskDescription,
              TaskType: task.TaskType,
              Project: task.Project,
              Employee: task.Employee,
              TaskStartDate: task.TaskStartDate,
              TaskEndDate: task.TaskEndDate,
              Duration: task.Duration,
            });
            new_task.save(function (err1, saved) {
              if (err1) {
                callback(false);
              } else {
                callback(saved);
              }
            });
          }
        );
      }
    }
  );
};

exports.deleteTask = function (taskDescription, startDate, endDate, callback) {
  if (startDate && endDate) {
    TaskSchema.findOneAndDelete(
      {
        TaskDescription: taskDescription,
        TaskEndDate: endDate,
        TaskStartDate: startDate,
      },
      function (err, result) {
        if (err) {
          callback(false);
        } else if (result == null) {
          callback(doesNotExist);
        } else {
          callback(result);
        }
      }
    );
  } else {
    TaskSchema.findOneAndDelete(
      { TaskDescription: taskDescription },
      function (err, result) {
        if (err) {
          callback(false);
        } else if (result == null) {
          callback(doesNotExist);
        } else {
          callback(result);
        }
      }
    );
  }
};

exports.modifyTask = async function (
  updateTask,
  taskDescription,
  startDate,
  endDate,
  callback
) {
  async.parallel(
    {
      TaskType: function (cb) {
        TaskTypeSchema.findOne({ Description: updateTask.TaskType }).exec(cb);
      },
      Project: function (cb) {
        ProjectSchema.findOne({ ProjectName: updateTask.Project }).exec(cb);
      },
      Employee: function (cb) {
        EmployeeSchema.findOne({ EmployeeId: updateTask.Employee }).exec(cb);
      },
    },
    function (err, result) {
      if (err) {
        callback(false);
      }
      updateTask.TaskType = result && result.TaskType && result.TaskType._id;
      updateTask.Project = result && result.Project && result.Project._id;
      updateTask.Employee = result && result.Employee && result.Employee._id;
      const modify_task = {
        TaskDescription: updateTask.TaskDescription,
        TaskType: updateTask.TaskType,
        Project: updateTask.Project,
        Employee: updateTask.Employee,
        TaskStartDate: updateTask.TaskStartDate,
        TaskEndDate: updateTask.TaskEndDate,
        Duration: updateTask.Duration,
      };
      if (startDate && endDate) {
        TaskSchema.findOneAndUpdate(
          {
            TaskDescription: taskDescription,
            TaskEndDate: endDate,
            TaskStartDate: startDate,
          },
          modify_task,
          function (err1, result) {
            if (err1) {
              callback(false);
            } else if (result == null) {
              callback(doesNotExist);
            } else {
              callback(result);
            }
          }
        );
      } else {
        TaskSchema.findOneAndUpdate(
          { TaskDescription: taskDescription },
          modify_task,
          function (err1, result) {
            if (err1) {
              callback(false);
            } else if (result == null) {
              callback(doesNotExist);
            } else {
              callback(result);
            }
          }
        );
      }
    }
  );
};
