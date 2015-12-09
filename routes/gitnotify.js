var debug = require('debug')('vsohelper:gitnotify'); 
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Q = require('q');

var Vso = require('../vsohelper').Vso;
var vsoconfig = JSON.parse(fs.readFileSync('./vso.private.json', 'utf8'));

var Git = require('../githelper').Git;
var gitconfig = JSON.parse(fs.readFileSync('./git.private.json', 'utf8'));
var gitHelper = new Git(gitconfig);

var buildStatus = require('../model/buildstatus');

router.post('/', function(req, res, next) {

  //there's clearly more 'state' management to do; but illustrates the general flow.
  debug('got something.....');
  var body = req.body;
  var sha = req.body.pull_request.head.sha;
  var prStatusesUrl = req.body.pull_request.statuses_url;

  //TODO: replace with a model  
  fs.writeFileSync( './data/pr-' + sha + '.json', JSON.stringify(body));  
  debug('writing file ' + sha);
  
  var vsoHelper = new Vso(vsoconfig);
  debug('getting vsohelper');
  
  var p = vsoHelper.doIt(vsoconfig.buildname);
  debug('called vso helper');
  
  return p.then(function(vsoBuildInfo){
    //console.log(pullinfo);
    //do something with the VSO build status...??
    debug('resolved the promise');
    debug('now calling git setting status to pending...')
    gitHelper.setStatus(prStatusesUrl, gitHelper.statusType.pending);
    debug('called git ... ')
    
    //At this point we have
    // VSO "build ID" - and Git PR status URL...
    buildStatus.save(vsoBuildInfo.id, prStatusesUrl);

    
    debug('were done...  now set location and return');
    res.location(prStatusesUrl); //this should be some REST location for Me..
    return res.status(201).send('accepted...');
  })
  .fail(function(err){
    debug('failed on the promise');
    console.error('failed on the promise', error);
    return res.status(500).send('error', { error: err })
  });
  
});

module.exports = router;


