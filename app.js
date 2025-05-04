// app.js
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
require("dotenv").config({ path: './env/.env' });

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cloudinary = require("./cloudinary/cloudinary");
const conn = require("./db/conn");

conn();

const setupSwagger = require("./swagger/swagger");
setupSwagger(app);

const routes = require("./routes/router");
app.use("/api", routes);

// Remova o app.listen daqui
module.exports = app;





