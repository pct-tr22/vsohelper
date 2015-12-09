var debug = require('debug')('vsohelper:buildstatus');

var fs = require('fs');

var BuildStatus = function(){}

var getFilename = function(buildId){
  var name = './data/buildStatus-' + buildId + '.json';
  debug('writing filename ' + name);
  return './data/buildStatus-' + buildId + '.json';
}

BuildStatus.prototype.save = function(buildId, statusUrl){
  debug('writing file...');
  var buildStatus = { 'buildId': buildId, 'statusUrl': statusUrl }
  var fileName = getFilename(buildId);
  fs.writeFileSync(fileName, JSON.stringify(buildStatus)); 
  debug('done writing file... ');
}
 
BuildStatus.prototype.get = function(buildId){
  debug('reading file... ');
  var fileName = getFilename(buildId);
  var buildStatus = JSON.parse(fs.readFileSync(fileName));
  debug('done reading file...');
  return buildStatus;
}

module.exports = new BuildStatus();
