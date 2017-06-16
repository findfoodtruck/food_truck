Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {
    path: "~/uploads"
  })]
});

Images.allow({
  'insert': function() {
    // add custom authentication code here
    return true;
  },
  'update': function() {
    // add custom authentication code here
    return true;
  },
  'download': function(userId, fileObj) {
    return true
  },
  'remove': function() {
    // add custom authentication code here
    return true;
  }
});
