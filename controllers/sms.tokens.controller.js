var usrMock = require('../mocks/users-mock');
var transferMock = require('../mocks/transfers-mock');
var smsTokens = require('../mocks/sms-tokens-mock');


function getAccount(acNumber){
  for (let i of usrMock.users){
    for (let j of i.accounts){
      if(j.accNr == acNumber){
        return j;
      }
    }
  }
  return null;
}

exports.generateSmsToken = function(transferID){
  let smsCode = Math.floor(Math.random() * (999999 - 100000) ) + 100000;
  let smsToken = {
    transferID: transferID,
    smsCode: smsCode
  }
  smsTokens.smsTokens.push(smsToken)
  console.log(smsToken)
}

exports.validateSmsToken = function(req, res){
  var transfer = transferMock.pendingTransfers.find(
    function(element){
      return element.transferID == req.body.transferID  ? true : false;
    }
  )
  var smsToken = smsTokens.smsTokens.find(
    function(element){
      return element.transferID == req.body.transferID ? true : false;
    }
  )
  if(transfer.transferID && transfer.transferID == smsToken.transferID){
   //console.log(transferMock.pendingTransfers.indexOf(transfer)); // 
   let senderAcc = getAccount(transfer.from.accNumber);
   let recipientAcc = getAccount(transfer.to.accNumber);
   senderAcc.accBalance -= transfer.amount;
   recipientAcc.accBalance += transfer.amount;
   confirmedTransfer = transferMock.pendingTransfers.splice(transferMock.pendingTransfers.indexOf(transfer),1);
   transferMock.transfers.push(confirmedTransfer)
   res.json({senderAcc});
  }

}