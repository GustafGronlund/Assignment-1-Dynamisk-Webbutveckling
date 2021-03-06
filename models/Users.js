module.exports = (bookshelf) => {
  return bookshelf.model("Users", {
    tableName: "Users",
    photos() {
      return this.hasMany("Photos", "user_id");
    },
    albums() {
      return this.hasMany("Albums", "user_id");
    },
    async fetchById(id, fetchOptions = {}) {
      return await new this({ id }).fetch(fetchOptions);
    },
  });
};
