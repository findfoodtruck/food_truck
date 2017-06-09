import {
  Tasks
} from '../imports/api/tasks.js';

var MAP_ZOOM = 15;
var markers = [];
Meteor.startup(function() {
  GoogleMaps.load({
    v: '3',
    key: 'AIzaSyDbeFfTH7Mg6LVJIeo5LmMfl8MEnbvkQIQ',
    libraries: 'geometry,places'
  });
});

Template.map.events({
  'click .goOnline': function() {
    var latLng = Geolocation.latLng();
    console.log(latLng);
    if (latLng) {
      Meteor.call('addLocation', latLng, (result, error) => {
        if (result) console.log('addLocation : ' + result);
        if (error) console.error('akm: ' + error);
      });
      Session.set('onlineStatus', true);
    } else {
      console.log('locations NA');
    }
  },
  'click .goOffline': function() {
    Session.set('onlineStatus', false);
    console.log('going offline');
    Meteor.call('deleteLocation', Meteor.userId());
  }
});

Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },

  locations: function() {
    var latLng = Geolocation.latLng();
    //Tasks.find({});
  },
  mapOptions: function() {
    var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: MAP_ZOOM
      };
    }
  },
  onlineStatus: function() {
    return Session.get('onlineStatus');
  }
});

Template.map.onCreated(function() {
  var self = this;
  Session.set('onlineStatus', false);

  this.subscribe('allLocations');
  GoogleMaps.ready('map', function(map) {
    var image = {
      url: 'food-truck.png',
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    };
    self.autorun(function() {
      if (markers) {
        for (i in markers) {
          markers[i].setMap(null);
        }
      }
      if (Session.get('onlineStatus')) {
        Locations.find({
          deleted: false
        }).forEach((p) => {
          var marker = new google.maps.Marker({
            title: "my truck",
            animation: google.maps.Animation.DROP,
            icon: image,
            position: new google.maps.LatLng(p.lat, p.lng),
            map: map.instance
          });
          markers.push(marker);
        });
      } else {
        console.log(Meteor.userId());
        Locations.find({
          userId: {
            $ne: Meteor.userId()
          },
          deleted: false
        }).forEach((p) => {
          console.log('not users location');
          var marker = new google.maps.Marker({
            title: "my truck",
            animation: google.maps.Animation.DROP,
            icon: image,
            position: new google.maps.LatLng(p.lat, p.lng),
            map: map.instance
          });
          markers.push(marker);
        });
      }

    });

  });
});
