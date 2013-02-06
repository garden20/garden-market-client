var assert = require("assert"),
    requireMock = require("requiremock")(__filename);



var market = require("../garden-market-client.js");



describe('Get App Details', function(){
    it('gives the details for a remote url', function(done){
        market.getAppDetails('http://garden20.com/market/details/wiki', function(err, details){
            assert.ifError(err);
            assert.equal(details.kanso.config.name, 'wiki');
            done();
        });
    });
});


describe('List all apps', function(){
    it('lists app name, version and url', function(done){
        market.listApps('http://garden20.com/market', function(err, apps){
            assert.ifError(err);
            assert.notEqual(apps.length, 0, 'Returned apps');
            apps.forEach(function(app){
                assert.ok(app.name);
                assert.ok(app.version);
                assert.equal(app.url, 'http://garden20.com/market/details/' + app.name);
            });
            done();
        });
    });

    it('respects the limit option', function(done){
        market.listApps('http://garden20.com/market', {limit: 1}, function(err, apps){
            assert.ifError(err);
            assert.equal(apps.length, 1);
            done();
        });
    });
});

describe('Only list specified apps', function(){
    it('lists app name, version and url of specified apps', function(done){
        market.listApps('http://garden20.com/market', { apps: ['wiki', 'bookmarks']  },function(err, apps){
            assert.ifError(err);
            assert.equal(apps.length, 2);
            done();
        });
    });
});