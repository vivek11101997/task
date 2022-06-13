const express = require("express");
const router = express.Router();
const albumController = require('../controllers/album.controllers');


router.get("/getallphotos", albumController.getAllPhotos);
router.get("/getallalbum", albumController.getAllAlbums);

module.exports = router;
