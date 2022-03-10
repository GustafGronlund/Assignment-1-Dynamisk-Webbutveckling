const bcrypt = require('bcrypt');
const debug = require('debug')('photoapp:photo_controller');
let { Users } = require('../models');
let { Photos } = require('../models');
const { matchedData, validationResult } = require('express-validator');

// Hämta alla photos som tillhör usern som är authorized

const getPhotos = async (req, res) => {
    try {
        // Hämtar user baserat på id
        Users.where({
            id: req.user.id
        })
            .fetchAll({
                withRelated: ['photos']
            })
            .then(function (data) {
                data = data.toJSON();
                res.status(200).send({
                    status: 'success',
                    data: data[0].photos
                })
            })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Could not find the photos in the database, sorry.',
        });
        throw error;
    }
}

// Ladda upp foto

const uploadPhoto = async (req, res) => {

    // kollar ifall det fanns några fel
    const errors = validationResult(req);

    // skickar felmeddelande isåfall
    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: 'fail',
            data: errors.array()
        })
    }

    // den validerade datan från request
    const validData = matchedData(req);

    // lägger in auktoriserad user.id till datan
    validData.user_id = req.user.id;
    //postar till databasen
    try {1
        Photos.forge({ title: validData.title, url: validData.url, comment: validData.comment, user_id: req.user.id })
            .save()
            .then(function (data) {
                res.status(200).send({
                    status: 'success',
                    data: {
                        data
                    }
                });
            })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: "Something went wrong when trying to register, please try again.",
        });
        throw error;
    }
}

const getSinglePhoto = async (req, res) => {
    try {
        const { id } = req.params
        const response = await Photos.forge({
            "id": id
        }).fetch()
            .then(function (data) {
                let compare = data.toJSON();
                if (compare.user_id != req.user.id) {
                    res.status(418).send({
                        status: 'error',
                        message: "This is not your book.",
                    });
                }
                res.status(200).send({
                    status: 'success',
                    data: {
                        "id:": compare.id,
                        "title": compare.title,
                        "url": compare.url,
                        "comment": compare.comment
                    }
                });
            })
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: "This is not your book.",
        });
        throw error;
    }
}

const updateSinglePhoto = async (req, res) => {

    // kollar ifall det fanns några fel
    const errors = validationResult(req);

    // skickar felmeddelande isåfall
    if (!errors.isEmpty()) {
        return res.status(400).send({
            status: 'fail',
            data: errors.array()
        })
    }

    // den validerade datan från request
    const validData = matchedData(req);

    // hämtar id från url
    const { id } = req.params

    // fetchar fotografi med id 
    const photo = await Photos.forge({"id": id}).fetch()

    // gör om datan vi har hämtat till json
    let compare = photo.toJSON();

    // kollar ifall user_id på fotografiet stämmer, annars skickar error
    if (compare.user_id != req.user.id) {
        res.status(406).send({
            status: 'error',
            message: "This is not your photo.",
        });
    }

    try {
        // Sparar till det fetchade fotografiet med den validerade datan
        const updateThePhoto = await photo.save(validData);

        res.status(201).send({
            status: 'success',
            data: {
                updateThePhoto
            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when trying to update the selected photo, please try again.',
        });
        throw error;
    }
}

module.exports = {
    getPhotos,
    uploadPhoto,
    getSinglePhoto,
    updateSinglePhoto
}