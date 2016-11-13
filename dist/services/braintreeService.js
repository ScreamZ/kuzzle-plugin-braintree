'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BraintreeService = function () {
  function BraintreeService(kuzzleContext, gateway) {
    _classCallCheck(this, BraintreeService);

    this.kuzzleContext = kuzzleContext;
    this.transaction = _bluebird2.default.promisifyAll(gateway.transaction);
    this.clientToken = _bluebird2.default.promisifyAll(gateway.clientToken);
    this.customer = _bluebird2.default.promisifyAll(gateway.customer);
  }

  _createClass(BraintreeService, [{
    key: 'findOrCreateCustomer',
    value: function findOrCreateCustomer(customerID) {
      var _this = this;

      return this.customer.findAsync(customerID.toString()).catch(function () {
        // If not found, create a new customer
        return _this.customer.createAsync({
          id: customerID.toString()
        });
      });
    }
  }, {
    key: 'createTransaction',
    value: function createTransaction(amount, paymentMethodNonce) {
      var customerID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      return this.transaction.saleAsync({
        amount: amount,
        customerId: customerID,
        paymentMethodNonce: paymentMethodNonce,
        options: {
          submitForSettlement: true
        }
      });
    }
  }]);

  return BraintreeService;
}();

exports.default = BraintreeService;