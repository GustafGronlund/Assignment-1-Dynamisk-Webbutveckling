const express = require('express');
const router = express.Router();
const albums_controller = require('../controllers/albums_controller');
const albumRules = require('../validation/albums');

router.get('/', albums_controller.getAlbums)
router.post('/', albumRules.creationAlbumRules, albums_controller.uploadAlbum)
router.get('/:id', albums_controller.getSingleAlbum)
// router.put('/', user_controller.updateUser)

module.exports = router;