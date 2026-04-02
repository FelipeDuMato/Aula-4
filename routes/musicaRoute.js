const router = require('express').Router();
const musicaController = require('../controllers/musicacontroller.js');

router.get('/', musicaController.getMusica);

module.exports = router;
