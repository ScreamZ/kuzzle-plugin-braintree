'use strict'

class BraintreeController {

  constructor (context, braintreeService) {
    this.context = context
    this.braintreeService = braintreeService
  }

  /**
   * Format Kuzzle Response object with custom body.
   *
   * @param requestObject The initial request object for matching
   * @param {object} body The body object, custom data you generated and need to access with the front API
   *
   * @returns {Object}
   */
  createResponseObject (requestObject, body) {
    return new this.context.constructors.ResponseObject(requestObject, body)
  }
}

module.exports = BraintreeController
