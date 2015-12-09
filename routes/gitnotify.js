var debug = require('debug')('vsohelper:server'); 
var express = require('express');
var router = express.Router();
var fs = require('fs');

var Q = require('q')
var Vso = require('../vsohelper').Vso;

var vsoconfig = JSON.parse(fs.readFileSync('./vso.private.json', 'utf8'));

/* GET users listing. */
router.post('/', function(req, res, next) {
  //res.send('respond with a resource');
  // console.log('got this from git...')
  // console.log('HEADERS:');
  // console.log(JSON.stringify(req.headers));
  // console.log('BODY: ');
  // console.log(req.body);

  debug('got something.....');
  // console.log(req.body.pull_request.statuses_url);
  var body = req.body;
  var sha = req.body.pull_request.head.sha;
  fs.writeFileSync( './data/pr-' + sha + '.json', JSON.stringify(body));
  
  debug('writing file ' + sha);
  
  var vsoHelper = new Vso(vsoconfig);
  
  debug('getting vsohelper');
  var p = vsoHelper.doIt(vsoconfig.buildname);
 
  debug('called vso helper');
  
  p.then(function(foo){
    debug('resolved the promise');
    console.log(foo);
  })
  .fail(function(error){
    debug('failed on the promise');
    console.error(error)
  });

   res.send('accepted');
   
});

module.exports = router;


