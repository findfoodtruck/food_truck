Template.map.onCreated(function() {
  var self = this;
  self.subscribe('allLocations');

});
Template.nav.events({
  'click .goOnline': function() {
    var latLng = Geolocation.latLng();
    if (latLng) {
      Meteor.call('addLocation', latLng.lat, latLng.lng);
    } else {
      console.log('locations Not Available');
    }
  },
  'click .goOffline': function() {
    Meteor.call('deleteLocation', Meteor.userId());
  }
});

Template.nav.helpers({
  onlineStatus: function() {
    var loc = Locations.findOne({
      userId: Meteor.userId(),
      deleted: false
    });
    if (loc && !loc.deleted) return true;
    return false;
    //  console.log(loc);
  },
  showButton: function() {
    var latLng = Geolocation.latLng();
    return !!latLng;
  }
});
