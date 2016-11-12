'use strict'

const braintree = require('braintree')
const TransactionController = require('./controllers/transactionController')
const CustomerController = require('./controllers/customerController')
const ControllersCollection = require('./config/controllers')
const RoutesCollections = require('./config/routes')

const BraintreeService = require('./services/braintreeService')

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

    this.initServices()

    return this
  }

  TransactionController () {
    return new TransactionController(this.context, this.braintreeService)
  }

  CustomerController () {
    return new CustomerController(this.context, this.braintreeService)
  }

  /**
   * Init services thats will be injected into the application
   */
  initServices () {
    this.braintreeService = new BraintreeService(this.context, this.gateway)
  }
}

module.exports = Braintree
