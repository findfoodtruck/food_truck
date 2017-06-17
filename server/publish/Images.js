Meteor.publish('images', function(userId) {
  var img = Images.find({
    owner: userId
  });
  img.map(function(im) {
    //  console.log(im);
  });
  return img;
});
