const bcrypt = require('bcrypt');
const debug = require('debug')('photoapp:albums_controller');
let { Users } = require('../models');
let { Photos } = require('../models');
let { Albums } = require('../models');
const { matchedData, validationResult } = require('express-validator');

// Hämta alla photos som tillhör usern som är authorized

const getAlbums = async (req, res) => {
    try {
        Users.where({
            id: req.user.id
        })
            .fetchAll({
                withRelated: ['albums']
            })
            .then(function (data) {
                data = data.toJSON();
                let newData = data.findIndex((item) => { return item.field === 'albums' })
                console.log('här är datan: ' + newData)
                res.status(200).send({
                    status: 'success',
                    data: data
                })
            })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Could not find the album in the database, sorry.',
        });
        throw error;
    }
}

// Ladda upp foto

const uploadAlbum = async (req, res) => {
    console.log(req)
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
    //postar till databasen
    try {
        Albums.forge({ title: validData.title, user_id: req.user.id })
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

const getSingleAlbum = async (req, res) => {
    try {
        const { id } = req.params
        const response = await Albums.forge({
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
                        "user_id": compare.user_id,
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

const updateSingleAlbum = async (req, res) => {

}

module.exports = {
    getAlbums,
    uploadAlbum,
    getSingleAlbum,
    updateSingleAlbum
}