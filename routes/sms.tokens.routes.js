const express = require('express')
const router = express.Router();
const transferCtrl = require('../controllers/sms.tokens.controller');


router.post(`` , transferCtrl.validateSmsToken);

module.exports = router;