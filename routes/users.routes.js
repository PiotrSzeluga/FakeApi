const config = require('../app.config');
const express = require('express')
const router = express.Router();
const usrCtrl = require('../controllers/users.controller');

/*var users = require('../mocks/users-mock');
function addUser(){
  return(users.users[0]);
}
function addAccount(parametry){
  temp = users.users.find(
    function(element){
      return element.id == parametry.id ? true :false;
    })
  if(temp){
    temp.accounts.push(parametry.account)
  }
  return users.users;
    
}

exports.addUser = addUser;
exports.addAccount = addAccount;
*/

  router.get(`/by-id/:id`, usrCtrl.getUser)
  router.get(`/all`, usrCtrl.getUsers) // ścieżka testowa do podglądu wszystkich userów (nie powinna się znaleźć na produkcji)
  router.post(``, usrCtrl.addUser)

  module.exports = router;