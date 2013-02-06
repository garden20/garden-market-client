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
    getAppDetails : app.getAppDetails
};

}));