const cloudinary = require("cloudinary").v2;

const requiredVariables = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const configureCloudinary = () => {
  const missing = requiredVariables.filter((name) => !process.env[name]?.trim());

  if (missing.length) {
    const error = new Error(
      `Image storage is not configured. Missing: ${missing.join(", ")}`,
    );
    error.statusCode = 503;
    throw error;
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  return cloudinary;
};

module.exports = { cloudinary, configureCloudinary };
