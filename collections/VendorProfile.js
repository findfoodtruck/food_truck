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
    label: "Name"
  },
  address: {
    type: String,
    label: "Address"
  },
  phone: {
    type: String,
    label: "Phone",
    regEx: /^[0-9]{10}$/,
    //msg: "{label} must be numeric and 10 digits"
  },
  type: {
    type: String,
    optional: true,
    label: "Truck Type"
  },
  website: {
    type: String,
    optional: true,
    label: "website",
    regEx: SimpleSchema.RegEx.Domain,
  },
  email: {
    type: String,
    optional: true,
    label: "email",
    regEx: SimpleSchema.RegEx.Email,
  },
  summary: {
    type: String,
    label: "Brief Summary about your truck",
    optional: true,
    max: 1000
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
    minCount: 0,
    optional: true,
    regEx: SimpleSchema.RegEx.Domain,
  },
  deleted: {
    type: Boolean,
    defaultValue: false,
    autoform: {
      omit: true,
      label: false
    }
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
