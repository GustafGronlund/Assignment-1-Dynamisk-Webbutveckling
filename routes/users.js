const express = require('express');
const router = express.Router();
const bookshelf = require('./index');
const user_controller = require('../controllers/user_controller');
// const exampleValidationRules = require('../validation/example');

/* Get all resources */
// router.get('/', userController.index);

/* Get a specific resource */
// router.get('/:exampleId', userController.show);

/* Skapa en ny användare i databasen */
router.post('/', user_controller.create);

/* Update a specific resource */
// router.put('/:exampleId', userValidationRules.updateRules, userController.update);

/* Destroy a specific resource */
// router.delete('/:exampleId', userController.destroy);

module.exports = router;