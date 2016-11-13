'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _braintree = require('braintree');

var _braintree2 = _interopRequireDefault(_braintree);

var _transactionController = require('./controllers/transactionController');

var _transactionController2 = _interopRequireDefault(_transactionController);

var _customerController = require('./controllers/customerController');

var _customerController2 = _interopRequireDefault(_customerController);

var _braintreeService = require('./services/braintreeService');

var _braintreeService2 = _interopRequireDefault(_braintreeService);

var _controllers = require('./config/controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _routes = require('./config/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Plugin setup
 */
var Braintree = function () {
  function Braintree() {
    _classCallCheck(this, Braintree);

    this.isDummy = false;
    this.context = null;
    this.controllers = _controllers2.default;
    this.routes = _routes2.default;
  }

  /**
   * Plugin entry point, expose controllers and routes.
   *
   * @param config
   * @param context
   * @param isDummy
   */


  _createClass(Braintree, [{
    key: 'init',
    value: function init(config, context, isDummy) {
      config = {
        isSandbox: true,
        merchantId: '4ddhg8rwq2hzsjk4',
        publicKey: 'n6hzj76hshx46z3z',
        privateKey: '24c6ceffc07d027a9dcceeb32a015852'
      };

      if (!config.merchantId || !config.privateKey || !config.privateKey) {
        throw new Error('You must define Braintree configuration before loading the plugin!');
      }
      this.context = context;

      this.gateway = _braintree2.default.connect({
        environment: config.isSandbox ? _braintree2.default.Environment.Sandbox : _braintree2.default.Environment.Sandbox, // TODO update
        merchantId: config.merchantId,
        publicKey: config.publicKey,
        privateKey: config.privateKey
      });

      this.initServices();

      return this;
    }
  }, {
    key: 'TransactionController',
    value: function TransactionController() {
      return new _transactionController2.default(this.context, this.braintreeService);
    }
  }, {
    key: 'CustomerController',
    value: function CustomerController() {
      return new _customerController2.default(this.context, this.braintreeService);
    }

    /**
     * Init services thats will be injected into the application
     */

  }, {
    key: 'initServices',
    value: function initServices() {
      if (!this.context || !this.gateway) return;
      this.braintreeService = new _braintreeService2.default(this.context, this.gateway);
    }
  }]);

  return Braintree;
}();

// Workaround see https://medium.com/@kentcdodds/misunderstanding-es6-modules-upgrading-babel-tears-and-a-solution-ad2d5ab93ce0#.wndli85pv


module.exports = Braintree;