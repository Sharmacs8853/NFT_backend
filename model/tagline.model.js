const mongoose = require('mongoose');

const taglineSchema = new mongoose.Schema({
    tagline:{type: String, require: true},
})

const taglineModel = mongoose.model('tagline', taglineSchema );

module.exports = {taglineModel}