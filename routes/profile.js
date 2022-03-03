const express = require('express');
const router = express.Router();
const profile_controller = require('../controllers/profile_controller');
// const userRules = require('../validation/user');

// Vi hämtar autentitierade profilen
router.get('/', profile_controller.getUserProfile);

// Uppdatera autentiterade profilen
// router.put('/', profile_controller.updateUserProfile);

// Hämtar den inloggades böcker och album
// router.get('/photos', profile_controller.getUserPhotos);

module.exports = router;