var debug = require('debug')('vsohelper:prstatus');

var fs = require('fs');

var PullStatus = function(){}

var getFilename = function(pullId){
  var name = './data/pr-' + pullId + '.json';
  debug('writing filename ' + name);
  return './data/pr-' + pullId + '.json';
}

PullStatus.prototype.save = function(gitPullRequest){
  debug('writing file...');
  var fileName = getFilename(gitPullRequest.sha);
  fs.writeFileSync(fileName, JSON.stringify(gitPullRequest)); 
  debug('done writing file... ');
  return fileName;
}
 
PullStatus.prototype.get = function(pullId){
  debug('reading file... ');
  var fileName = getFilename(pullId);
  var pullStatus = fs.readFileSync(fileName).toJSON();
  debug('done reading file...');
  return pullStatus;
}

PullStatus.prototype.parse = function(gitPullRequest){
  if ( ! gitPullRequest.pull_request){
    debug('this is not a pull request... bailing');
    return undefined;//throw new Error('invalid pull request format');    
  }

  var root = gitPullRequest.pull_request;

  /// TODO: some checking...
  //head is the commit 'source' of the new code asking to be merged into the base...
  var rv = {
    id: gitPullRequest.number,
    action: gitPullRequest.action,
    url: root.url,
    branch : root.base.ref,    
    sha: root.head.sha,
    statuses_url : root.statuses_url,
    head : {
      label : root.head.label,
      ref : root.head.ref,
      sha : root.head.sha,
      repo : root.head.repo.full_name,
      url : root.head.repo.clone_url
    },
    base : {
      label: root.base.label,
      ref : root.base.ref,
      sha : root.base.sha,
      repo : root.base.full_name,
      url : root.base.clone_url
    }
  }
  
  return rv;
}


module.exports = new PullStatus();