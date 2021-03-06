const employeeService = require("../services/employeeServices");

exports.getEmployees = function (req, res) {
  employeeService.getEmployees(function (result) {
    if (result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not retrieve employees error occured`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};
exports.createEmployee = function (req, res) {
  const employee = req.body.employee;
  employeeService.createEmployee(employee, function (result) {
    if (result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not create employee ${employee.EmployeeId} error occured`,
      });
    } else if (result == "Exists") {
      res.status(500).json({
        status: "failure",
        message: `Could not create employee ${employee.EmployeeId}:${result}`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

exports.deleteEmployee = function (req, res) {
  const employeeId = req.params.employeeId;
  employeeService.deleteEmployee(employeeId, function (result) {
    if (result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not delete employee ${employeeId} error occured`,
      });
    } else if (result == "DoesNotExist") {
      res.status(404).json({
        status: "failure",
        message: `Could not modify employee ${employeeId}:${result} not found`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

exports.modifyEmployee = function (req, res) {
  const updateEmployee = req.body.updateEmployee;
  const employeeId = req.params.employeeId;
  employeeService.modifyEmployee(updateEmployee, employeeId, function (result) {
    if (result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not modify employee ${employeeId} error occured`,
      });
    } else if (result == "DoesNotExist") {
      res.status(404).json({
        status: "failure",
        message: `Could not modify employee ${employeeId}:${result} not found`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};
