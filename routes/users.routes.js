const config = require('../app.config');
const express = require('express')
const router = express.Router();
const usrCtrl = require('../controllers/users.controller');


  router.get(`/by-id/:id`, usrCtrl.getUser)
  router.get(`/all`, usrCtrl.getUsers) // ścieżka testowa do podglądu wszystkich userów (nie powinna się znaleźć na produkcji)
  router.post(``, usrCtrl.addUser)
  router.delete(`/by-id/:id`, usrCtrl.delUser)

  module.exports = router;