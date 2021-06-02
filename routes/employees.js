const express = require("express");
const router = express.Router();

const employeesController = require("../controllers/employeesController.js");
const auth = require("../middleware/auth.js");

/* GET Employees listing. */
router.get("/getEmployees", auth, employeesController.getEmployees);
router.post("/createEmployee", auth, employeesController.createEmployee);
router.get(
  "/deleteEmployee/:employeeId",
  auth,
  employeesController.deleteEmployee
);
router.post(
  "/modifyEmployee/:employeeId",
  auth,
  employeesController.modifyEmployee
);

module.exports = router;
