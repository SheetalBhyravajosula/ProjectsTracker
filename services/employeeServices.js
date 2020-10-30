const employeeSchema = require("../schemas/employeeSchema");
const exists = "Exists";
const doesNotExist = "DoesNotExist";

exports.getEmployees = function (callback) {
  employeeSchema.find({}, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
};

exports.createEmployee = function (employee, callback) {
  employeeSchema.exists(
    {
      EmployeeId: employee.employeeId,
    },
    function (error, bool) {
      if (error) {
        console.log(error);
        callback(false);
      } else if (bool) {
        callback(exists);
      } else {
        const new_employee = new employeeSchema({
          EmployeeId: employee.employeeId,
          EmployeeName: employee.employeeName,
          BillRate: employee.billRate,
          Project: employee.project,
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
    }
  );
};

exports.deleteEmployee = function (employeeId, callback) {
  employeeSchema.findOneAndDelete({ EmployeeId: employeeId }, function (
    err,
    result
  ) {
    if (err) {
      callback(false);
    } else if (result == null) {
      callback(doesNotExist);
    } else {
      callback(result);
    }
  });
};

exports.modifyEmployee = function (updateEmployee, employeeId, callback) {
  const modify_employee = {
    EmployeeID: updateEmployee.employeeId,
    EmployeeName: updateEmployee.employeeName,
    BillRate: updateEmployee.billRate,
    Project: updateEmployee.project,
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
};
