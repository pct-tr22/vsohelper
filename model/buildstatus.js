var debug = require('debug')('vsohelper:buildstatus');

var fs = require('fs');

var BuildStatus = function(){}

var getFilename = function(buildId){
  var name = './data/buildStatus-' + buildId + '.json';
  debug('filename ' + name);
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
  var buildStatus;
  try {
    buildStatus = JSON.parse(fs.readFileSync(fileName));
  } catch (e) {
    // Here you get the error when the file was not found,
    // but you also get any other error
    debug('some error occured reading file: ' + e);
  }
  debug('done reading file...');
  return buildStatus;
}

module.exports = new BuildStatus();
