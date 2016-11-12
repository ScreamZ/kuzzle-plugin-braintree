import test from 'ava'
import Braintree from '../src/braintree'
import TransactionController from '../src/controllers/transactionController'
import CustomerController from '../src/controllers/customerController'
import BraintreeService from '../src/services/braintreeService'

const braintree = new Braintree()
braintree.init({}, {}, true)

// Can't work during devlopment
test.todo('The plugin must throw an error if main config is missing')

test('The plugin must expose controllers and routes', t => {
  t.not(braintree.controllers, undefined)
  t.not(braintree.routes, undefined)
})

test('The plugin should expose Transaction controller', t => {
  t.not(braintree.TransactionController, undefined)
  t.true(braintree.TransactionController() instanceof TransactionController)
})

test('The plugin should expose Customer controller', t => {
  t.not(braintree.CustomerController, undefined)
  t.true(braintree.CustomerController() instanceof CustomerController)
})

test('Init service method should instantiate the braintree service', t => {
  t.not(braintree.braintreeService, undefined)
  t.true(braintree.braintreeService instanceof BraintreeService)
})

test('Init should expose braintree gateway', t => {
  t.not(braintree.gateway, undefined)
})
