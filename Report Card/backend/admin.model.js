const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    adminId: String,
  password: String,
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date },
    },
  {
    collection: 'admins'
  }
  );


  // Pre-save middleware to set the updatedOn field
adminSchema.pre('save', function (next) {
  this.updatedOn = new Date();
  next();
});
  
  module.exports = mongoose.model('Admin', adminSchema);
  