'use strict'

const bluebird = require('bluebird')

class BraintreeService {

  constructor (kuzzleContext, gateway) {
    this.kuzzleContext = kuzzleContext
    this.transaction = bluebird.promisifyAll(gateway.transaction)
    this.clientToken = bluebird.promisifyAll(gateway.clientToken)
    this.customer = bluebird.promisifyAll(gateway.customer)
  }

  findOrCreateCustomer (customerID) {
    return this.customer.findAsync(customerID.toString())
      .catch(() => {
        // If not found, create a new customer
        return this.customer.createAsync({
          id: customerID.toString()
        })
      })
  }

  createTransaction (amount, paymentMethodNonce, customerID) {
    return this.transaction.saleAsync({
      amount: amount,
      customerId: customerID,
      paymentMethodNonce: paymentMethodNonce,
      options: {
        submitForSettlement: true
      }
    })
  }
}

module.exports = BraintreeService
