'use strict'

const braintree = require('braintree')
const BraintreeController = require('./controllers/braintreeController')
const ControllersCollection = require('./config/controllers')
const RoutesCollections = require('./config/routes')

/**
 * Plugin setup
 */
class Braintree {

  constructor () {
    this.isDummy = false
    this.context = null
    this.controllers = ControllersCollection
    this.routes = RoutesCollections
  }

  /**
   * Plugin entry point, expose controllers and routes.
   *
   * @param config
   * @param context
   * @param isDummy
   */
  init (config, context, isDummy) {
    config = {
      isSandbox: true,
      merchantId: '4ddhg8rwq2hzsjk4',
      publicKey: 'n6hzj76hshx46z3z',
      privateKey: '24c6ceffc07d027a9dcceeb32a015852'
    }
    this.context = context

    this.gateway = braintree.connect({
      environment: config.isSandbox ? braintree.Environment.Sandbox : braintree.Environment.Sandbox, // TODO update
      merchantId: config.merchantId,
      publicKey: config.publicKey,
      privateKey: config.privateKey
    })

    return this
  }

  BraintreeController () {
    return new BraintreeController(this.context, this.gateway)
  }

}

module.exports = Braintree
