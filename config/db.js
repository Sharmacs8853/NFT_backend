const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);
const db_connection = mongoose.connect(process.env.MONGO_URL);

module.exports = {
    db_connection
}
