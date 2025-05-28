const express = require('express');
const router = express.Router();
const dataHandlerController = require('../controllers/dataHandler');

router.post('/', dataHandlerController.handleIncomingData);

module.exports = router;