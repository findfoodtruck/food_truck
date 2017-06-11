import {
  Tasks
} from '../imports/api/tasks.js';

var MAP_ZOOM = 15;
var markers = [];
Meteor.startup(function() {
  GoogleMaps.load({
    v: '3',
    key: 'AIzaSyDbeFfTH7Mg6LVJIeo5LmMfl8MEnbvkQIQ',
    libraries: 'geometry,places',
    center: Geolocation.latLng()
  });
});



Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
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
  }

});

Template.map.onCreated(function() {
  var self = this;
  self.subscribe('allLocations');
  GoogleMaps.ready('map', function(map) {
    var image = {
      url: 'food-truck.png',
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    };
    self.autorun(function() {
      var onlineStatus = false;
      if (markers) {
        for (i in markers) {
          markers[i].setMap(null);
        }
      }
      var loc = Locations.findOne({
        userId: Meteor.userId(),
        deleted: false
      });
      if (loc && !loc.deleted) onlineStatus = true;

      if (onlineStatus) {
        Locations.find({
          deleted: false
        }).forEach((p) => {
          var marker = new google.maps.Marker({
            title: "my truck",
            animation: google.maps.Animation.DROP,
            draggable: true,
            icon: image,
            position: new google.maps.LatLng(p.lat, p.lng),
            map: map.instance
          });

          markers.push(marker);
        });
      } else {
        Locations.find({
          userId: {
            $ne: Meteor.userId()
          },
          deleted: false
        }).forEach((p) => {
          console.log('not users location');
          var marker = new google.maps.Marker({
            title: "my truck",
            label: "adding my label",
            animation: google.maps.Animation.DROP,
            icon: image,
            position: new google.maps.LatLng(p.lat, p.lng),
            map: map.instance,
            draggable: true
          });
          markers.push(marker);
        });
      }

    });

  });
});
