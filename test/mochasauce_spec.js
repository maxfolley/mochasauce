var
  chai = require('chai'),
  mochasauce = require('../index');

var
  expect = chai.expect,
  should = chai.should;

describe("browser", function () {

  var browser;
  before(function(done) {
    browser = mochasauce.init(done, 'chrome');
  });

  it("is defined", function () {
    expect(browser).not.to.be.an('undefined');
  });

  it("sets wd browserName", function () {
    browser.sessionCapabilities().should.eventually.have.property('browserName', 'chrome');
  });

});

describe("env", function () {

  it("uses env.BROWSER", function (done) {
    process.env.BROWSER = "internet explorer";
    var browser = mochasauce.init(done); 
    browser.sessionCapabilities().should.eventually.have.property('browserName', 'internet explorer');
  });

  it("overrides env.BROWSER with parameter", function (done) {
    process.env.BROWSER = "internet explorer";
    var browser = mochasauce.init(done, 'chrome'); 
    browser.sessionCapabilities().should.eventually.have.property('browserName', 'chrome');
  });

});
