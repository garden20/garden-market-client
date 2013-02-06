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


