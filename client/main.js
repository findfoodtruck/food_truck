import {
  Tasks
} from '../imports/api/tasks.js';

var MAP_ZOOM = 15;

Meteor.startup(function() {
  GoogleMaps.load({
    v: '3',
    key: 'AIzaSyDbeFfTH7Mg6LVJIeo5LmMfl8MEnbvkQIQ',
    libraries: 'geometry,places'
  });
});

Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },

  add: function() {
    var latLng = Geolocation.latLng();
  /*  Tasks.insert({
      name: "value",
      lat: latLng.lat,
      lng: latLng.lng
    });*/
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

  GoogleMaps.ready('map', function(map) {
    var image = {
      url: 'food-truck.png',
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    };
    Tasks.find({}).forEach((p) => {
      var marker = new google.maps.Marker({
        title: "my truck",
        animation: google.maps.Animation.DROP,
        icon: image,
        position: new google.maps.LatLng(p.lat, p.lng),
        map: map.instance
      });
    });
  });
});
