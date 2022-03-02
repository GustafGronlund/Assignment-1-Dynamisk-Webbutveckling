require('dotenv').config();

/* Sätter upp anslutningen till databasen */

const knex = require('knex')({
    debug: true,
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 13306,
        database: process.env.DB_NAME || 'PhotoApp',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
    }
});

module.exports.knex = knex

