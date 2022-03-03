const debug = require('debug')('photapp:auth');
const { Users } = require('../models');

const basicUserAuth = async (req, res, next) => {
    // kolla ifall auth headern existerar
    if (!req.headers.authorization) {
        // skickar ett felmeddelande att det failade
        debug("Authorization header is missing");
        return res.status(401).send({
            status: "fail",
            data: "Authorization header is missing",
        })
    }

    // Vi splittar på authorization header genom split och göra den i en array destructuring
    const [authSchema, base64Payload] = req.headers.authorization.split(' ');

    if (authSchema.toLowerCase() !== 'basic') {
        // skickar ett felmeddelande att det failade
        debug("Something in the authschema was broke");

        return res.status(401).send({
            status: "fail",
            data: "Authschema is broken",
        })
    }

    // omvandlar base64Payload till ascii vilket är en läsbar text
    const base64ToAscii = Buffer.from(base64Payload, 'base64').toString('ascii');

    // vi splittar mellan email och password, detta eftersom att de nu sitter i email:password
    const [email, password] = base64ToAscii.split(':');

    // kollar ifall användaruppgifterna existerar
    const users = await new Users({ email, password }).fetch({ require: false })

    // ifall inget matchade med user i databasen
    if (!users) {
        return res.status(401).send({
            status: "fail",
            data: "Couldn't find the user.",
        })
    }
    // vi bifogar user till req
    req.user = users;

    // Vi skickar vidare requesten
    next();
}

module.exports = {
    basicUserAuth
}