const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    active_user: { type: Number, require: true },
    artwork: { type: Number, require: true },
    artist: { type: Number, require: true },
})

const progressModel = mongoose.model('progres', progressSchema);

module.exports = { progressModel }