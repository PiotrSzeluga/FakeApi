var usrMock = require('../mocks/users-mock');
var transferMock = require('../mocks/transfers-mock');
const bcrypt = require('bcrypt');
const smsController = require('../controllers/sms.tokens.controller');

exports.validateTransfer = function(req, res){
  
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

    let sender = usrMock.users.find(
      function(el){
        return tempTransfer.from.id == el.id ? true : false;
      }
    )
    let account = sender.accounts.find(
      function(el){
        return sender.accNumber == el.accNumber ? true : false;
      }
    )
    if(account.accBalance >= req.body.amount){
      transferMock.pendingTransfers.push(tempTransfer);
      smsController.generateSmsToken(tempTransfer.transferID);
      console.log(tempTransfer.transferID);
      res.json({
            "status":"waitingForSmsCode",
            "transferID": tempTransfer.transferID
          });
    }
    else{
      res.json({"status":"failed"});
    }
  })
  
}
