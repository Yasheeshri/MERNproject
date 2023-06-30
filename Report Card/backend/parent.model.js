const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = new Schema({
  userId: { type: String },
  parentName: { type: String },
  password: { type: String },
  mobileNumber: { type: String },
  childUserId: { type: String },
  address: {
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
  },
  parentstatus: { type: String, default: 'Active' },
  createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },
}, {
  collection: 'parent'
});


parentSchema.pre('save', function (next) {
  this.updatedOn = new Date();
  next();
});


module.exports = mongoose.model('Parent', parentSchema);
