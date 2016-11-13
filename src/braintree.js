import braintree from 'braintree'

import TransactionController from './controllers/transactionController'
import CustomerController from './controllers/customerController'
import BraintreeService from './services/braintreeService'

import ControllersCollection from './config/controllers'
import RoutesCollection from './config/routes'

/**
 * Plugin setup
 */
class Braintree {

  constructor () {
    this.isDummy = false
    this.context = null
    this.controllers = ControllersCollection
    this.routes = RoutesCollection
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

    if (!config.merchantId || !config.privateKey || !config.privateKey) {
      throw new Error('You must define Braintree configuration before loading the plugin!')
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
    if (!this.context || !this.gateway) return
    this.braintreeService = new BraintreeService(this.context, this.gateway)
  }
}

// Workaround see https://medium.com/@kentcdodds/misunderstanding-es6-modules-upgrading-babel-tears-and-a-solution-ad2d5ab93ce0#.wndli85pv
module.exports = Braintree
