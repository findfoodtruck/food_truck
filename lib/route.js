FlowRouter.route('/profile', {
  action: function(params) {
    BlazeLayout.render('HomeLayout', {
      main: "VendorProfile"
    });
  }
});

FlowRouter.route('/', {
  action: function(params) {
    BlazeLayout.render('HomeLayout', {
      main: "map"
    });

  }
});
