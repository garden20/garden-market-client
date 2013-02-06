asyncTest( "Get app details", function() {

    expect( 1 );
    garden_market_client.getAppDetails('http://garden20.com/market/details/wiki', function(err, details){
        equal(details.kanso.config.name, 'wiki');
        start();
    });

});