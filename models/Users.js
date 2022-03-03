// const bookshelf = require('./index');

// module.exports = (bookshelf) => {
//     return bookshelf.model('Users', {
//         tableName: 'Users',
//     });
// };

/* Vi kallar på vår connection */
// const knex = require('./index').knex;
// const bookshelf = require('bookshelf')(knex);

// const Users = bookshelf.Model.extend({
//     tableName: 'Users'
// })

// module.exports = Users;

module.exports = (bookshelf) => {
    return bookshelf.model('Users', {
        tableName: 'Users',
    });
};