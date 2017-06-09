Meteor.publish('allLocations', function() {
  return Locations.find({
    deleted: false
  });
});
