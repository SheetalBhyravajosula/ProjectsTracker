const express = require("express");
const router = express.Router();

const taskController = require("../controllers/tasksController.js");
const auth = require("../middleware/auth.js");

/* GET users listing. */
router.get("/getTasks", auth, taskController.getTasks);
router.post("/createTask", auth, taskController.createTask);
router.get("/deleteTask/:taskDescription", auth, taskController.deleteTask);
router.post("/modifyTask/:taskDescription", auth, taskController.modifyTask);
router.get("/getTaskTypes", auth, taskController.getTaskTypes);
router.post("/createTaskType", auth, taskController.createTaskType);

module.exports = router;
