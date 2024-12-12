
const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: false
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
