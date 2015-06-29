var assert = require('assert');
var recurly = require('../lib');

describe('fullcube-component-recurly', function() {
  it('provides the setupModels function', function() {
    assert(recurly.setupModels);
  });
});