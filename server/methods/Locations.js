Meteor.methods({
  'addLocation': function(latLng) {
    //    console.log(id);
    console.log(latLng);
    return Locations.insert({
      lat: latLng.lat,
      lng: latLng.lng,
      userId: this.userId
    }, function(error, result) {
      if (error) console.log('er :' + error); //info about what went wrong
      if (result) console.log('re : ' + result); //the _id of new object if successful
    });

  },
  'deleteLocation': function(id, flag) {
    //add code
  }

});
