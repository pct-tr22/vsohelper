var assert = require('assert');

var chai = require('chai');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = require('chai').expect;

var Vso = require('../vsohelper').Vso;

var fs = require('fs');
      
describe('Vsohelper', function() {
  var vsoconfig = JSON.parse(fs.readFileSync('./vso.private.json', 'utf8'));

  it('should just echo', function () {
      var opt = {
        username:'foo', password:'bar', serverurl:'https://msn.com', projectname: 'GeneralGit', buildname: 'foo'
        };
      var vsoHelper = new Vso(opt);
   });

  it('should connect', function(){
    var vsoHelper = new Vso(vsoconfig);
  });

  var lastBuild;

  it('connect and queue a build', function(done){
    this.timeout(5000)
    var vsoHelper = new Vso(vsoconfig);
    
    var p = vsoHelper.doIt('gitlab1');
    
    p.then(function(result) {
      try {
          p.should.be.fulfilled;
          lastBuild = result;
          expect(result).to.have.property('id');
          done();
      }
      catch (e) {
          done(e);
      }
      }).fail(function(error){
        console.error('fail', error);
      });
  });

  it('connect and get build status', function(done){
    this.timeout(5000)
    var vsoHelper = new Vso(vsoconfig);
    expect(lastBuild).to.have.property('id');
        
    var p = vsoHelper.getBuildStatus(lastBuild);

    p.then(function(result) {
      try {
          p.should.be.fulfilled;
          expect(result).to.have.property('id');
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






