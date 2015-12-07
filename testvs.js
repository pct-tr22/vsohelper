// var readline = require('readline');
// 
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

var Vso = require('./vsohelper').Vso;

var fs = require('fs');

var vsoconfig = JSON.parse(fs.readFileSync('./vso.private.json', 'utf8'));
var vsoHelper = new Vso(vsoconfig);
vsoHelper.doIt();
console.log('huu')

