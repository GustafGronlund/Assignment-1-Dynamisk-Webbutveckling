// const express = require('express');
// const router = express.Router();

// /* GET / */
// router.get('/', (req, res, next) => {
//     res.send({ success: true, data: { msg: 'oh, hi' } });
// });

// router.use('/users', require('./users'));

// module.exports = router;

const user_controller = require('../controllers/user_controller')

module.exports = function (app) {
    app.get('/users', user_controller.getUsers)
    app.post('/createUser', user_controller.createUser)
}