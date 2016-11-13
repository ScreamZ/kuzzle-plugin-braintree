"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BraintreeController = function () {
  function BraintreeController(context, braintreeService) {
    _classCallCheck(this, BraintreeController);

    this.context = context;
    this.braintreeService = braintreeService;
  }

  /**
   * Format Kuzzle Response object with custom body.
   *
   * @param requestObject The initial request object for matching
   * @param {object} body The body object, custom data you generated and need to access with the front API
   *
   * @returns {Object}
   */


  _createClass(BraintreeController, [{
    key: "createResponseObject",
    value: function createResponseObject(requestObject, body) {
      return new this.context.constructors.ResponseObject(requestObject, body);
    }
  }]);

  return BraintreeController;
}();

exports.default = BraintreeController;