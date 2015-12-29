var debug = require('debug')('vsohelper:vsostatus'); 
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Q = require('q');

// var Vso = require('../vsohelper').Vso;
// var vsoconfig = JSON.parse(fs.readFileSync('./vso.private.json', 'utf8'));

var Git = require('../githelper').Git;
var gitconfig = JSON.parse(fs.readFileSync('./git.private.json', 'utf8'));
var gitHelper = new Git(gitconfig);

var buildStatus = require('../model/buildstatus');

router.put('/:id', function(req, res, next){
  var buildId = req.params.id;
  debug('got an update for ' + buildId);
  
  if ( ! req.body.status)
    return res.status(400).send('missing PUT json body with status');

  var buildinfo = buildStatus.get(buildId);
  
  debug(buildinfo);
    
  var reqStatus = req.body.status;
  var statusUrl = buildinfo.statusUrl;
  
  debug('will try to update: ' + statusUrl + '  to status of ' + reqStatus);
  
  gitHelper.setStatus(statusUrl, reqStatus);
  
  return res.status(201).send(buildinfo);
});

router.put('/', function(req, res, next){
  var buildId = req.params.id;
  debug('failure to provide a proper Uri / id');
  return res.status(500).send('error', { error: 'need to provide a buildid' });  
});

router.get('/:id', function(req, res, next){
  debug('doing...');
  var buildId = req.params.id;
  debug('getting build info for ' + buildId);
  var buildinfo = buildStatus.get(buildId);
  debug('got file');
  return res.status(200).send(buildinfo);
  
})

module.exports = router;
