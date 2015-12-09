var fs = require('fs');


var Git = require('../githelper').Git;

var gitconfig = JSON.parse(fs.readFileSync('./git.private.json', 'utf8'));

var gitHelper = new Git(gitconfig);


var pullinfo = {
  "pull_request" :{
    "statuses_url": "https://api.github.com/repos/pct-tr22/build1/statuses/8ab1b70968143f8fe2db0009d5a901b0c2b94b19"
  }
}
 var staturl = "https://api.github.com/repos/pct-tr22/build1/statuses/8ab1b70968143f8fe2db0009d5a901b0c2b94b19";

gitHelper.setStatus(
  staturl, gitHelper.statusType.failure);


console.log('done');
