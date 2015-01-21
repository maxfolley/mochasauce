var wd = require('wd');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

module.exports = function (desireds) {

  wd.configureHttp({
    timeout: 60000,
    retryDelay: 15000,
    retries: 5
  });

  var self = this;
  before(function(done) {
    this.timeout(60000);

    var browserName = process.env.BROWSER || self.browserName || undefined;
    var desired = {
      browserName: browserName, 
      name: 'example with ' + browserName,
      tags: ['tests']
    };

    var username = process.env.SAUCE_USERNAME;
    var accessKey = process.env.SAUCE_ACCESS_KEY;
    self.browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);
    if(process.env.VERBOSE){
      // optional logging     
      self.browser.on('status', function(info) {
        console.log(info.cyan);
      });
      self.browser.on('command', function(meth, path, data) {
        console.log(' > ' + meth.yellow, path.grey, data || '');
      });            
    }

    self.browser
      .init(desired)
      .nodeify(done);
  });

}; 

/*
describe('mocha spec examples', function () {
  this.timeout(60000);
  var browser;

  it("should get home page", function (done) {
    browser
      .get("http://wk.com/")
      .title()
      .should.become("Wieden+Kennedy | Full Service Integrated Advertising Agency")
      .nodeify(done);
  });

});
*/
