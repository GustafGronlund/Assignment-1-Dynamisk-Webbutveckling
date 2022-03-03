const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');
const userRules = require('../validation/user');

router.get('/', user_controller.getUsers)
router.post('/', userRules.creationUserRules, user_controller.createUser)
router.get('/:userId', user_controller.getSingleUser)
router.put('/', user_controller.updateUser)
router.delete('/:userId', user_controller.deleteUser)

module.exports = router;