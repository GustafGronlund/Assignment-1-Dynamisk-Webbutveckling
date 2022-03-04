const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

/* GET / */
router.get('/', (req, res, next) => {
    res.send({ success: true, data: { msg: 'oh, hi' } });
});

router.use('/register', require('./users'));
router.use('/profile', auth.basicUserAuth, require('./profile'));
router.use('/photos', require('./photos'));

module.exports = router;