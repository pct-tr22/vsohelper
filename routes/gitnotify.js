var express = require('express');
var router = express.Router();
var fs = require('fs');



/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
  console.log('got this from git...')
  console.log('HEADERS:');
  console.log(JSON.stringify(req.headers));
  console.log('BODY: ');
  console.log(req.body);
  
  console.log('statuses url');
  
  console.log(req.body.pull_request.statuses_url);

  fs.writeFileSync('out2.json', JSON.stringify(req.body));  
   
   
});

module.exports = router;


