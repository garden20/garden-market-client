(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory( require('async'), require('request'), require('url'));
    } else if (typeof define === 'function' && define.amd) {
        define(['async', 'reqwest', 'url'],factory);
    } else {
        root.garden_market_client = factory(root.async, root.reqwest, root.url);
    }
}(this, function (async, request, url) {

var app = {};

app.getAppDetails = function(app_url, callback) {
    var json_path = url.resolve(app_url + '/', 'json');
    handleRequest(json_path, { jsonp: true },  callback);
};


app.listApps = function(market_url, options, callback) {
    if (!callback) {
        callback = options;
        options = {};
    }

    var full_url = url.resolve(market_url + '/',  '_db/_design/market/_list/app_versions/apps'),
        parsed_url = url.parse(full_url);

    parsed_url.query = {};
    if (options.limit) parsed_url.query.limit = options.limit;
    if (options.apps) {
        var query = [];
        options.apps.forEach(function(app){
            query.push([app]);
        });
        parsed_url.query.keys = query;
    }


    handleRequest(url.format(parsed_url), { jsonp: true },  function(err, data){
        if (err) return callback(err);
        var apps = Object.keys(data);
        async.map(apps, function(app, cb){
            cb(null, {
                name : app,
                version : data[app],
                url : url.resolve(market_url + '/', 'details/' + app)
            });
        }, callback);
    });

};


function handleRequest(url, options, callback) {
    if (!callback) {
        callback = options;
        options = {};
    }
    if (typeof window === 'undefined') handleRequestNode(url, options, callback);
    else handleRequestBrowser(url, options, callback);
}

function handleRequestBrowser(r_url, options, callback) {
    var parsed_url = url.parse(r_url),
        type = 'json';

    if (options.jsonp) {
        type = 'jsonp';
        if (parsed_url.query) parsed_url.query += '&callback=?';
        else parsed_url.query = 'callback=?';
    }
    var full_url = url.format(parsed_url);

    request({
        url: full_url,
        type: type,
        success: function (resp) {
          callback(null, resp);
        },
        error : callback
    });
}

function handleRequestNode(r_url, options, callback) {
    var req = {
            url : r_url,
            json: true
    };
    request(req, function(err, response, body){
        callback(err, body);
    });
}


if (request.test) return app;
else return {
    getAppDetails : app.getAppDetails,
    listApps : app.listApps
};

}));