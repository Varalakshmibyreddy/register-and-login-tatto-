const express = require('express');
const { createArtist, getAllArtists } = require('../Controllers/artist');
const router = express.Router();

router.post('/addArtist', createArtist);
router.get('/getArtist', getAllArtists);

module.exports = router;
