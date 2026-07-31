const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET?.trim();

  if (!secret) {
    const error = new Error("JWT_SECRET is not configured");
    error.statusCode = 500;
    throw error;
  }

  return secret;
};

module.exports = { getJwtSecret };
