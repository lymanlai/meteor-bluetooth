Devices = new Mongo.Collection(null); // client only
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('status', 'start');

  function addDevice(address, name) {
    var isExist = Devices.findOne({address: address});
    if(isExist){
      return;
    }

    if( !name ){
      return;
    }

    if( name.substr(0, 2) != 'BP' ){
      return;
    }

    Devices.insert({address: address, name: name});
    return;
  }

  var logger = function(msg) {
    var _msg = '';
    if (_.isObject(msg)) {
      _.each(msg, function(value, key, list) {
        _msg += key + ':' + value + '\n';
      });
      msg = _msg;
    }

    var status = Session.get('status');
    status = '\n' + msg + '\n' + status + '\n';
    Session.set('status', status);
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
    'click button.clear': clear,
    'click button#isConnected': function() {
      bluetoothSerial.isConnected(
        function() {
          logger("Bluetooth is connected");
        },
        function() {
          logger("Bluetooth is *not* connected");
        }
      );
    },
    'click button#isEnabled': function() {
      bluetoothSerial.isEnabled(
        function() {
          logger("Bluetooth is enabled");
        },
        function() {
          logger("Bluetooth is *not* enabled");
        }
      );
    },
    'click button#enable': function() {
      logger('enable start');
      bluetoothSerial.enable(
        function() {
          logger("Bluetooth is enabled");
        },
        function() {
          logger("The user did *not* enable Bluetooth");
        }
      );
    },
    'click button#discoverUnpaired': function() {
      logger('discoverUnpaired start');
      bluetoothSerial.discoverUnpaired(function(devices) {
        logger('list devices from discoverUnpaired');
        logger(devices.length);
        logger(devices);
      }, function(){
        logger('discoverUnpaired failed');
      });
    },
    'click button#connect': function() {
      logger('connect start');
      var macAddress_or_uuid = '00:4D:32:01:B6:D0';
      bluetoothSerial.connect(macAddress_or_uuid, function() {
        logger('connect success');
        logger(arguments);
      }, function(){
        logger('connect failed');
        logger(arguments[0]);
        logger(arguments[1]);
        logger(arguments[2]);
      });
    },

    'click button#list': function() {
      logger('list start');
      bluetoothSerial.list(function(devices) {
        logger('list devices from list');
        logger(arguments.length);
        logger('end list');
      }, function(err) {
        logger(err);
      });
    }
  });

  function clear() {
    Session.set('status', '');
  }

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}
