(function( $ ) {

module( "Connect / Disconnect" );

var mqtt = AeroGear.Notifier({
    name: "mqtt",
    type: "mqttws",
    settings: {
        connectURL: "ws://localhost:8081/",
        clientId: "clientId-cxz12Opwex"
    }
}).clients.mqtt;

asyncTest( "Connect to and Disconnect from MQTT Server", function() {
    expect( 1 );

    mqtt.connect({
        onConnect: function() {
            mqtt.disconnect();
            ok( true, "Successfully connected to remote MQTT service over websocket" );
            start();
        },
        onConnectError: function() {
            console.log( 'Connection error' );
        }
    });
});

module( "Messaging" );

asyncTest( "Subscribe and Send / Receive Message", function() {
    expect( 2 );

    mqtt.connect({
        onConnect: function() {
            mqtt.subscribe({
                address: "/topic/test",
                subscribeOptions: {
                    onSuccess: function() {
                        ok( true, "successful subscription" );
                        mqtt.send("/topic/test", "test message");
                    }
                }
            });
        },
        onMessage: function( message ) {
            mqtt.disconnect();
            ok( message.payloadString === "test message", "Test message received" );
            start();
        }
    });
});

})( jQuery );
