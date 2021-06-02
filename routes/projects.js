const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectsController.js");
const auth = require("../middleware/auth.js");

/* GET projects listing. */
router.get("/getProjects", auth, projectController.getProjects);
router.get("/getProjectByID/:id", auth, projectController.getProjectById);
router.post("/createProject", auth, projectController.createProject);
router.get(
  "/deleteProject/:projectName",
  auth,
  projectController.deleteProject
);
router.post(
  "/modifyProject/:projectName",
  auth,
  projectController.modifyProject
);
router.get("/getProjectTypes", auth, projectController.getProjectTypes);
router.post("/createProjectType", auth, projectController.createProjectType);

module.exports = router;
