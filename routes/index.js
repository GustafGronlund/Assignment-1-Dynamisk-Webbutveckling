const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

/* GET / */
router.get('/', (req, res, next) => {
    res.send({ success: true, data: { msg: 'oh, hi' } });
});

router.use('/register', require('./users'));
router.use('/photos', auth.basicUserAuth, require('./photos'));
router.use('/albums', auth.basicUserAuth, require('./albums'))

module.exports = router;