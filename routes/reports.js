const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportsController.js')

/* GET users listing. */
router.get('/getTasksbyEmpID/:empId', reportController.getTasksByEmpId);
router.get('/getTasksbyProjectName/:projectName', reportController.getTasksByProjectName);
router.get('/getTasksbyEmpIdProjectName/:empId/:projectName', reportController.getTasksByEmpIdAndProjectName);
router.get('/getProjectsbyCategory/:category', reportController.getProjectsByCategory);
router.get('/getProjectsbyType/:projectType', reportController.getProjectsByProjectType);
router.get('/getEmployeesbyProjectName/:projectName', reportController.getEmployeesByProjectName);

module.exports = router;