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



install(src_db, doc_id, couch_root_url, db_name, options, callback);

  - **src_db*** The url of a couch db, eg 'http://me.cool.com:5984/test', 'http://garden20.com/market/_db'
  - **doc_id** The doc id of the application to install, eg 'bookmarks'
  - **couch_root_url** The couchdb root url that you want to install your app into, eg 'http://localhost:5984'
  - **db_name** the name of the db you want to install your app into. It will be created if it does not exist. eg 'my_bookmarks'
  - **callback** callback function when complete. format: function(err)
  - **options** options controlling the installation.
    - dashboard_db_name: the db to store an installation doc. default is'dashboard',
    - app_details : additional details to store in the installation doc. defaults to {}
    - install_with_no_reader: do not add any reader roles to the db. setting to true makes db public. defaults to false.
    - additional_member_roles: any additional member roles to set on the security object. defaults to [].
    - update_status_function: A function called to indicate install progess. default is function(msg, percent) {},
    - add_vhost_entries: add a vhost entry for the application. default is false.
    - vhost_hostnames: hostnames to used for the vhost entry. eg ['my.domain.com']. default is []
    - vhost_path: the full path to the design doc, eg '/bookmarks/_design/bookmarks/_rewrite/'


Licenece: MIT

