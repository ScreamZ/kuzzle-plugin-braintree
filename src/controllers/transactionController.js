import BraintreeController from './braintreeController'

class TransactionController extends BraintreeController {
  generateClientToken (req) {
    return this.clientToken.generateAsync({})
      .then(res => this.createResponseObject(req, res))
  }

  /**
   * Initiate a checkout action with user data and transaction informations.
   *
   * @param req
   * @param context
   *
   * @returns {Promise.<Object>}
   */
  checkout (req, context) {
    const nonceFromTheClient = req.data.body.payment_method_nonce
    const currentUserID = context.token.userId
    // const basketID = req.data.body.basket_id

    // TODO : Fetch basket

    // TODO : Do the aggregation of price sum
    const transactionAmount = 19

    // Anonymous transaction
    if (currentUserID === -1) {
      return this.braintreeService.createTransaction(transactionAmount, nonceFromTheClient)
        .then(res => this.createResponseObject(req, res))
        .catch(err => this.createResponseObject(req, err))
    }

    // User Identified transaction
    return this.braintreeService.findOrCreateCustomer(currentUserID)
      .then(customer => this.braintreeService.createTransaction(transactionAmount, nonceFromTheClient, customer.id))
      .then(transactionResult => this.createResponseObject(req, transactionResult))

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
  searchTransactions (req, context) {
    return Promise.resolve(this.createResponseObject(req, { 'status': 'NOT_IMPLEMENTED_YET' }))
  }
}

export default TransactionController
