const { body } = require('express-validator');

/*
* Regler för att skapa en ny användare
*/

const creationUserRules = [
    body('email').exists().isEmail(),
    body('password').exists().isLength({ min: 6 }),
    body('first_name').exists().isString().isLength({ min: 3 }),
    body('last_name').exists().isString().isLength({ min: 3 })
]

module.exports = {
    creationUserRules
}