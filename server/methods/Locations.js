Meteor.methods({
  'addLocation': function(lat, lng) {
    //    console.log(id);
    // console.log(latLng);
    return Locations.insert({
      lat: lat,
      lng: lng,
      userId: this.userId
    }, function(error, result) {
      if (error) console.log('er :' + error); //info about what went wrong
      //    if (result) console.log('re : ' + result); //the _id of new object if successful
    });

  },
  'deleteLocation': function(id) {
    //add code
    //  console.log('deleting location');
    Locations.find({
      userId: id
    }).forEach((loc) => {
      Locations.update(loc._id, {
          $set: {
            deleted: true
          }
        },
        function(error, result) {
          if (error) console.log('dee :' + error); //info about what went wrong
          //  if (result) console.log('der : ' + result); //the _id of new object if successful
        });
    });

  }

});
