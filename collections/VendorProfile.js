VendorProfile = new Mongo.Collection("vendorProfile");

VendorProfile.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return false;
  }
});

VendorProfile.schema = new SimpleSchema({
  name: {
    type: String,
    label: "Business/Shop Name"
  },
  address: {
    type: String,
    label: "Address, mostly where you are available",
    max: 1000,
    autoform: {
      rows: 3
    }
  },
  phone: {
    type: String,
    label: "Contact Number",
    regEx: /^[0-9]{10}$/,
    //msg: "{label} must be numeric and 10 digits"
  },
  type: {
    type: String,
    optional: true,
    label: "Truck Type",
    autoform: {
      type: 'select',
      options: function() {
        return [{
          label: "Truck1",
          value: "Truck1"
        }, {
          label: "Truck2",
          value: "Truck2"
        }, {
          label: "Truck3",
          value: "Truck3"
        }]
      }
    }
  },
  website: {
    type: String,
    optional: true,
    label: "Website",
    regEx: SimpleSchema.RegEx.Domain,
  },
  email: {
    type: String,
    optional: true,
    label: "Email",
    regEx: SimpleSchema.RegEx.Email,
  },
  summary: {
    type: String,
    label: "Brief Summary about your truck",
    optional: true,
    max: 1000,
    autoform: {
      rows: 5
    }
  },
  lastOpen: {
    type: Date,
    label: "Last date when truck was open",
    optional: true,
    autoform: {
      omit: true,
      label: false
    }
  },
  lastClose: {
    type: Date,
    label: "Last date closing time",
    optional: true,
    autoform: {
      omit: true,
      label: false
    }
  },
  social: {
    type: [String],
    label: "Social profile links Eg Facebook, twitter, zomato, pinterest, instagram etc.",
    minCount: 0,
    optional: true,
    regEx: SimpleSchema.RegEx.Domain,
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
    },
    autoform: {
      omit: true,
      label: false
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
    optional: true,
    autoform: {
      omit: true,
      label: false
    }
  },
  userId: {
    type: String,
    unique: true,
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
    },
    autoform: {
      omit: true,
      label: false
    }
  }

});

VendorProfile.attachSchema(VendorProfile.schema);
