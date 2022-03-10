const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');
const userRules = require('../validation/user');

router.post('/', userRules.creationUserRules, user_controller.createUser)

module.exports = router;