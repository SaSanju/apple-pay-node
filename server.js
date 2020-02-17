var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
require('dotenv').config();
var fs = require('fs');
var PreAuthJSON = require('./PreAuthJSON');
var PostAuthJSON = require('./postAuthJSON');


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/merchant-session/new', function (req, res) {
  var uri = req.query.validationURL || 'https://apple-pay-gateway-cert.apple.com/paymentservices/startSession';

  var options = {
    uri: uri,
    json: {
      merchantIdentifier: process.env.APPLE_PAY_MERCHANT_IDENTIFIER,
      domainName: process.env.APPLE_PAY_DOMAIN,
      displayName: process.env.APPLE_PAY_DISPLAY_NAME
    },
    agentOptions: {
      pfx: fs.readFileSync(__dirname + '/apple-pay-node/ApplePay_merchant_id.p12'),
      passphrase: process.env.APPLE_PAY_CERT_PASSWORD
    }
  };

  request.post(options, function (error, response, body) {

    if (error) {
      throw new Error("Error in create Apple Pay Session.")
    }

    res.send(body);
  });
});

app.post('/auth/getsessiontoken', function (req, res) {
  var reqData = req.body;

  var billingContactObj = reqData.paymentObj.billingContact
  var shippingContactObj = reqData.paymentObj.shippingContact
  var tokenObj = reqData.paymentObj.token
  var sessionId = reqData.sessionId

  var uri = `${process.env.AURUS_PAY_DOMAIN_NAME}/sessiontoken`

  var options = {
    uri: uri,
    json: {
      "GetSessionTokenRequest": {
        "CorpID": process.env.AURUS_PAY_CORP_ID,
        "MerchantSessionId": "",
        "ProfileId": "",
        "WalletToken": "234321dfasd",
        "CartId": "",
        "TransactionTime": moment().format('hhmmss'),
        "PaymentToken": {
          "billingContact": billingContactObj,
          "shippingContact": shippingContactObj,
          "token": tokenObj
        },
        "ECOMMInfo": {
          "StoreId": process.env.AURUS_PAY_STORE_ID,
          "MerchantIdentifier": process.env.AURUS_PAY_MERCHANT_ID,
          "TerminalId": process.env.AURUS_PAY_TERMINAL_ID
        },
        "WalletIdentifier": "7",
        "SessionId": sessionId,
        "TransactionDate": moment().format('MMDDYYYY')
      }
    }
  }

  request.post(options, function (error, response, body) {

    if (error) {
      console.log(error)
      throw new Error("Error in get OTT from Aurus Pay Session.")
    }
    // res.send(body)
    console.log(body.GetSessionTokenResponse.ECOMMInfo.OneTimeToken)

    preAuthFunc(body, (preData) => {
      postAuthFunc(preData.preAuthRes, (postData)=> {
        var resData = {
          "sessionReq":options.json,
          "sessionRes":body,
          "preAuthReq":preData.preAuthReq,
          "preAuthRes":preData.preAuthRes,
          "postAuthReq":postData.postAuthReq,
          "postAuthRes":postData.postAuthRes
        }
        res.send(resData);
      })
    });
  });
});

var preAuthFunc = (reqData, next) => {
  var uri = `${process.env.AURUS_PAY_DOMAIN_NAME}/authtransaction`;
  var preAuthReqObj = PreAuthJSON;
  preAuthReqObj.TransRequest.TransactionTime = moment().format('hhmmss');
  var ECOMMInfo = {
    "OneTimeToken": reqData.GetSessionTokenResponse.ECOMMInfo.OneTimeToken,
    "StoreId": process.env.AURUS_PAY_STORE_ID,
    "MerchantIdentifier": process.env.AURUS_PAY_MERCHANT_ID,
    "TerminalId": process.env.AURUS_PAY_TERMINAL_ID,
    "CardIdentifier": "",
    "OneOrderToken": ""
  }
  preAuthReqObj.TransRequest.ECOMMInfo = ECOMMInfo;


  var options = {
    uri: uri,
    json: preAuthReqObj
  }

  request.post(options, function (error, response, body) {

    if (error) {
      console.log(error)
      throw new Error("Error in authenticate OTT from Aurus Pay Session.")
    }
    // console.log(body)
    
    next({
      "preAuthReq": preAuthReqObj,
      "preAuthRes": body
    });
  });

}

var postAuthFunc = (reqData, next) => {
  var uri = `${process.env.AURUS_PAY_DOMAIN_NAME}/authtransaction`;
  var postAuthReqObj = PostAuthJSON;
  postAuthReqObj.TransRequest.TransactionTime = moment().format('hhmmss');
  postAuthReqObj.TransRequest.OrigAurusPayTicketNum = reqData.TransResponse.AurusPayTicketNum;
  postAuthReqObj.TransRequest.OrigTransactionIdentifier = reqData.TransResponse.TransDetailsData.TransDetailData.TransactionIdentifier;
  postAuthReqObj.TransRequest.ECOMMInfo = reqData.TransResponse.TransDetailsData.TransDetailData.ECOMMInfo;


  var options = {
    uri: uri,
    json: postAuthReqObj
  }

  request.post(options, function (error, response, body) {

    if (error) {
      console.log(error)
      throw new Error("Error in Post authenticate from Aurus Pay Session.")
    }
    // console.log(body)
    
    next({
      "postAuthReq": postAuthReqObj,
      "postAuthRes": body
    });
  });

}

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Apple Pay server running on ' + server.address().port);
  console.log('GET /merchant-session/new to retrieve a merchant session');
  console.log('POST /auth/getsessiontoken to get session token from aurus');
});
