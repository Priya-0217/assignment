const express = require('express');
const musiccontroller = require('../controllers/music.controller');
const authmiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
})

const router = express.Router();

router.post('/upload',authmiddleware.authArtist, upload.single('music'), musiccontroller.createMusic);
router.post('/album', authmiddleware.authArtist, musiccontroller.createAlbum);
router.get('/musics', authmiddleware.authAny, musiccontroller.getallmusics);
router.get('/musics/:musicId', authmiddleware.authAny, musiccontroller.getMusicById);
router.put('/musics/:musicId', authmiddleware.authArtist, musiccontroller.updateMusic);
router.delete('/musics/:musicId', authmiddleware.authArtist, musiccontroller.deleteMusic);
router.get('/albums', authmiddleware.authAny, musiccontroller.getallalbums);
router.put('/albums/:albumId', authmiddleware.authArtist, musiccontroller.updateAlbum);
router.delete('/albums/:albumId', authmiddleware.authArtist, musiccontroller.deleteAlbum);
router.get('/albums/:albumId', authmiddleware.authAny, musiccontroller.getalbumById);

module.exports = router; 
