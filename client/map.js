import {
  Tasks
} from '../imports/api/tasks.js';

var MAP_ZOOM = 13;
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
  self.subscribe('allVendorProfile');
  GoogleMaps.ready('map', function(map) {
    var image = {
      url: 'food-truck.png',
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35),
      setMyLocationEnabled: true
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
      var infowindow;
      if (onlineStatus) {
        Locations.find({
          deleted: false
        }).forEach((p) => {
          var marker = new google.maps.Marker({
            title: "my truck",
            animation: google.maps.Animation.DROP,
            draggable: p.userId === Meteor.userId(),
            icon: image,
            position: new google.maps.LatLng(p.lat, p.lng),
            map: map.instance
          });

          marker.addListener('click', function() {
            var vendor = VendorProfile.findOne({
              userId: p.userId
            });
            console.log('clicking icon');
            var contentString = `<div>  <b> This is my truck </b> ${vendor.name} ${p.userId}</div>`;
            if (infowindow) {
              infowindow.close();
            }
            infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            infowindow.open(map, marker);
          });

          marker.addListener('dragend', function(event) {
            Meteor.call('deleteLocation', Meteor.userId());
            Meteor.call('addLocation', event.latLng.lat(), event.latLng.lng());
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
            map: map.instance
          });
          markers.push(marker);
        });
      }

    });

  });
});
