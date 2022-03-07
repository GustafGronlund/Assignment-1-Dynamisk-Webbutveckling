module.exports = (bookshelf) => {
    return bookshelf.model('Photos', {
        tableName: 'Photos',
        user() {
            return this.belongsTo('Users', 'user_id');
        }
    })
};