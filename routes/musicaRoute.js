const router = require('express').Router();
const musicaController = require('../controllers/musicacontroller.js');

router.get('/musica', musicaController.getMusica);

module.exports = router;