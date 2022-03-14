// Setting up the database connection
const knex = require('knex')({
    debug: true,
    client: 'mysql',
    connection: process.env.CLEARDB_DATABASE_URL || {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 13306,
        database: process.env.DB_NAME || 'PhotoApp',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
    }
});

const bookshelf = require('bookshelf')(knex);

const models = {};
models.Users = require('./Users')(bookshelf);
models.Photos = require('./Photos')(bookshelf);
models.Albums = require('./Albums')(bookshelf);

module.exports = {
    bookshelf,
    ...models,
};