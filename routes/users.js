const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js')

/* GET Users listing. */
router.post('/login', usersController.getUserByCredentials);
router.post('/createUser', usersController.createUser);
router.get('/getUserSQByUserId/:id',usersController.getUserSQByUserId);
// router.get('/deleteUser/:userId', usersController.deleteUser);
router.post('/modifyUser', usersController.modifyUserPassword);

module.exports = router;