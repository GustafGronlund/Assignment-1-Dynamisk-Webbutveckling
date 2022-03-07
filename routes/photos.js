const express = require('express');
const router = express.Router();
const photo_controller = require('../controllers/photo_controller');
const photoRules = require('../validation/photos');

router.get('/', photo_controller.getPhotos)
router.post('/', photoRules.creationPhotoRules, photo_controller.uploadPhoto)
router.get('/:id', photo_controller.getSinglePhoto)
// router.put('/', user_controller.updateUser)

module.exports = router;