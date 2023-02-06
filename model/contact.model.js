const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    subject: { type: String, require: true },
    msg: { type: String, require: true },
    contactAt: { type: Date, default: Date.now }
})

const contactModel = mongoose.model('contact', contactSchema);

module.exports = { contactModel }