VendorProfile = new Mongo.Collection("vendorProfile");

VendorProfile.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return false;
  },
  remove: function() {
    return false;
  }
});

VendorProfile.schema = new SimpleSchema({
  field: {
    type: String,
    label: "Field Name"
  },
  value: {
    type: String,
    label: "Field Value"
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
