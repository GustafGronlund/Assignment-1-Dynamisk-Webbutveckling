const { body } = require('express-validator');

/*
* Regler för att skapa en ny användare
*/

const creationAlbumRules = [
    body('title').exists().isLength({ min: 3 }),
]

const updateAlbumRules = [
    body('title').optional().isLength({ min: 3 }),
]

// const addPhotoToAlbumRules = [
//         body('photo_id').exists().bail().custom(async value => {
//             const photo = await new models.Photo({ id: value }).fetch({ require: false });
//             if (!photo) {
//                 return Promise.reject(`The photo with ID ${value} doesn't exist in the database, sorry.`);
//             }
    
//             console.log('This your value ' + value)
    
//             return Promise.resolve();
//         }),
// ]

module.exports = {
    creationAlbumRules,
    updateAlbumRules,
}