var
  chai = require('chai'),
  MochaSauce = require('../index');

var
  expect = chai.expect,
  should = chai.should;

var mochaSauce = new MochaSauce({
  firefox: {browserName: 'firefox'},
  chrome: {browserName: 'chrome'},
  explorer: {browserName: 'internet explorer'}
});
mochaSauce.browserName = 'chrome'

describe("browser", function () {

  it("is defined", function () {
    expect(mochaSauce.browser).not.to.be.an('undefined');
  });

  it("sets wd browserName", function () {
    mochaSauce.browser.sessionCapabilities().should.eventually.have.property('browserName', 'chrome');
  });

});
