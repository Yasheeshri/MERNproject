//final
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const studentSchema = new Schema({
  userId: { type: String },
  password: { type: String },
  name: { type: String },
  enrollmentNumber: { type: Number },
  mobileNumber: { type: String },
  dob: { type: Date },
  parentsMobile: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  gender: { type: String },
  address: {
    city: { type: String },
    state: { type: String },
    pincode: { type: Number }
  },
  course: { type: String },
  branch: { type: String },

  subjects: [{ type: String }], // Array of subject names
  year: { type: Number },

//** */

documentFilePath: {
  type: String,
  
},
photoFilePath: {
  type: String,
  
},
studentstatus: { type: String, default: 'Active' },
createdOn: { type: Date, default: Date.now },
updatedOn: { type: Date }

}, {
  collection: 'student'
});



// Pre-save middleware to set the updatedOn field
studentSchema.pre('save', function (next) {
  this.updatedOn = new Date();
  next();
});

module.exports = mongoose.model('Student', studentSchema);




















