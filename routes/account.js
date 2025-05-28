const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');

router.post('/', accountController.createAccount);
router.get('/:account_id', accountController.getAccount);
router.put('/:account_id', accountController.updateAccount);
router.delete('/:account_id', accountController.deleteAccount);
router.get('/:account_id/destinations', accountController.getAccountDestinations);

module.exports = router;