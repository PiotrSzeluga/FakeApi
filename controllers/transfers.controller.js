var usrMock = require('../mocks/users-mock');
var transferMock = require('../mocks/transfers-mock');
const bcrypt = require('bcrypt');
const smsController = require('../controllers/sms.tokens.controller');


// Sprawdzamy czy można zrealizować przelew ( wysyłający ma wystarczająco $)
exports.validateTransfer = function(req, res){
  //tworzymy w miarę unikalny identyfikator przelewu przy pomocy bcrypt 
  bcrypt.hash( req.body.from.id + req.body.accNumber + toString(Date.now()),3,function(err, hash){
    var tempTransfer = {
      transferID: hash,
      from: {
        id: req.body.from.id,
        accNumber: req.body.from.accNumber
      },
      to: {
        accNumber: req.body.to.accNumber
      },
      amount: req.body.amount
    }
  // znajdujemy wysyłającego i przywiązujemy go do zmiennej
    let sender = usrMock.users.find(
      function(el){
        return tempTransfer.from.id == el.id ? true : false;
      }
    )
  // znajdujemy jego konto
    let account = sender.accounts.find(
      function(el){
        return sender.accNumber == el.accNumber ? true : false;
      }
    )

  // sprawdzamy czy $ się zgadza
    if(account.accBalance >= req.body.amount){ // jeśli tak generujemy kod SMS i wyświetlamy go w konsoli (normalnie wysłalibyśmy go SMSem)
      transferMock.pendingTransfers.push(tempTransfer);
      smsController.generateSmsToken(tempTransfer.transferID);
      res.json({ //wysyłamy użytkownikowi ID transferu które musi nam odesłać razem z SMS kodem
            "status":"waitingForSmsCode",
            "transferID": tempTransfer.transferID
          });
    }
    else{ //jeśli coś się nie uda zwracamy informację o niepowodzeniu
      res.json({"status":"failed"});
    }
  }) 
}
