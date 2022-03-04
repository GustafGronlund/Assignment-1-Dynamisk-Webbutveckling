const express = require('express');
const router = express.Router();
const photo_controller = require('../controllers/photo_controller');
// const userRules = require('../validation/user');

router.get('/', photo_controller.getPhotos)
// router.post('/', userRules.creationUserRules, user_controller.createUser)
// router.put('/', user_controller.updateUser)

module.exports = router;