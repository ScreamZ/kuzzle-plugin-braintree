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

Please read the braintree documentation for technical terms.

You first need to generate a client, this one is identified by a token, you can generate it for the first time, or 
## Generate client token

**Action :**
```json
{controller: 'kuzzle-plugin-braintree/braintree', action: 'generateClientToken'}
```

**Result :**

```json
{clientToken: somehash}
```