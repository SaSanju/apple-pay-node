var request = require('request');
var express = require('express');
require('dotenv').config();
var fs = require('fs');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/merchant-session/new', function(req, res) {
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

  request.post(options, function(error, response, body) {
    // console.log(response)
    if (body) {
      // Apple returns a payload with `displayName`, but passing this
      // to `completeMerchantValidation` causes it to error.
      delete body.displayName;
    }

    res.send(body);
  });
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Apple Pay server running on ' + server.address().port);
  console.log('GET /merchant-session/new to retrieve a merchant session');
});
