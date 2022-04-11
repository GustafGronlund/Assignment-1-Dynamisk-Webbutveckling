module.exports = (bookshelf) => {
  return bookshelf.model("Albums", {
    tableName: "Albums",
    user() {
      return this.belongsTo("Users", "user_id");
    },
    photos() {
      return this.belongsToMany(
        "Photos",
        "Albums_Photos",
        "photo_id",
        "album_id"
      );
    },
    async fetchById(id, fetchOptions = {}) {
      return await new this({ id }).fetch(fetchOptions);
    },
  });
};
