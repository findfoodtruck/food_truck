Meteor.publish('allLocations', function() {
  return Locations.find({
    deleted: false
  });
});

Meteor.publish('vendorProfile', function(userId) {
  return VendorProfile.find({
    userId: userId
  })
});
