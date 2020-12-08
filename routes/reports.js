const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportsController.js')

/* GET users listing. */
router.get('/getTasks/:empId', reportController.getTasksByEmpId);
//router.get('/getTasks/:projectId', reportController.getTasksByprojectId);
// router.get('/getTasks/:empId/:projectId', reportController.getTasksByEmpIdAndProjectId);
// router.get('/getProjects/:category', reportController.getProjectsByCategory);
// router.get('/getProjects/:projectType', reportController.getProjectsByProjectType);
// router.get('/getEmployees/:projectId', reportController.getEmployeesByProjectId);

module.exports = router;