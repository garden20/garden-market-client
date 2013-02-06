Garden-Market-Client
===========

Small client api to interact with a garden market. Use in node, requirejs, and browser global.

[![Build Status](https://secure.travis-ci.org/garden20/garden-market-client.png)](http://travis-ci.org/garden20/garden-market-client)


Node Installation
----------

```npm install garden-market-client```


Jam (requirejs) Usage
---------------------

```jam install garden-market-client```


Browser Global
--------------

```
  <script src="async.min.js" type="text/javascript"></script>
  <script src="reqwest.min.js" type="text/javascript"></script>
  <script src="url.js" type="text/javascript"></script>
  <script src="garden-market-client.js" type="text/javascript"></script>

```
You can find browser versions of the above in test/qunit/assets/*.js


API
---

listApps(market_url, options, callback);

  - **market_url** the url to the market, eg 'http://garden20.com/market'
  - **options** not requried, but an object controlling what is returned
    - limit: the limit of items returned
    - apps: an array of app names to limit to. Good for finding current version
  - **callback** callback function when complete. format: function(err, details)

```
garden_market_client.listApps('http://garden20.com/market', function(err, details){

});
```


getAppDetails(app_url, callback);

  - **app_url** the url to the app details page, eg 'http://garden20.com/market/details/wiki'
  - **callback** callback function when complete. format: function(err, details)

```
garden_market_client.getAppDetails('http://garden20.com/market/details/wiki', function(err, details){

});
```



Licenece: MIT

