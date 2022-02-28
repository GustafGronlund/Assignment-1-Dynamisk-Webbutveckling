// Setting up the database connection
const knex = require('knex')({
    debug: true,
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME || 'PhotoApp',
    }
});

const bookshelf = require('bookshelf')(knex);

const models = {};
models.Example = require('./Example')(bookshelf);

module.exports = {
    bookshelf,
    ...models,
};