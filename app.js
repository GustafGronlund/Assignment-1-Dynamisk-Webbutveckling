const express = require('express');
const cors = require('cors');
const logger = require('morgan');

// instantiate express
const app = express();

// middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
/* EXTENDED KANSKE sKA VARA TRUE HÄR */
app.use(express.urlencoded({ extended: true }));

// routes
// app.use(require('./routes'));

// app.listen(1337, () => {
//     console.log('Servern är startad på localhost:1337');
// });

module.exports = app;