const reportsService = require("../services/reportsServices");

exports.getTasksByEmpId = function (req, res) {
  const empId = parseInt(req.params.empId);
  reportsService.getTasksByEmpId(empId, function (result) {
    if (result.length !== 0 && result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not retrieve tasks error occured`,
      });
    } else if (result.length == 0) {
      res.status(404).json({
        status: "failure",
        message: `Could not retrieve task ${empId}:${result} not found`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

exports.getTasksByProjectName = function (req, res) {
  const projectName = req.params.projectName;
  const startDate = req.query.startDate || null;
  const endDate = req.query.endDate || null;
  reportsService.getTasksByProjectName(
    projectName,
    startDate,
    endDate,
    function (result) {
      if (result.length !== 0 && result == false) {
        res.status(500).json({
          status: "Internal Server Error",
          message: `Could not retrieve tasks error occured`,
        });
      } else if (result.length == 0) {
        res.status(404).json({
          status: "failure",
          message: `Could not retrieve task ${projectName}:${result} not found`,
        });
      } else {
        res.status(200).json({
          status: "success",
          data: result,
        });
      }
    }
  );
};

exports.getTasksByEmpIdAndProjectName = function (req, res) {
  const empId = req.params.empId;
  const projectName = req.params.projectName;
  const startDate = req.query.startDate || null;
  const endDate = req.query.endDate || null;
  reportsService.getTasksByEmpIdAndProjectName(
    empId,
    projectName,
    startDate,
    endDate,
    function (result) {
      if (result.length !== 0 && result == false) {
        res.status(500).json({
          status: "Internal Server Error",
          message: `Could not retrieve tasks error occured`,
        });
      } else if (result.length == 0) {
        res.status(404).json({
          status: "failure",
          message: `Could not retrieve task ${empId}:${result} not found`,
        });
      } else {
        res.status(200).json({
          status: "success",
          data: result,
        });
      }
    }
  );
};

exports.getProjectsByCategory = function (req, res) {
  const category = req.params.category;
  reportsService.getProjectsByCategory(category, function (result) {
    if (result.length !== 0 && result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not retrieve tasks error occured`,
      });
    } else if (result.length == 0) {
      res.status(404).json({
        status: "failure",
        message: `Could not retrieve project ${category}:${result} not found`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

exports.getProjectsByProjectType = function (req, res) {
  const projectType = req.params.projectType;
  reportsService.getProjectsByProjectType(projectType, function (result) {
    if (result.length !== 0 && result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not retrieve tasks error occured`,
      });
    } else if (result.length == 0) {
      res.status(404).json({
        status: "failure",
        message: `Could not retrieve project ${projectType}:${result} not found`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

exports.getEmployeesByProjectName = function (req, res) {
  const projectName = req.params.projectName;
  reportsService.getEmployeesByProjectName(projectName, function (result) {
    if (result.length !== 0 && result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not retrieve tasks error occured`,
      });
    } else if (result.length == 0) {
      res.status(404).json({
        status: "failure",
        message: `Could not retrieve task ${projectName}:${result} not found`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};
