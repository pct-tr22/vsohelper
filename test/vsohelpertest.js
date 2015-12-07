var assert = require('assert');

var chai = require('chai');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


var Vso = require('../vsohelper').Vso;

var fs = require('fs');
      
describe('Vsohelper', function() {
  var vsoconfig = JSON.parse(fs.readFileSync('./vso.private.json', 'utf8'));

  it('should just echo', function () {
      var opt = {
        username:'foo', password:'bar', serverurl:'https://msn.com', projectname: 'GeneralGit'
        };
      var vsoHelper = new Vso(opt);
   });

  it('should connect', function(){
    var vsoHelper = new Vso(vsoconfig);
  });

  it('connect and not 401', function(done){
    this.timeout(5000)
    var vsoHelper = new Vso(vsoconfig);
    
    var p = vsoHelper.doIt();
    
    p.then(function(result) {
      try {
          p.should.be.fulfilled;
          done();
      }
      catch (e) {
          done(e);
      }
      }).fail(function(error){
        console.error('fail', error);
      });
  });

});






