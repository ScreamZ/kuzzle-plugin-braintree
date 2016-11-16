'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _braintreeController = require('./braintreeController');

var _braintreeController2 = _interopRequireDefault(_braintreeController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransactionController = function (_BraintreeController) {
  _inherits(TransactionController, _BraintreeController);

  function TransactionController() {
    _classCallCheck(this, TransactionController);

    return _possibleConstructorReturn(this, (TransactionController.__proto__ || Object.getPrototypeOf(TransactionController)).apply(this, arguments));
  }

  _createClass(TransactionController, [{
    key: 'generateClientToken',
    value: function generateClientToken(req) {
      var _this2 = this;

      return this.braintreeService.clientToken.generateAsync({}).then(function (res) {
        return _this2.createResponseObject(req, res);
      });
    }

    /**
     * Initiate a checkout action with user data and transaction informations.
     *
     * @param req
     * @param context
     *
     * @returns {Promise.<Object>}
     */

  }, {
    key: 'checkout',
    value: function checkout(req, context) {
      var _this3 = this;

      var nonceFromTheClient = req.data.body.payment_method_nonce;
      var currentUserID = context.token.userId;
      // const basketID = req.data.body.basket_id

      // TODO : Fetch basket

      // TODO : Do the aggregation of price sum
      var transactionAmount = 19;

      // Anonymous transaction
      if (currentUserID === -1) {
        return this.braintreeService.createTransaction(transactionAmount, nonceFromTheClient).then(function (res) {
          return _this3.createResponseObject(req, res);
        }).catch(function (err) {
          return _this3.createResponseObject(req, err);
        });
      }

      // User Identified transaction
      return this.braintreeService.findOrCreateCustomer(currentUserID).then(function (customer) {
        return _this3.braintreeService.createTransaction(transactionAmount, nonceFromTheClient, customer.id);
      }).then(function (transactionResult) {
        return _this3.createResponseObject(req, transactionResult);
      });

      // TODO BIS : Add possibility to save user payment information
    }

    /**
     * Proceed to a search in braintree to find transactions matching filters.
     *
     * **Securing this method with ACL is highly recommanded**
     *
     * @param req
     * @param context
     * @returns {Promise.<Object>}
     */

  }, {
    key: 'searchTransactions',
    value: function searchTransactions(req, context) {
      return Promise.resolve(this.createResponseObject(req, { 'status': 'NOT_IMPLEMENTED_YET' }));
    }
  }]);

  return TransactionController;
}(_braintreeController2.default);

exports.default = TransactionController;