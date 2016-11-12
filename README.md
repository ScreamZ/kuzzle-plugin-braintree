<h1 align="center">
  Kuzzle Plugin Braintree
  <br>
  <br>
</h1>

<h4 align="center">Use payment in your app and scale well!</h4>

<p align="center">
  <a href="https://github.com/feross/standard"><img src="https://cdn.rawgit.com/feross/standard/master/badge.svg" alt="Standard - JavaScript Style Guide"></a>
</p>
<br>

Simple install, map you data to handle every transaction and start stacking money in a very easy way!

- **Multiple payment support.** Customers can pay using Paypal, Credit-Card, Android Pay, Apple Pay...
- **Braintree.** Awesome payment solution and secure. Save your customers in vault.

# Requirements

- **<a href="https://github.com/kuzzleio/kuzzle"><img height="50" src="http://kuzzle.io/themes/kuzzleio/images/kuzzle-logo-blue-500.png" alt="Kuzzle">Kuzzle</a>.** > 1.0.0
- **Braintree account.** To access the sandbox environment and then the production.


# Configuration

At the initialisation the plugin will search for configuration indexes in elastic in order to store data and transactions.

# Documentation

## Global workflow (Paypal use case)

The client generate a token and a paypalInstance, then it talk with braintree and paypal to obtain a payment nonce.

Once done, the user talk to kuzzle with this payment nonce and the shopping basket ID. Kuzzle will internally fetch the document and access the value of the field configured
in option to validate the transaction. Once done, it generate a transaction in the transaction index with the current connected userID, the braintree transaction ID, allowing
you to make calls to the braintree API using method X to fetch transaction status

If not user is connected while calling checkout, it create a anonymous transaction (not related to someone).

If user is connected, the transaction will be added to existing user if found, otherwise it will create it will using the kuzzleID as ID, note that you can pass a customer
`customer` key to fill user information at create, or you can update it later. 

Please read the braintree documentation for technical terms.

You first need to generate a client, this one is identified by a token, you can generate it for the first time, or 
## Generate client token

**Action :**
```JSON
{controller: 'kuzzle-plugin-braintree/braintree', action: 'generateClientToken'}
```

**Result :**

```json
{clientToken: somehash}
```

# Security consideration

Some controller methods must be accessible only by the admin