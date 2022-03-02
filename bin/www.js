require('dotenv').config();
var express = require('express');
const app = require('../app');

const routes = require('../routes/index')(app);

app.set('port', process.env.PORT || 1337)

let server = app.listen(app.get('port'),
	(err) => {
		if (err) throw err;
		let message = 'Server is running at http://localhost:' + server.address().port
		console.log(message)
	}
)