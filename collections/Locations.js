Locations = new Mongo.Collection("locations");

Locations.schema = new SimpleSchema({
  lat: {
    type: Number,
    label: "Lat",
    decimal: true
  },
  lng: {
    type: Number,
    label: "Lng",
    decimal: true
  },
  deleted: {
    type: Boolean,
    defaultValue: false
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  userId: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: this.userId
        };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    }
  }

});

Locations.attachSchema(Locations.schema);


Meteor.methods({
  'addLocation': function(id, lat, lng) {
    //    console.log(id);

  },
  'deleteLocation': function(id, flag) {
    //add code
  }

});
