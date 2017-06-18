Meteor.publish('vendorProfile', function(userId) {
  return VendorProfile.find({
    userId: userId
  })
});

Meteor.publish('allVendorProfile', function() {
  return VendorProfile.find({});
});
