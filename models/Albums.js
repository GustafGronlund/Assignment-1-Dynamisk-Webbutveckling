module.exports = (bookshelf) => {
    return bookshelf.model('Albums', {
        tableName: 'Albums',
        user() {
            return this.belongsTo('Users', 'user_id');
        }
    })
};
