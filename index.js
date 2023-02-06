const express = require('express');
const { db_connection } = require('./config/db');
const { adminController } = require('./routes/admin.route');
const { contactController } = require('./routes/contact.route');
const { progressController } = require('./routes/progress.route');
const { taglineController } = require('./routes/tagline.route');
require('dotenv').config();
const cors=require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

//home route
app.get("/", (req, res)=>{
    res.send("jitendra sharma")
})

app.use("/admin", adminController);
app.use("/contact", contactController);
app.use("/tagline", taglineController )
app.use("/progress", progressController);

//server listener function
app.listen(PORT, async ()=>{
    try {
        await db_connection
        console.log(`databse connected http://localhost:${PORT}`)
    } catch (error) {
        console.log('database connecion failed', error);
    }
})