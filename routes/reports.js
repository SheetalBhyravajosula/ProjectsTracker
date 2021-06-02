const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportsController.js");
const auth = require("../middleware/auth.js");

/* GET users listing. */
router.get("/getTasksbyEmpID/:empId", auth, reportController.getTasksByEmpId);
router.get(
  "/getTasksbyProjectName/:projectName",
  auth,
  reportController.getTasksByProjectName
);
router.get(
  "/getTasksbyEmpIdProjectName/:empId/:projectName",
  auth,
  reportController.getTasksByEmpIdAndProjectName
);
router.get(
  "/getProjectsbyCategory/:category",
  auth,
  reportController.getProjectsByCategory
);
router.get(
  "/getProjectsbyType/:projectType",
  auth,
  reportController.getProjectsByProjectType
);
router.get(
  "/getEmployeesbyProjectName/:projectName",
  auth,
  reportController.getEmployeesByProjectName
);

module.exports = router;
