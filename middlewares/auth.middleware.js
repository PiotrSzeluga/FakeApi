var usrMock = require ('../mocks/users-mock');
var loggedInUsers = require('../mocks/logged-in.users.mock');

module.exports = (req, res, next) => {  // TODO - przerobić na Web Tokeny
  userFound = loggedInUsers.logedInUsers.find(
    (itm) => itm.login == req.body.login && itm.password == req.body.password? true: false 
  )
  console.log(userFound)
  if(userFound) {
    next()
  }
  else{
    return res.status(400).send({
      message: 'NIE zalogowany!'
   });
  }
} 