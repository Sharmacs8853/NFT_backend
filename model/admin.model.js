const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: [true, "please enter your name"] },
    email: { type: String, required: [true, "please Enter your email"] },
    password: { type: String, required: [true, "password should be greater than 6 char"], min: 6 },
})

const adminModel = mongoose.model('admin', adminSchema);

module.exports = { adminModel }