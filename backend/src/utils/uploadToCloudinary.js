const { configureCloudinary } = require("../config/cloudinary");

const uploadToCloudinary = (
  fileBuffer,
  folder = "portfolio",
  resource_type = "image",
) => {
  if (!Buffer.isBuffer(fileBuffer) || fileBuffer.length === 0) {
    const error = new Error("The uploaded file is empty");
    error.statusCode = 400;
    throw error;
  }

  return new Promise((resolve, reject) => {
    const cloudinary = configureCloudinary();
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type,
        overwrite: false,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          const err = new Error("Image upload failed");
          err.statusCode = 502;
          return reject(err);
        }
        resolve(result);
      },
    );

    stream.end(fileBuffer);
  });
};

module.exports = uploadToCloudinary;
