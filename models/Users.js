module.exports = (bookshelf) => {
    return bookshelf.model('Users', {
        tableName: 'Users',
    });
};