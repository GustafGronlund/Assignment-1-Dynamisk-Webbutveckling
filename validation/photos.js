const { body } = require('express-validator');

/*
* Regler för att ladda upp ett nytt foto
*/

const creationPhotoRules = [
    body('title').exists().isLength({ min: 3 }),
    body('url').exists().isURL(),
    body('comment').exists().isString().isLength({ min: 3 }),
]

/*
* Regler för att uppdatera fotografi
*/

const updatePhotoRules = [
    body('title').optional().isLength({ min: 3 }),
    body('url').optional().isURL(),
    body('comment').optional().isString().isLength({ min: 3 }),
]

module.exports = {
    creationPhotoRules,
    updatePhotoRules
}