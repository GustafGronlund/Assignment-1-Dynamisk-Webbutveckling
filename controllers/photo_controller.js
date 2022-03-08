const bcrypt = require('bcrypt');
const debug = require('debug')('photoapp:photo_controller');
let { Users } = require('../models');
let { Photos } = require('../models');
const { matchedData, validationResult } = require('express-validator');

// Hämta alla photos som tillhör usern som är authorized

const getPhotos = async (req, res) => {
    try {
        Users.where({
            id: req.user.id
        })
            .fetchAll({
                withRelated: ['photos']
            })
            .then(function (data) {
                data = data.toJSON();
                console.log('här är konsolen' + data.data)
                // let newData = data.findIndex((item) => { return item.field === 'photos' })
                res.status(200).send({
                    status: 'success',
                    data: data
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
    validData.user_id = req.user.id;
    //postar till databasen
    try {
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
        res.status(418).send({
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
                // console.log('Här är bokens nr: ' + compare.user_id + ' och inloggad användare ' + req.user.id)
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
        res.status(418).send({
            status: 'error',
            message: "This is not your book.",
        });
        throw error;
    }
}

const updateSinglePhoto = async (req, res) => {

}

module.exports = {
    getPhotos,
    uploadPhoto,
    getSinglePhoto,
    updateSinglePhoto
}