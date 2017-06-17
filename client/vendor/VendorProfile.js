Template.VendorProfile.onCreated(function() {
  var self = this;
  var userId = Meteor.userId();
  Session.set('editName', false);
  self.autorun(function() {
    self.subscribe('vendorProfile', userId);
  })
});

Template.VendorProfile.helpers({
  profileDetails: function() {
    return VendorProfile.find();
  },
  vendorId: function() {
    return VendorProfile.findOne({
      userId: Meteor.userId()
    });
  },
  newVendor: function() {
    var exist = VendorProfile.findOne({
      userId: Meteor.userId()
    });
    if (exist) return true;
    return false;
  },
  autoSaveMode: function() {
    return true;
  },
  formType: function() {
    if (Session.get('editName')) {
      return "update";
    }
    return "readonly";
  }
});

Template.VendorProfile.events({
  'click .editForm': function() {
    return Session.set('editName', !Session.get('editName'));
  }
});
