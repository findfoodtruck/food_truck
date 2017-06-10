Meteor.publish('allLocations', function() {
  return Locations.find({});
});
