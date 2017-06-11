Template.nav.events({
  'click .goOnline': function() {
    var latLng = Geolocation.latLng();
    console.log(latLng);
    if (latLng) {
      Meteor.call('addLocation', latLng, (result, error) => {
        if (result) console.log('addLocation : ' + result);
        if (error) console.error('akm: ' + error);
      });
      Session.set('onlineStatus', true);
    } else {
      console.log('locations NA');
    }
  },
  'click .goOffline': function() {
    Session.set('onlineStatus', false);
    console.log('going offline');
    Meteor.call('deleteLocation', Meteor.userId());
  }
});

Template.nav.helpers({
  onlineStatus: function() {
    return Session.get('onlineStatus');
  }
});
