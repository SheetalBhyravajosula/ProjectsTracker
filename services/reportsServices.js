const TaskSchema = require("../schemas/tasksSchema");
const ProjectSchema = require("../schemas/projectSchema");
const EmployeeSchema = require("../schemas/employeeSchema");
const exists = "Exists";
const doesNotExist = "DoesNotExist";

exports.getTasksByEmpId = function (empId, startDate, endDate, callback) {
  EmployeeSchema.findOne({ EmployeeId: empId }, function (err, result) {
    if (err) {
      callback(false);
    } else {
      if (startDate && endDate) {
        TaskSchema.find(
          {
            Employee: result._id,
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
        TaskSchema.find({ Employee: result._id }, function (error, tasks) {
          if (error) {
            callback(false);
          } else {
            callback(tasks);
          }
        });
      }
    }
  });
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
    } else {
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
    } else {
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
    }
  });
};

exports.getProjectsByCategory = function (category,callback) {
    ProjectSchema.find({Category:category}, function (err, result) {
      if (err) {
        callback(false);
      } else {
        callback(result);
      }
    });
  };
