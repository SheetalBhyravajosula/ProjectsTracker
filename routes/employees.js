const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employeesController.js')

/* GET Employees listing. */
router.get('/getEmployees', employeesController.getEmployees);
router.post('/createEmployee', employeesController.createEmployee);
router.get('/deleteEmployee/:employeeId', employeesController.deleteEmployee);
router.post('/modifyEmployee/:employeeId', employeesController.modifyEmployee);

module.exports = router;