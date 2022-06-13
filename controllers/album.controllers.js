const axios = require('axios');
require('dotenv').config();
const Testing_URL = "https://jsonplaceholder.typicode.com/photos";
const port = process.env.PORT || 4000
const nextResponse = `https://demo-api11101997.herokuapp.com`;



exports.getAllPhotos = async (req, res) => {
    const pageAsNumber = Number.parseInt(req.query._page);
    const sizeAsNumber = Number.parseInt(req.query._limit);
    const albumId = Number.parseInt(req.query.albumId);


    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }

    let size = 4;
    if (
        !Number.isNaN(sizeAsNumber) &&
        !(sizeAsNumber > 10) &&
        !(sizeAsNumber < 1)
    ) {
        size = sizeAsNumber;
    }
    const Photoscount = await axios.get(`${Testing_URL}?albumId=${albumId}`);
    const count = Photoscount.data.length

    const photos = await axios.get(`${Testing_URL}?albumId=${albumId
        }&_page=${page
        }&_limit=${size}`);

    var totalPages = Math.ceil(count / Number.parseInt(size));
    var nextPage =
        page + 1 > totalPages
            ? null
            : `${nextResponse}/photos/getallphotos?albumId=${albumId}&_page=${page + 1}&_limit=${size}`;
    var previousPage =
        page - 1 < 1 ? null : `${nextResponse}/photos/getallphotos?albumId=${albumId}&_page=${page - 1}&_limit=${size}`;
    if (page > totalPages) {
        res.send({
            detail: "Not found",
        });
    } else {
        res.send({
            next: nextPage,
            previous: previousPage,
            content: photos.data,
            totalPages: totalPages,
        });
    }
};

exports.getAllAlbums = async (req, res) => {
    const pageAsNumber = Number.parseInt(req.query._page);
    const sizeAsNumber = Number.parseInt(req.query._limit);
    const albumId = Number.parseInt(req.query.albumId);
    const ALBUM_URL = "https://jsonplaceholder.typicode.com/albums";

    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }

    let size = 10;
    if (
        !Number.isNaN(sizeAsNumber) &&
        !(sizeAsNumber > 10) &&
        !(sizeAsNumber < 1)
    ) {
        size = sizeAsNumber;
    }
    const Albumcount = await axios.get(`${ALBUM_URL}`);
    const count = Albumcount.data.length

    const albums = await axios.get(`${ALBUM_URL}?_page=${page
        }&_limit=${size}`);

    var totalPages = Math.ceil(count / Number.parseInt(size));
    var nextPage =
        page + 1 > totalPages
            ? null
            : `${nextResponse}/photos/getallalbum?_page=${page + 1}&_limit=${size}`;
    var previousPage =
        page - 1 < 1 ? null : `${nextResponse}/photos/getallalbum?_page=${page - 1}&_limit=${size}`;
    if (page > totalPages) {
        res.send({
            detail: "Not found",
        });
    } else {
        res.send({
            next: nextPage,
            previous: previousPage,
            content: albums.data,
            totalPages: totalPages,
        });
    }
};


