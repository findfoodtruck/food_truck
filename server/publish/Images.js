Meteor.publish('images', function(userId) {
  return Images.find();
});
