Template.ImageUpload.events({
  'change .myFileInput': function(event, template) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      Images.insert(files[i], function(err, fileObj) {
        console.log(err);
        console.log(fileObj);
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
    }
  }
});

Template.ImageUpload.helpers({
  images: function() {
    var img = Images.find();
    //  console.log('img:' +);
    return img; // Where Images is an FS.Collection instance
  }
});

Template.ImageUpload.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('images');
  });
});
