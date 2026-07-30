const cloudinary = require("cloudinary").v2;

const uploadToCloudinary = (
  fileBuffer,
  folder = "portfolio",
  resource_type = "auto",
) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dlvexpunm";
  const apiKey = process.env.CLOUDINARY_API_KEY || "867636738411388";
  const apiSecret = process.env.CLOUDINARY_API_SECRET || "Tuko6m9h4ogZsQ3Y_87UfGqv3-E";

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    stream.end(fileBuffer);
  });
};

module.exports = uploadToCloudinary;
