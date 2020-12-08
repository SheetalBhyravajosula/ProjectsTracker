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
