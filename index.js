const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const photoRoutes = require('./routes/album.routes');

const app = express();

// Allow Cross-Origin requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb", strict: false }));
app.use(cors());

// Routes
app.use("/photos", photoRoutes);



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});
