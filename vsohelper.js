//Requirements
// username, password, serverurl, 

// build: buildid, branch, commithash

var fs = require('fs');

var vso = require('vso-node-api');
var webapim = require('vso-node-api/WebApi');
var Q = require('q');

var _options

var _handler, _buildClient;

var Vso = function (options) {
  _options = options;  
  if (! _options.username)
    throw 'Missing username on Vso object';
    
  if (! _options.password)
    throw 'Missing password on Vso object';
    
  if (! _options.serverurl)
    throw 'Missing serverurl on Vso object';
    
  if (! _options.projectname)
    throw 'Missing projectname on Vso object';        
  
  init();
  
};

function init(){
  _handler = vso.getBasicHandler(_options.username, _options.password);
  _buildClient = new webapim.WebApi(_options.serverurl, _handler).getQBuildApi();
}


/**
 * Calls the VSO API to queue the build.
 * 
 * 
 */
Vso.prototype.doIt = function(){
  var deferred = Q.defer();
  console.log('getting definitions');
  
  return _buildClient.getDefinitions('GeneralGit')
    .then( function(foo){
  
    var thing = {
      id : foo[0].id,
      name : foo[0].name,
      url : foo[0].url,
      projectId : foo[0].project.id
    }
    
    return _buildClient.getDefinition(thing.id, thing.projectId)
      .then(function(build){
        /// TODO: work out what the bug here is.. the call to queueBuild is nfg.
        var sd = {
          "definition": {
            "id": build.id
          },
            "sourceBranch": "master"
          }
        
        return _buildClient.queueBuild(sd, build.project.name, true)
          .then(function(something){
            fs.writeFileSync('lastbuildrequest.json', JSON.stringify(something));  
            deferred.resolve(something);
          })
        })
      });
      
    console.error('fell out');
    deferred.reject(new Error('vso helper fell out...'));
    
    return deferred.promise;
}

Vso.prototype.log = function () {
  console.log(_options);
};


module.exports.Vso = Vso
