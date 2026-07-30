const cloudinary = require("cloudinary").v2;

const uploadToCloudinary = (
  fileBuffer,
  folder = "portfolio",
  resource_type = "image",
) => {
  const required = [
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ];
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new Error(`Upload service is not configured: ${missing.join(", ")}`);
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });



  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type,
        ...(resource_type === "image"
          ? {
              transformation: [
                { width: 1600, height: 1600, crop: "limit", quality: "auto:good" },
              ],
            }
          : {}),
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
