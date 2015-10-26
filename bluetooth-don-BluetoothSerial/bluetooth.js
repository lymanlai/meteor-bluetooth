// https://github.com/don/BluetoothSerial
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('status', 'start');
  console.log = function(msg){
    Session.set('status', msg );

    return;
    var status = Session.get('status');
    status += "\n" + msg;
    Session.set('status', status );
  }

  Template.body.helpers({
    status: function() {
      return Session.get('status');
    },
    devices: function() {
      return Session.get('devices');
    }
  });

  Template.body.events({
    'click button#isConnected': function() {
      bluetoothSerial.isConnected(
        function() {
          console.log("Bluetooth is connected");
        },
        function() {
          console.log("Bluetooth is *not* connected");
        }
      );
    },
    'click button#isEnabled': function() {
      bluetoothSerial.isEnabled(
        function() {
          console.log("Bluetooth is enabled");
        },
        function() {
          console.log("Bluetooth is *not* enabled");
        }
      );
    },
    'click button#enable': function() {
      console.log('enable start');
      bluetoothSerial.enable(
        function() {
          console.log("Bluetooth is enabled");
        },
        function() {
          console.log("The user did *not* enable Bluetooth");
        }
      );
    },
    'click button#discoverUnpaired': function() {
      console.log('discoverUnpaired start');
      bluetoothSerial.discoverUnpaired(function(devices) {
        console.log(devices.length);
        console.log('list devices from discoverUnpaired');
        Session.set('devices', devices);
      }, function(){
        console.log('discoverUnpaired failed');
      });
    },
    'click button#connect': function() {
      console.log('connect start');
      var macAddress_or_uuid = '00:4D:32:01:B6:D0';
      bluetoothSerial.connect(macAddress_or_uuid, function() {
        console.log('connect success');
        console.log(arguments);
      }, function(){
        console.log('connect failed');
        console.log(arguments[0]);
        console.log(arguments[1]);
        console.log(arguments[2]);
      });
    },

    'click button#list': function() {
      console.log('list start');
      bluetoothSerial.list(function(devices) {
        console.log('list devices from list');
        Session.set('devices', devices);
      }, function(err) {
        Session.set('err', err);
        console.log(err);
      });
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}
