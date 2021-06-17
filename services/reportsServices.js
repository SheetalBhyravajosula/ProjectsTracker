const TaskSchema = require("../schemas/tasksSchema");
const ProjectSchema = require("../schemas/projectSchema");
const EmployeeSchema = require("../schemas/employeeSchema");
const exists = "Exists";
const doesNotExist = "DoesNotExist";

exports.getTasksByEmpId = function (empId, callback) {
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
      { $match : { "Employee" : empId } }
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

exports.getTasksByProjectName = function (
  projectName,
  startDate,
  endDate,
  callback
) {
  ProjectSchema.findOne({ ProjectName: projectName }, function (err, result) {
    if (err) {
      callback(false);
    } else if (result) {
      if (startDate && endDate) {
        TaskSchema.find(
          {
            Project: result._id,
            TaskEndDate: endDate,
            TaskStartDate: startDate,
          },
          function (error, tasks) {
            if (error) {
              callback(false);
            } else {
              callback(tasks);
            }
          }
        );
      } else if (startDate) {
        TaskSchema.find(
          {
            Project: result._id,
            TaskStartDate: startDate,
          },
          function (error, tasks) {
            if (error) {
              callback(false);
            } else {
              callback(tasks);
            }
          }
        );
      } else if (endDate) {
        TaskSchema.find(
          {
            Project: result._id,
            TaskEndDate: endDate,
          },
          function (error, tasks) {
            if (error) {
              callback(false);
            } else {
              callback(tasks);
            }
          }
        );
      } else {
        TaskSchema.find({ Project: result._id }, function (error, tasks) {
          if (error) {
            callback(false);
          } else {
            callback(tasks);
          }
        });
      }
    } else {
      callback([]);
    }
  });
};

exports.getTasksByEmpIdAndProjectName = function (
  empId,
  projectName,
  startDate,
  endDate,
  callback
) {
  EmployeeSchema.findOne({ EmployeeId: empId }, function (err, result) {
    if (err) {
      callback(false);
    } else if (result) {
      if (startDate && endDate) {
        TaskSchema.find(
          {
            Employee: result._id,
            Project: result.Project,
            TaskEndDate: endDate,
            TaskStartDate: startDate,
          },
          function (error, tasks) {
            if (error) {
              callback(false);
            } else {
              callback(tasks);
            }
          }
        );
      } else if (startDate) {
        TaskSchema.find(
          {
            Employee: result._id,
            Project: result.Project,
            TaskStartDate: startDate,
          },
          function (error, tasks) {
            if (error) {
              callback(false);
            } else {
              callback(tasks);
            }
          }
        );
      } else if (endDate) {
        TaskSchema.find(
          {
            Employee: result._id,
            Project: result.Project,
            TaskEndDate: endDate,
          },
          function (error, tasks) {
            if (error) {
              callback(false);
            } else {
              callback(tasks);
            }
          }
        );
      } else {
        TaskSchema.find(
          { Employee: result._id, Project: result.Project },
          function (error, tasks) {
            if (error) {
              callback(false);
            } else {
              callback(tasks);
            }
          }
        );
      }
    } else {
      callback([]);
    }
  });
};

exports.getProjectsByCategory = function (category, callback) {
  ProjectSchema.find({ Category: category }, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
};

exports.getProjectsByProjectType = function (projectType, callback) {
  ProjectSchema.find({ ProjectType: projectType }, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
};

exports.getEmployeesByProjectName = function (projectName, callback) {
  ProjectSchema.findOne({ ProjectName: projectName }, function (err, result) {
    if (err) {
      callback(false);
    } else if (result) {
      EmployeeSchema.find({ Project: result._id }, function (error, employees) {
        if (error) {
          callback(false);
        } else {
          callback(employees);
        }
      });
    } else {
      callback([]);
    }
  });
};
