const Artist = require('../models/ArtistStyle');

const createArtist = async (req, res) => {
  try {
    const { artist_id, artist_name, artist_bio, artist_image } = req.body;

    const artist = new Artist({
      artist_id,
      artist_name,
      artist_bio,
      artist_image,
    });

    await artist.save();
    res.status(201).json({ message: 'Artist created successfully', artist });
  } catch (error) {
    console.error('Error creating artist:', error);
    res.status(400).json({ message: 'Error creating artist', error: error.message });
  }
};


const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { createArtist,getAllArtists };
