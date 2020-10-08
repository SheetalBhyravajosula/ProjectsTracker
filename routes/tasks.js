var express = require('express');
var router = express.Router();

var taskController= require('../controllers/tasksController.js')

/* GET users listing. */
router.get('/getTasks',taskController.getTasks);
router.post('/createTask',taskController.createTask);
router.get('/deleteTask/:task',taskController.deleteTask);
router.post('/modifyTask/:task',taskController.modifyTask);

module.exports = router;
