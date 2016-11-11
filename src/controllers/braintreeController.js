'use strict'

class BraintreeController {

  constructor (context, gateway) {
    this.context = context
    this.gateway = gateway
  }

  createResponseObject (requestObject, body) {
    return new this.context.constructors.ResponseObject(requestObject, body)
  }

  generateClientToken (req) {

    const tokenGeneration = new Promise((resolve, reject) => {
      this.gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          reject(err)
        }
        resolve(response)
      });
    });

    return tokenGeneration
      .then(res => this.createResponseObject(req, res))
  }

  checkout (req, context) {
    const nonceFromTheClient = req.data.body.payment_method_nonce;
    const userID = ''

    return Promise.resolve(this.createResponseObject(req, context))

    const sale = new Promise((resolve, reject) => {
      this.gateway.transaction.sale({
        amount: "15.00",
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
        if (err) {
          reject(err)
        }
        resolve(result)
      });
    })

    return sale
      .then(res => this.createResponseObject(req, res))
      .catch(err => this.createResponseObject(req, err))
  }
}

module.exports = BraintreeController