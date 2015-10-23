// http://phonegap-plugins.com/plugins/randdusing/bluetoothle
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('status', 'start');
  // console.log = function(msg){
  //   var _msg = '';
  //   if( (typeof msg) == 'object' ) {
  //     for( key, val in msg) {
  //       _msg += key + ':' + val;
  //       _msg += '\n';
  //     }
  //     msg = _msg;
  //   }
  //   Session.set('status', msg );
  //
  //   return;
  //   var status = Session.get('status');
  //   status += "\n" + msg;
  //   Session.set('status', status );
  // }

  Template.body.helpers({
    status: function() {
      return Session.get('status');
    },
    devices: function() {
      return Session.get('devices');
    }
  });

  Template.body.events({
    'click button#initialize': function() {
      console.log('initialize start');
      var params = {
        request: true,
        statusReceiver: false
      };
      bluetoothle.initialize(function(data){
        console.log('initialize success');
        console.log(data.status);
      }, function(err){
        console.log('initialize err');
        console.log(err);
      }, params);
    },
    'click button#startScan': function() {
      console.log('startScan start');
      var params = null; // An array of service IDs to filter the scan or empty array / null
      bluetoothle.startScan(function(data){
        console.log('startScan success');
        for( var key in data ){
          console.log(data[key]);
        }
      }, function(err){
        console.log('startScan err');
        console.dir(err);
      }, params);
    },
    'click button#stopScan': function() {
      console.log('stopScan start');
      var params = null; // An array of service IDs to filter the scan or empty array / null
      bluetoothle.stopScan(function(data){
        console.log('stopScan success');
        for( var key in data ){
          console.log(key + ':' + data[key]);
        }
      }, function(err){
        console.log('stopScan err');
        console.log(err);
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
