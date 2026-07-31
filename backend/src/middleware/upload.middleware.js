const multer = require("multer");

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter(req, file, callback) {
    if (!allowedTypes.has(file.mimetype)) {
      const error = new Error("Only JPG, PNG, WebP, GIF, or PDF files are allowed");
      error.statusCode = 400;
      return callback(error);
    }

    callback(null, true);
  },
});

module.exports = upload;
