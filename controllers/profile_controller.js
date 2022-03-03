const debug = require('debug')('photoapp:profile_controller');
let models = require('../models');
const { matchedData, validationResult } = require('express-validator');

// Hämta inloggad user

const getUserProfile = async (req, res) => {
    res.send({
        status: 'success',
        data: {
            user: req.user,
        }
    })
}

module.exports = {
    getUserProfile
}