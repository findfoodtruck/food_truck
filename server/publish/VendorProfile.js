Meteor.publish('vendorProfile', function(userId) {
  return VendorProfile.find({
    userId: userId
  })
});
