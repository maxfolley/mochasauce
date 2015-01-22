var wd = require('wd');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

module.exports = function () {

  wd.configureHttp({
    timeout: 60000,
    retryDelay: 15000,
    retries: 5
  });

  this.init = function (done, browserName) {
    var browserName = browserName || process.env.BROWSER;
    var desired = {
      browserName: browserName, 
      name: 'example with ' + browserName,
      tags: ['tests']
    };

    var username = process.env.SAUCE_USERNAME;
    var accessKey = process.env.SAUCE_ACCESS_KEY;

    var browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);
    if (process.env.VERBOSE){
      // optional logging     
      browser.on('status', function(info) {
        console.log(info.cyan);
      });
      browser.on('command', function(meth, path, data) {
        console.log(' > ' + meth.yellow, path.grey, data || '');
      });            
    }

    browser
      .init(desired)
      .nodeify(done);

    return browser;
  };
  return this

}(); 

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
