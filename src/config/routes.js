export default [
  { verb: 'get', url: '/client-token', controller: 'braintree', action: 'generateClientToken' },
  { verb: 'post', url: '/checkout', controller: 'braintree', action: 'checkout' }
]
