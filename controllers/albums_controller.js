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
        return res.status(406).send({
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

    //laddar in foton samt album relaterade till user
	await req.user.load("photos");
	await req.user.load("albums");

	//laddar in bilder samt foton som tillhör user
	const users_photos = req.user.related("photos");
	const users_albums = req.user.related("albums");

    //kollar av ifall foto samt album tillhör användaren
	anvandare_photo = users_photos.find(
		(photo) => photo.id == req.body.photo_id
	);
	anvandare_album = users_albums.find(
		(album) => album.id == req.params.id
	);

    // hämtar albumet med det id som är skrivet i url, plockar med de relaterade fotografierna
	const album = await new models.Albums({ id: req.params.id }).fetch({withRelated:['photos']});

    //laddar in foto till variabeln
	const photos = album.related("photos");

	//kollar ifall fotografiet redan finns i albumet
	const existing_photo = photos.find(
		(photo) => photo.id == validData.photo_id
	);

	//om det finns så skickar den error
	if (existing_photo) {
		return res.status(400).send({
			status: "fail",
			data: "The photo exists in the album already.",
		});
	}

    //om fotot inte tillhör användare så skickar vi error
	if (!anvandare_photo) {
		return res.status(401).send({
			status: "fail",
			data: "The photo doesn't belong to you.",
		});
	}

	//om albumet inte tillhör användare så skickar vi error
	if (!anvandare_album) {
		return res.status(401).send({
			status: "fail",
			data: "The album doesn't belong to you.",
		});
	}

    // attachar fotografiet till det album som har fetchats
	try {
		const result = await album.photos().attach(validData.photo_id);
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
                        message: "This is not your album, try again with your own album.",
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