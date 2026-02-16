const Music = require('../models/music.model');
const Album = require('../models/album.model');
const uploadFile = require('../services/storage.service'); 
const jwt = require('jsonwebtoken');
require('../models/album.model'); 


// 🎵 CREATE MUSIC
async function createMusic(req, res) {
  

    const { title } = req.body;

    const result = await uploadFile(req.file.buffer);

    const newMusic = await Music.create({
      title,
      url: result.url,
      artistId: req.user.id,
    });

    res.status(201).json({
      message: 'Music created successfully',
      music: newMusic,
    });

  } 
 

// 💿 CREATE ALBUM
async function createAlbum(req, res) {
  try {
    const { title, musicIds } = req.body;

    // 📦 Validate title
    if (!title) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    // 📦 Validate musics array (optional but good)
    if (!musicIds || !Array.isArray(musicIds)) {
      return res.status(400).json({
        message: "musicIds must be an array"
      });
    }

    // 🔐 req.user comes from auth middleware
    const albumCreated = await Album.create({
      title,
      musics: musicIds,
      artist: req.user.id,
    });

    res.status(201).json({
      message: 'Album created successfully',
      album: albumCreated,
    });

  } catch (err) {
    console.error("CREATE ALBUM ERROR:", err);
    res.status(500).json({
      message: "Server error"
    });
  }
}

async function getallmusics(req, res) {
    const musics = await Album.find().limit(20).populate('artist', 'username');
    res.status(200).json({
      message: 'Albums retrieved successfully',
      musics: musics,
    });
  }
async function getallalbums(req, res) {
    const albums = await Album.find().select('title artist').populate('artist', 'username').populate('musics');
    res.status(200).json({  
      message: 'Albums retrieved successfully',
      albums: albums,
    });
  } 
 async function getalbumById(req, res) {
  try {
    // ✅ Correct param extraction
    const { albumId } = req.params;

    // 🔎 Find album
    const album = await Album.findById(albumId)
      .populate('artist', 'username')
      .populate('musics');

    if (!album) {
      return res.status(404).json({
        message: 'Album not found',
      });
    }

    // ✅ Success response
    res.status(200).json({
      message: 'Album retrieved successfully',
      album,
    });

  } catch (error) {
    console.error("GET ALBUM ERROR:", error);
    res.status(500).json({
      message: 'Server error',
    });
  }
}
module.exports = { createMusic, createAlbum, getallmusics,getallalbums, getalbumById };