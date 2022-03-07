module.exports = (bookshelf) => {
    return bookshelf.model('Users', {
        tableName: 'Users',
        photos() {
            return this.hasMany('Photos', 'user_id');
        }
    })
};