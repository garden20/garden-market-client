asyncTest( "Get app details", function() {
    expect( 1 );
    garden_market_client.getAppDetails('http://garden20.com/market/details/wiki', function(err, details){
        equal(details.kanso.config.name, 'wiki');
        start();
    });
});


asyncTest( "List all apps", function() {
    expect( 1 );
    garden_market_client.listApps('http://garden20.com/market', function(err, apps){
        notEqual(apps.length, 0);
        start();
    });
});