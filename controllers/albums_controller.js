const bcrypt = require('bcrypt');
const debug = require('debug')('photoapp:albums_controller');
let { Users } = require('../models');
let { Photos } = require('../models');
let { Albums } = require('../models');
const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

// Hämta alla album som tillhör usern som är auktoriserad

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
                res.status(200).send({
                    status: 'success',
                    data: data[0].albums
                })
            })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when trying to load your albums, sorry.',
        });
        throw error;
    }
}

// Skapa ett nytt album

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
        res.status(500).send({
            status: 'error',
            message: "Something went wrong when trying to add a new album, please try again.",
        });
        throw error;
    }
}

const updateSingleAlbum = async (req, res) => {

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

    // fetchar album med id 
    const album = await Albums.forge({"id": id}).fetch()

    // gör om datan vi har hämtat till json
    let compare = album.toJSON();

    // kollar ifall user_id på albumet stämmer, annars skickar error
    if (compare.user_id != req.user.id) {
        res.status(406).send({
            status: 'error',
            message: "This is not your album.",
        });
    }

    try {
        // Sparar till det fetchade albumet med den validerade datan
        const updateTheAlbum = await album.save(validData);

        res.status(201).send({
            status: 'success',
            data: {
                updateTheAlbum
            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when trying to update the selected album, please try again.',
        });
        throw error;
    }
}

const addPhotoToAlbum = async (req, res) => {

    // kollar ifall det fanns några fel
	const errors = validationResult(req);

    // skickar felmeddelande isåfall
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

    // den validerade datan från request
	const validData = matchedData(req);

    // hämtar albumet med det id som är skrivet i url, plockar med de relaterade fotografierna
	const album = await new models.Albums({ id: req.params.id }).fetch({withRelated:['photos']});

    // hämtar fotografierna som är relaterade till albumet
	// const photos = album.related('photos');

    // hämtar fotografiet som användare har skickat baserat på photo_id
    // const response_photo = await Photos.forge({"id": req.body.photo_id}).fetch({columns: ['id', 'user_id']})

    // console.log('ny konsol här ' + response_photo.url)

    // console.log('bok id är ' + response_photo.user_id + 'och inloggad är ' + req.user.id)

    // kollar ifall fotografiet hör ihop med användare, annars så gör vi en exit
    // if (response_photo.user_id != req.user.id) {
    //     res.status(400).send({
    //         status: 'error',
    //         message: "This is not your book.",
    //     });
    //     return res
    // }

    // const {id} = req.params

    // hämtar albumet som användare har skickat baserat på album_id
    // const response_album = await Albums.forge({"id": id}).fetch()

    // kollar ifall albumet hör ihop med användare, annars så gör vi en exit
    // if (response_album.user_id != req.user.id) {
    //     res.status(400).send({
    //         status: 'error',
    //         message: "This is not your album.",
    //      });
    // }

    // attachar fotografiet till det album som har fetchats
	try {
		const result = await album.photos().attach(req.body.photo_id);
		res.send({
			status: 'success',
			data: result,
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Something went wrong when trying to add the your photo to the selected album.',
		});
		throw error;
	}
}

const getSingleAlbum = async (req, res) => {
    try {
        Albums.where({
            id: req.params.id
        })
            .fetch({
                withRelated: [{
                    'photos': function(yourPhotos) {
                        yourPhotos.columns('title', 'url', 'comment', 'user_id')
                    }
                }]
            })
            .then(function (data) {
                // En variabel för att jämföra user_id med req.user.id, säkerligen överflödigt
                let compare = data.toJSON();
                
                // Ifall det inte är rätt användare så släng upp fel
                if (compare.user_id != req.user.id) {
                    return res.status(418).send({
                        status: 'error',
                        message: "This is not your album, load this.",
                    });
                }

                // Vi gör en send ifall allt är som det ska
                res.status(200).send({
                    status: 'success',
                    data: data
                })
            })

            return res
    } catch(error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when trying to fetch the album.',
        });
        throw error;
    }
}

module.exports = {
    getAlbums,
    uploadAlbum,
    getSingleAlbum,
    updateSingleAlbum,
    addPhotoToAlbum,
}