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
router.get('/', authmiddleware.authUser, musiccontroller.getallmusics);
router.get('/albums', authmiddleware.authUser, musiccontroller.getallalbums);
router.get('/albums/:albumId', authmiddleware.authUser, musiccontroller.getalbumById);

module.exports = router; 