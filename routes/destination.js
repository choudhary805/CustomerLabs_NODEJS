const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destination');

router.post('/', destinationController.createDestination);
router.get('/:id', destinationController.getDestination);
router.put('/:id', destinationController.updateDestination);
router.delete('/:id', destinationController.deleteDestination);

module.exports = router;