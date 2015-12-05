var vso = require('vso-node-api');
var Q = require('q');

var handler = vso.getBasicHandler('ddd', 'ddd');

var serverUrl = 'https://ddd.visualstudio.com/DefaultCollection';
var handlers = [handler];

//var build = new vso.WebApi(serverUrl, handlers);

var webapim = require('vso-node-api/WebApi');

var taskagent = new webapim.WebApi(serverUrl, handlers).getTaskAgentApi();
// var defs = build.getDefinitions('GeneralGit', 'foo');

var buildagent = new webapim.WebApi(serverUrl, handlers).getBuildApi();

var buildClient = new webapim.WebApi(serverUrl, handler).getQBuildApi();


var bd = buildClient.getDefinitions('GeneralGit').then( function(foo){
	console.log(foo);
	
	var thing = {
		id : foo[0].id,
		name : foo[0].name,
		url : foo[0].url,
		projectId : foo[0].project.id
	}
	
	var buildDefinition = foo[0];
	
	console.log('your project is ' + thing.url);
	
	var buildz = buildClient.getDefinition(thing.id, thing.projectId)
	.then(function(build){
		/// TODO: work out what the bug here is.. the call to queueBuild is nfg.
		var sd = {
			"definition": {
				"id": build.id
			},
			"sourceBranch": "master"
			}
		
		buildClient.queueBuild(sd, build.project.name, true)
		.then(function(err, status, b2){
			console.log(b2);
		})
		.fail(function(err){
			console.error('failed to queue', err);
		})
	})
	.fail(function(err){
		console.error('failed on get build', err);
	})
	
	
	
}).fail( function(err){
	console.error('failed', err);
});





console.log('done');