var loopback = require('loopback');
var path = require('path');
var _ = require('lodash');

exports.setupModels = function(app, options) {

  // Create a Recurly datasource.
  var ds = loopback.createDataSource({
    connector: 'rest',
    debug: true,
    baseURL: 'https://api.recurly.com/v2/',
    headers: {
      'Accept': 'application/xml',
      'Content-Type': 'application/xml; charset=utf-8',
      'Authorization': 'Basic ' + (new Buffer(options.apiKey + ':', 'ascii')).toString('base64')
    },
  });

  // Register the Recurly models.
  var models = {
    'account': {
      'definition': 'recurly-account.json',
      'modelName': 'RecurlyAccount'
    },
    'billing': {
      'definition': 'recurly-billing-info.json',
      'modelName': 'RecurlyBillingInfo'
    },
    'coupon': {
      'definition': 'recurly-coupon.json',
      'modelName': 'RecurlyCoupon'
    },
    'invoice': {
      'definition': 'recurly-invoice.json',
      'modelName': 'RecurlyInvoice'
    },
    'plan': {
      'definition': 'recurly-plan.json',
      'modelName': 'RecurlyPlan'
    },
    'subscription': {
      'definition': 'recurly-subscription.json',
      'modelName': 'RecurlySubscription'
    },
    'transaction': {
      'definition': 'recurly-transaction.json',
      'modelName': 'RecurlyTransaction'
    }
  };

  _.forEach(models, function(settings) {
    var model = require(path.join(__dirname, 'models', settings.definition));
    var Model = ds.createModel(options.prefix + settings.modelName, model.properties, model);
    Model.disableRemoteMethod('count', true);
    Model.disableRemoteMethod('exists', true);
    app.model(Model);
  });
};
