FlowRouter.route('/profile', {
  action: function(params) {
    BlazeLayout.render('HomeLayout', {
      main: "VendorProfile"
    });
  }
});

FlowRouter.route('/', {
  action: function(params) {
    BlazeLayout.render('MainLayout', {
      main: "LandingPage"
    });

  }
});


FlowRouter.route('/trucks', {
  action: function(params) {
    BlazeLayout.render('HomeLayout', {
      main: "map"
    });

  }
});
