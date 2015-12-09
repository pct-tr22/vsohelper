//Requirements
// username, password, serverurl, 

// build: buildid, branch, commithash

var fs = require('fs');

//TODO: rename vso here to vsoagent or something...
var vso = require('vso-node-api');
var webapim = require('vso-node-api/WebApi');
var Q = require('q');

var buildModel = require('./model/builds');

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
Vso.prototype.doIt = function(buildname){
  
  if (! buildname)
    throw 'Missing build name';
  
  var deferred = Q.defer();
  console.log('getting definitions');
   
  return _buildClient.getDefinitions(_options.projectname)
    .then( function(foo){
  
    var builddef = search(buildname, foo);
        
    var buildInfo = {
      id : builddef.id,
      name : builddef.name,
      url : builddef.url,
      projectId : builddef.project.id
    }
    
    return _buildClient.getDefinition(buildInfo.id, buildInfo.projectId)
      .then(function(buildReference){
        //console.log(buildReference);
        /// TODO: work out what the bug here is.. the call to queueBuild is nfg.
        
        var sd = {
          "definition": {
            "id": buildReference.id
          },
            "sourceBranch": "master"
          }
        
        return _buildClient.queueBuild(sd, buildReference.project.name, true)
          .then(function(queueRequest){
            console.log('queued');
            console.log(queueRequest.id)
            buildModel.save(queueRequest);
            //fs.writeFileSync(queueRequest.id + '.json', JSON.stringify(queueRequest));  
            return queueRequest;//deferred.resolve(queueRequest);
          })
        })
      });
      
    console.error('fell out:doit');
    deferred.reject(new Error('vso helper fell out...'));
    
    return deferred.promise;
}

Vso.prototype.getBuildStatus = function(buildQueue){
  var buildId;
  
  if (buildQueue === parseInt(buildQueue, 10))
    buildId = buildQueue;
  else //should check but not now..
    buildId = buildQueue.id;
  
  var deferred = Q.defer();
  
  return _buildClient.getBuild(buildId.toString(), _options.projectname)
    .then(function(buildStatus){
      fs.writeFileSync('./data/' + buildId + '-stat' + '.json', JSON.stringify(buildStatus));
      return buildStatus;//console.log(buildStatus);
    });
  
  console.error('fell out:getstatus');
  deferred.reject(new Error('vso helper fell out...'));
  return deferred.promise;
}



Vso.prototype.log = function () {
  console.log(_options);
};


function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}


module.exports.Vso = Vso













