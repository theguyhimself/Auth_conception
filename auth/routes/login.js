var express = require('express');
var router = express.Router();
const RequestReaderLogin  = require('../RequestReader/RequestReaderLogin');


/* Try to connect */
router.post('/', function(request, res, next) { 
  let requestReaderLogin = new RequestReaderLogin();
  requestReaderLogin.ReadRequest(request, res, next);
  res.status(requestReaderLogin.info.status)
  res.send(requestReaderLogin.info.body);
});

module.exports = router;
