exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
  let message = err.message || "Internal server error";

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource identifier";
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  } else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Session is invalid or expired";
  } else if (err.code === 11000) {
    statusCode = 409;
    message = "A record with that value already exists";
  } else if (err.code === "LIMIT_FILE_SIZE") {
    statusCode = 400;
    message = "File is larger than 5 MB";
  }

  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({ success: false, message });
};
