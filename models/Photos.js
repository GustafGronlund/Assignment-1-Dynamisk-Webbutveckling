module.exports = (bookshelf) => {
    return bookshelf.model('Photos', {
        tableName: 'Photos',
        users() {
            return this.belongsTo('Users')
        }
    });
};