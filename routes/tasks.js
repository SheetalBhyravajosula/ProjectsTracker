const express = require('express');
const router = express.Router();

const taskController = require('../controllers/tasksController.js')

/* GET users listing. */
router.get('/getTasks', taskController.getTasks);
router.post('/createTask', taskController.createTask);
router.get('/deleteTask/:task', taskController.deleteTask);
router.post('/modifyTask/:task', taskController.modifyTask);

module.exports = router;