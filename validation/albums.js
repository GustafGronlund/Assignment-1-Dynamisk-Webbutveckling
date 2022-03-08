const { body } = require('express-validator');

/*
* Regler för att skapa en ny användare
*/

const creationAlbumRules = [
    body('title').exists().isLength({ min: 3 }),
]

module.exports = {
    creationAlbumRules
}