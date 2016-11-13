'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{ verb: 'get', url: '/client-token', controller: 'braintree', action: 'generateClientToken' }, { verb: 'post', url: '/checkout', controller: 'braintree', action: 'checkout' }];