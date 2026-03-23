const portifolioController = require('../controllers/portifolioController');

const express = require('express');
const router = express.Router();

router.get('/portifolio', portifolioController.getPortifolio);

module.exports = router;