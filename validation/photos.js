const { body } = require('express-validator');

/*
* Regler för att skapa en ny användare
*/

const creationPhotoRules = [
    body('title').exists().isLength({ min: 3 }),
    body('url').exists().isURL(),
    body('comment').exists().isString().isLength({ min: 3 }),
]

module.exports = {
    creationPhotoRules
}