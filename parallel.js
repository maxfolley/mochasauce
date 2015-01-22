var exec = require('child_process').exec
var spawn = require('child_process').spawn
var Q = require('q');
var _ = require('lodash');

function log(config, data) {
  config = (config + '          ').slice(0, 10);
  _(('' + data).split(/(\r?\n)/g)).each(function(line) {        
    if(line.replace(/\033\[[0-9;]*m/g,'').trim().length >0) { 
      console.log(config + ': ' + line.trimRight() );
    }
  });
}

function runMocha(desired, done) {
  process.env.BROWSER = desired.browserName;
  var mocha = exec('./node_modules/.bin/mocha --colors --timeout 60000 --reporter spec', function (error, stdout, stderr) {
    console.log("❑", desired.browserName)
    console.log(stdout);
    console.log(stderr);
  });
  /*
  mocha.stdout.on('data', log.bind(null, browser));
  mocha.stderr.on('data', log.bind(null, browser));
  */
}


var parallel = {
  test: function (desireds) {
    if (!_.isArray(desireds) || desireds.length === 0) {
      console.warn("Desireds must be an array!");
      return; 
    }

    desireds.forEach(function (item, index) {
      Q.nfcall(runMocha, item)
    });

  }
};
module.exports = parallel; 
