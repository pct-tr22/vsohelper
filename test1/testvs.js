// var readline = require('readline');
// 
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

var Q = require('q')

var Vso = require('./vsohelper').Vso;

var fs = require('fs');

var vsoconfig = JSON.parse(fs.readFileSync('./vso.private.json', 'utf8'));
var lastbuild = JSON.parse(fs.readFileSync('./149.json', 'utf8'));
var vsoHelper = new Vso(vsoconfig);
//vsoHelper.doIt();

var p = vsoHelper.getBuildStatus('gitlab1');
 
p.then(function(foo){
    console.log(foo);
  })
  .fail(function(error){
    console.error(error)
  });


console.log('huu')

