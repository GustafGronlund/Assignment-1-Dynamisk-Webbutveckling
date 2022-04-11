module.exports = (bookshelf) => {
  return bookshelf.model("Photos", {
    tableName: "Photos",
    user() {
      return this.belongsTo("Users", "user_id");
    },
    albums() {
      return this.belongsToMany(
        "Albums",
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
