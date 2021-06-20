const employeeSchema = require("../schemas/employeeSchema");
const projectSchema = require("../schemas/projectSchema");
const exists = "Exists";
const doesNotExist = "DoesNotExist";

exports.getEmployees = function (callback) {
  employeeSchema.aggregate(
    [
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

exports.createEmployee = function (employee, callback) {
  employeeSchema.exists(
    {
      EmployeeId: employee.EmployeeId,
    },
    function (error, bool) {
      if (error) {
        console.log(error);
        callback(false);
      } else if (bool) {
        callback(exists);
      } else {
        projectSchema.findOne(
          { ProjectName: employee.Project },
          function (err, proj) {
            if (err) {
              callback(false);
            }
            employee.Project = proj && proj._id;
            const new_employee = new employeeSchema({
              EmployeeId: employee.EmployeeId,
              EmployeeName: employee.EmployeeName,
              BillRate: employee.BillRate,
              Project: employee.Project,
            });
            new_employee.save(function (err, saved) {
              if (err) {
                console.log(err);
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

exports.deleteEmployee = function (employeeId, callback) {
  employeeSchema.findOneAndDelete(
    { EmployeeId: employeeId },
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
};

exports.modifyEmployee = function (updateEmployee, employeeId, callback) {
  projectSchema.findOne(
    { ProjectName: updateEmployee.Project },
    function (err, proj) {
      if (err) {
        callback(false);
      }
      updateEmployee.Project = proj && proj._id;
      const modify_employee = {
        EmployeeId: updateEmployee.EmployeeId,
        EmployeeName: updateEmployee.EmployeeName,
        BillRate: updateEmployee.BillRate,
        Project: updateEmployee.Project,
      };
      employeeSchema.findOneAndUpdate(
        { EmployeeId: employeeId },
        modify_employee,
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
  );
};
