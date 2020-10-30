const projectService = require("../services/projectServices");

exports.getProjects = function (req, res) {
  projectService.getProjects(function (result) {
    if (result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not retrieve projects error occured`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};
exports.createProject = function (req, res) {
  const project = req.body.project;
  console.log(project);
  projectService.createProject(project, function (result) {
    if (result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not create project ${project.projectName} error occured`,
      });
    } else if (result == "Exists") {
      res.status(500).json({
        status: "failure",
        message: `Could not create project ${project.projectName}:${result} already exists`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

exports.deleteProject = function (req, res) {
  const projectName = req.params.projectName;
  projectService.deleteProject(projectName, function (result) {
    if (result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not delete project ${projectName} error occured`,
      });
    } else if (result == "DoesNotExist") {
      res.status(404).json({
        status: "failure",
        message: `Could not modify project ${projectName}:${result} not found`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

exports.modifyProject = function (req, res) {
  const updateproject = req.body.updateProject;
  const projectName = req.params.projectName;
  console.log(updateproject);
  projectService.modifyProject(updateproject, projectName, function (result) {
    if (result == false) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Could not modify project ${projectName} error occured`,
      });
    } else if (result == "DoesNotExist") {
      res.status(404).json({
        status: "failure",
        message: `Could not modify project ${projectName}:${result} not found`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};
