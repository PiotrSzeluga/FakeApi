const express = require('express')
const router = express.Router();
const transferCtrl = require('../controllers/transfers.controller');
const auth = require('../middlewares/auth.middleware')

  //router.get(`/for-user-id/:id`, )
  router.post(`` ,auth, transferCtrl.validateTransfer);
  //router.delete(`/by-id/:id`, )

  module.exports = router;