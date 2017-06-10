Template.VendorProfile.onCreated(function() {
  var self = this;
  var userId = Meteor.userId();
  self.autorun(function() {
    self.subscribe('vendorProfile', userId);
  })
});

Template.VendorProfile.helpers({
  profileDetails: function() {
    return VendorProfile.find();
  }
});
