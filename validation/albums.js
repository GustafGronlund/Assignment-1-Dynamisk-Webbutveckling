const { body } = require("express-validator");

/*
 * Regler för att skapa en ny användare
 */

const creationAlbumRules = [body("title").exists().isLength({ min: 3 })];

const updateAlbumRules = [body("title").optional().isLength({ min: 3 })];

const addPhotoToAlbumRules = [body("photo_id").exists()];

module.exports = {
  creationAlbumRules,
  updateAlbumRules,
  addPhotoToAlbumRules,
};
