const { body } = require('express-validator');

/*
* Regler för att skapa en ny användare
*/

const creationUserRules = [
    body('email').exists().isEmail(),
    body('password').exists().isLength({ min: 3 }),
    body('first_name').exists().isLength({ min: 1 }),
    body('last_name').exists().isLength({ min: 1 })
]

const updateUserRules = [

]

module.exports = {
    creationUserRules
}