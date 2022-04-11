const express = require("express");
const router = express.Router();
const albums_controller = require("../controllers/albums_controller");
const albumRules = require("../validation/albums");

router.get("/", albums_controller.getAlbums);
router.post("/", albumRules.creationAlbumRules, albums_controller.uploadAlbum);
router.get("/:id", albums_controller.getSingleAlbum);
router.put(
  "/:id",
  albumRules.updateAlbumRules,
  albums_controller.updateSingleAlbum
);
router.post(
  "/:id/photos",
  albumRules.addPhotoToAlbumRules,
  albums_controller.addPhotoToAlbum
);

module.exports = router;
