const express = require('express')
const router = express.Router();
const transferCtrl = require('../controllers/transfers.controller');


  //router.get(`/for-user-id/:id`, )
  router.post(`` ,transferCtrl.validateTransfer)
  //router.delete(`/by-id/:id`, )

  module.exports = router;