require("dotenv").config({ path: './env/.env' });

const cloudinary = require("cloudinary").v2;


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
});

module.exports = cloudinary