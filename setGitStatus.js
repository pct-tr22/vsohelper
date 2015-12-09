

var request = require('request');
var base64 = require('base-64');


//comes from pull_request.statuses_url;

var currentSha = 'https://api.github.com/repos/pct-tr22/build1/statuses/8ab1b70968143f8fe2db0009d5a901b0c2b94b19';


//this is the authn coce.
var basicAuthnHeader = base64.encode('d:' + 'dd');

// Set the headers
var headers = {
    'Authorization': 'Basic ' + basicAuthnHeader,
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/json'
}

// set the body.
var data = {
  "state": "success", //pending, success, error, failure
  "target_url": "https://example.com/build/status",
  "description": "The is pending..."
}
 
// Configure the request
var options = {
    url: currentSha,
    method: 'POST',
    headers: headers,
    json: data
}

// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    }
    else {
        console.log(response.statusCode);
        console.log(error);
        console.log(response.body);
        
    }
});

