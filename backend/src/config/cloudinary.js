const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dlvexpunm",
  api_key: process.env.CLOUDINARY_API_KEY || "867636738411388",
  api_secret: process.env.CLOUDINARY_API_SECRET || "Tuko6m9h4ogZsQ3Y_87UfGqv3-E",
});

module.exports = cloudinary;
