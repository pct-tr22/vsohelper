var debug = require('debug')('vsohelper:gitsetup'); 
var express = require('express');
var router = express.Router();

module.exports = router;


router.post('/', function(req, res, next) {
  
  //we're just echoing to the console and back to caller...
  debug('got something.....');
  debug('headers...');
  debug('-------------------------');
  debug(req.headers);
  debug(' ');
  debug('body...');
  
  debug(req.body);
  
  return res.status(200).send('accepted...');
  
})

