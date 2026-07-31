const multer = require("multer");

const imageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const createUpload = (allowedTypes, message) =>
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024, files: 1 },
    fileFilter(req, file, callback) {
      if (!allowedTypes.has(file.mimetype)) {
        const error = new Error(message);
        error.statusCode = 400;
        return callback(error);
      }

      callback(null, true);
    },
  });

const imageUpload = createUpload(
  imageTypes,
  "Only JPG, PNG, WebP, or GIF images are allowed",
);
const resumeUpload = createUpload(
  new Set(["application/pdf"]),
  "Only PDF resumes are allowed",
);

module.exports = { imageUpload, resumeUpload };
