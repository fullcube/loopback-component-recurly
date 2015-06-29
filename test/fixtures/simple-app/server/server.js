var loopback = require('loopback');
var boot = require('loopback-boot');
var explorer = require('loopback-explorer');
var app = module.exports = loopback();

// Set up promise support for loopback in non-ES6 runtime environment.
global.Promise = require('bluebird');

// Initialize the Recurly connector.
var recurly = require('../../../../lib');

recurly.setupModels(app, {
  apiKey: process.env.RECURLY_API_KEY_1,
  prefix: 'Account1'
});

recurly.setupModels(app, {
  apiKey: process.env.RECURLY_API_KEY_2,
  prefix: 'Account2'
});

app.use('/explorer', explorer(app, {basePath: '/api'}));
app.use('/api', loopback.rest());
app.use(loopback.urlNotFound());

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;
  
  // start the server if `$ node server.js`
  if (require.main === module) {
     app.listen();
  }
});
