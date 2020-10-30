const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectsController.js')

/* GET projects listing. */
router.get('/getProjects', projectController.getProjects);
router.post('/createProject', projectController.createProject);
router.get('/deleteProject/:projectName', projectController.deleteProject);
router.post('/modifyProject/:projectName', projectController.modifyProject);

module.exports = router;