const bcrypt = require('bcrypt');
const debug = require('debug')('photoapp:user_controller');
let models = require('../models');
const { matchedData, validationResult } = require('express-validator')

// Skapa en user

const createUser = async (req, res) => {

    // kollar ifall det fanns några fel
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: 'fail',
            data: errors.array()
        })
    }

    // den validerade datan från request
    const validData = matchedData(req);

    // hash och lite salt på lösenordet
    try {
        // Lösenordet saltas tio gånger
        // Skriver över lösenordet från req och validData med det 
        // hashade lösenordet
        validData.password = await bcrypt.hash(validData.password, 10)
    } catch (error) {
        res.status(418).send({
            status: 'error',
            message: 'Could not hash the password.',
        });
        throw error;
    }

    try {
        const newUser = await new models.Users(validData).save();
        res.status(200).send({
            status: 'success',
            data: {
                "email": validData.email,
                "first_name": validData.first_name,
                "last_name": validData.last_name
            }
        });
    } catch (error) {
        res.status(418).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new example.',
        });
        throw error;
    }
}

module.exports = {
    createUser
}