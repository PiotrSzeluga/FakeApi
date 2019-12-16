const config = require('../app.config');
const express = require('express')
const router = express.Router();
const usrCtrl = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');

  router.get(`/by-id/:id`, auth, usrCtrl.getUser)
  //router.get(`/all`, usrCtrl.getUsers) // ścieżka testowa do podglądu wszystkich userów (nie powinna się znaleźć na produkcji)
  router.post(``, auth, usrCtrl.addUser)
  router.delete(`/by-id/:id`,auth ,usrCtrl.delUser)
  router.post(`/login`, auth, usrCtrl.logIn)
  router.post(`/logout`, auth, usrCtrl.logOut)
  // TODO - dodać endpoint /add-account

  module.exports = router;