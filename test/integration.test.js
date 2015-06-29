var loopback = require('loopback');
var lt = require('loopback-testing');
var path = require('path');
var SIMPLE_APP = path.join(__dirname, 'fixtures', 'simple-app');
var app = require(path.join(SIMPLE_APP, 'server/server.js'));
var assert= require('assert');

// Prepare a sample app.
lt.beforeEach.withApp(app);

if (!process.env.RECURLY_API_KEY_1 || !process.env.RECURLY_API_KEY_2) {
  console.error('Please set RECURLY_API_KEY_1 and RECURLY_API_KEY_2.')
  process.exit(1);
}

describe('model setup', function () {

  it('should define the Recurly models.', function (done) {
    assert(app.models.Account1RecurlyAccount);
    assert(app.models.Account2RecurlyAccount);
    done();
  });

  // it('can use an alternaive Base URL.', function (done) {
  //   var connection = app.models.RecurlyTransaction.getConnector();
  //   connection._resources.RecurlyTransaction._url = 'http://ssss/';
  //   app.models.RecurlyTransaction.findById('2fa59e2b0e89e28395e6a6402b989a60',function (err, transaction) {
  //     done(err);
  //   });
  // });

  it('can set up additional recuely models.', function (done) {
    var recurly = require('../lib');
    recurly.setupModels(app, {
      apiKey: '7c919d08675a4316aa80403fb97b9172',
      prefix: 'Account3'
    });
    recurly.setupModels(app, {
      apiKey: '7c919d08675a4316aa80403fb97b9172',
      prefix: 'Account4'
    });

    assert(app.models.Account4RecurlyAccount);
    assert(app.models.Account4RecurlyAccount);
    done();

  });

});
