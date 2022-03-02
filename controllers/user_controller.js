let Users = require('../models/Users');

exports.getUsers = async (req, res) => {
    try {
        // Vi gör en fetch request
        // Vi kallar på vår model
        const response = await Users
            .forge()
            .fetchAll()
            .then(function (data) {
                const res = {
                    success: true,
                    data: data
                }
                return res;
            })
            .catch(error => {
                const res = {
                    success: false,
                    error: error
                }
                return res
            })
        res.json(response)
    } catch (e) {
        console.log(`Failed to fetch the user user data: ${e}`)
    }
}

exports.createUser = async (req, res) => {
    try {
        // Vi gör en const med values från req.body
        const { email, password, first_name, last_name } = req.body
        const response = await Users.forge({
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name
        }).save()
            .then(function (data) {
                const res = {
                    success: true,
                    data: data,
                    message: "user created :)"
                }
                return res;
            })
            .catch(error => {
                const res = {
                    success: false,
                    error: error
                }
                return res
            })
        res.json(response)
    } catch (e) {
        console.log(`Failed to fetch the user user data: ${e}`)
    }
}