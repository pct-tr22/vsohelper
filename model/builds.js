var fs = require('fs');

var Builds = function(){}

Builds.prototype.save = function(queueRequest){
  fs.writeFileSync('./data/' + queueRequest.id + '.json', JSON.stringify(queueRequest)); 
}
 
module.exports = new Builds();
