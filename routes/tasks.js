const express = require('express');
const router = express.Router();

const taskController = require('../controllers/tasksController.js')

/* GET users listing. */
router.get('/getTasks', taskController.getTasks);
router.post('/createTask', taskController.createTask);
router.get('/deleteTask/:taskDescription', taskController.deleteTask);
router.post('/modifyTask/:taskDescription', taskController.modifyTask);
router.get('/getTaskTypes',taskController.getTaskTypes);
router.post('/createTaskType', taskController.createTaskType);

module.exports = router;