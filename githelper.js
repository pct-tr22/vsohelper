var request = require('request');
var base64 = require('base-64');
var debug = require('debug')('vsohelper:githelper');

var _options, _basicAuthnHeader


var Git = function (options) {
  _options = options;  
  if (! _options.username)
    throw 'Missing username on Git object';
    
  if (! _options.password)
    throw 'Missing password on Git object';    
  
  init();
  
};


function init(){
  
  _basicAuthnHeader = base64.encode(_options.username  + ':' + _options.password);
  
};

function getHeaders(){
    return {
        'Authorization': 'Basic ' + _basicAuthnHeader,
        'User-Agent':       'TechReady22 Super Agent/0.0.1',
        'Content-Type':     'application/json'    
    }
      
};

Git.prototype.setStatus = function(statusesUrl, statusType){

  debug('got a status update for ' + statusesUrl + ' to be set to ' + statusType);
  
  if ( !this.validateStatus(statusType))
    throw new Error('invalid status type provided: ' + statusType);

  var currentUrl = statusesUrl;
  
  var data = {
    "state": statusType, 
    "target_url": "https://example.com/build/status",
    "description": "The is a status from TR... "
  }
  
  // Configure the request
  var options = {
    url: currentUrl,
    method: 'POST',
    headers: getHeaders(),
    json: data
  }

  // Start the request
  request(options, function (error, response, body) {
      if (! error && response.statusCode < 299 ){ // //&& response.statusCode == 200) {
         debug('completed call to git for status update... ')
         debug('status code response: ' + response.statusCode);
         //debug(response.body);
      }
      else {
          debug('fell into else in githelper');
          console.log(response.statusCode);
          console.log(error);
          console.log(response.body);
      }
  });
  
};


Git.prototype.statusType = {
  pending:"pending",
  success:"success",
  error:"error",
  failure:"failure"
}

Git.prototype.validateStatus = function(statusText){
  switch (statusText) {
    case "pending":
    case "success":
    case "error":
    case "failure":
    return true;
    default:
    debug('invalid status provided');
    return false;
  }
}




module.exports.Git = Git