const debug = require('debug')('photoapp:photo_controller');
let models = require('../models');
const { matchedData, validationResult } = require('express-validator')

// Hämta alla photos

const getPhotos = async (req, res) => {
    try {
        const get_photos = await models.Photos.fetchAll();
        /* Hämta med relationer så hade det varit */
        /*
        .fetch({withRelatied: ['Photos']})
        */
        res.send({
            status: 'success',
            data: {
                users: get_photos
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Could not find the photos in the database, sorry.',
        });
        throw error;
    }
}

module.exports = {
    getPhotos
}