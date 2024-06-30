const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  address: String,
  gender: String,
  dob: String,
  phone: String,
  branch: String,
});

module.exports = mongoose.model('Student', studentSchema);
