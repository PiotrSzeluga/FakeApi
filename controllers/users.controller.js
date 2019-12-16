var usrMock = require('../mocks/users-mock.js')
var loggedInUsers = require('../mocks/logged-in.users.mock');


// dodajemy użytkownika
exports.addUser = function(req, res){
  // * generujemy w miarę unikalny id miksując dane użytkownika z datą utworzenia w jeden string i zakodowując * //
  const bcrypt = require('bcrypt');
  const saltRounds = 3;
  bcrypt.hash(req.body.name + req.body.login + req.body.password + toString(Date.now()), saltRounds, function(err, hash){
    let user = {
      id:hash,
      name:req.body.name,
      login:req.body.login,
      password:req.body.password,
      accounts: []
    }
    usrMock.users.push(user)
    res.json(usrMock.users);
    console.log
  })
}

// pobieramy dane użytkownika
exports.getUser = function(req, res){  
  let usr = usrMock.users.find(
    function(element){
      return element.id == req.params.id ? true : false;              
    }
  ) 
  res.json(usr ? usr : {"id":"not found"});
}

// usuwamy użytkownika - odfiltrowujemy id który został podany i nadpisujemy mocka
exports.delUser = function(req, res){
  let changed = false;
  let temp = usrMock.users.filter(
    function(element){
      return element.id != req.params.id ? true : false;              
    }
  )
  changed = temp.length != usrMock.users.length ? true : false;
  usrMock.users = temp;
  if(changed){
    usrMock.users = temp;
    res.json({"deleted":req.params.id});
  }
  else{
    res.json({"id":"not found"});
  }
  
}
// podgląd wszystkich użytkowników tylko do dev / testów
exports.getUsers = function(req, res){
  res.json(usrMock.users);
}

// po wysłaniu loginu i hasła na /users/login dodajemy użytkownika do tablicy zalogowanych 
exports.logIn = function(req,res){ //TODO zablokować możliwość wielokrotnego logowania (jeśli już zalogowany)
  user = usrMock.users.find(
    (itm) => {
      return itm.login == req.body.login && itm.password == req.body.password? true: false;
    } 
  )
  if(user){ // jeśli podał poprawne hasło i został znaleziony - inaczej user będzie rozwiązany do false
    loggedInUsers.logedInUsers.push(user)
  }
  res.json(loggedInUsers);  //TODO - zwrócić coś sensownego
}

// wyloguj użytkownika
exports.logOut = function(){
  user = usrMock.users.find( // szukamy w zalogowanych użytkownikach takiego który odpowiada parametrom z req i zapisujemy go w zmiennej
    (itm) => itm.login == req.body.login && itm.password == req.body.password? true: false
  )
  if(user){
    loggedInUsers.logedInUsers.splice(indexOf(user),1)
  }
  res.json(loggedInUsers); //TODO - zwrócić coś sensownego
}