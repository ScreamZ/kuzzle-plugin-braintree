import test from 'ava'

test.todo('BraintreeService should have Promisified instance objects for braintree SDK using bluebird')

test.todo('createOrFindCustomer should return a customer if customer exists')
test.todo('createOrFindCustomer should create a new if customer don\'t exists')
test.todo('createOrFindCustomer should throw an error if trying to create a customer with bad format')
test.todo('createOrFindCustomer should throw an error if network connection is lost')

test.todo('createTransaction should return a Transaction instance')
test.todo('createTransaction should associate a transaction to given customerID')
test.todo('createTransaction should not fail if given customerID is not a string, but cast it into a string')

