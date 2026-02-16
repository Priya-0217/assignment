const Music = require('../models/music.model');
const Album = require('../models/album.model');
const uploadFile = require('../services/storage.service'); 
const jwt = require('jsonwebtoken');
require('../models/album.model'); 


// 🎵 CREATE MUSIC
async function createMusic(req, res) {
  try {
    const title = req.body?.title;
    const fileBase64 = req.body?.fileBase64;
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ message: 'Title is required' });
    }
    let bufferToUpload;
    let fileName = "music_" + Date.now() + ".mp3";
    if (req.file && req.file.buffer) {
      bufferToUpload = req.file.buffer;
      const orig = req.file.originalname || '';
      const ext = orig.includes('.') ? orig.split('.').pop() : '';
      if (ext) fileName = 'music_' + Date.now() + '.' + ext;
    } else if (typeof fileBase64 === 'string' && fileBase64.trim().length > 0) {
      const s = fileBase64.trim();
      const commaIdx = s.indexOf(',');
      const pureBase64 = commaIdx !== -1 ? s.slice(commaIdx + 1) : s;
      bufferToUpload = Buffer.from(pureBase64, 'base64');
    } else {
      return res.status(400).json({ message: "music file required: send form-data 'music' file or JSON 'fileBase64'" });
    }
    const result = await uploadFile(bufferToUpload, fileName);
    const newMusic = await Music.create({
      title,
      url: result.url,
      artistId: req.user.id,
    });
    res.status(201).json({
      message: 'Music created successfully',
      music: newMusic,
    });
  } catch (error) {
    console.error('CREATE MUSIC ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
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
    const filter = (req.user && req.user.role === 'artist')
      ? { artistId: req.user.id }
      : {};
    const musics = await Music.find(filter).limit(50).populate('artistId', 'username');
    res.status(200).json({
      message: 'Musics retrieved successfully',
      musics,
    });
  }
async function getMusicById(req, res) {
  try {
    const { musicId } = req.params;
    const music = await Music.findById(musicId).populate('artistId','username');
    if (!music) {
      return res.status(404).json({ message: 'Music not found' });
    }
    res.status(200).json({ message: 'Music retrieved successfully', music });
  } catch (error) {
    console.error('GET MUSIC ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateMusic(req, res) {
  try {
    const { musicId } = req.params;
    const { title } = req.body;
    const music = await Music.findById(musicId);
    if (!music) {
      return res.status(404).json({ message: 'Music not found' });
    }
    if (String(music.artistId) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    if (title) music.title = title;
    await music.save();
    res.status(200).json({ message: 'Music updated successfully', music });
  } catch (error) {
    console.error('UPDATE MUSIC ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteMusic(req, res) {
  try {
    const { musicId } = req.params;
    const music = await Music.findById(musicId);
    if (!music) {
      return res.status(404).json({ message: 'Music not found' });
    }
    if (String(music.artistId) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await music.deleteOne();
    res.status(200).json({ message: 'Music deleted successfully' });
  } catch (error) {
    console.error('DELETE MUSIC ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getallalbums(req, res) {
    const albums = await Album.find().select('title artist').populate('artist', 'username').populate('musics');
    res.status(200).json({  
      message: 'Albums retrieved successfully',
      albums: albums,
    });
  } 
async function updateAlbum(req, res) {
  try {
    const { albumId } = req.params;
    const { title, musicIds } = req.body;
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    if (String(album.artist) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    if (title) album.title = title;
    if (musicIds && Array.isArray(musicIds)) album.musics = musicIds;
    await album.save();
    res.status(200).json({ message: 'Album updated successfully', album });
  } catch (error) {
    console.error('UPDATE ALBUM ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteAlbum(req, res) {
  try {
    const { albumId } = req.params;
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    if (String(album.artist) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await album.deleteOne();
    res.status(200).json({ message: 'Album deleted successfully' });
  } catch (error) {
    console.error('DELETE ALBUM ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
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
module.exports = { createMusic, getallmusics, getMusicById, updateMusic, deleteMusic, createAlbum, getallalbums, getalbumById, updateAlbum, deleteAlbum };
