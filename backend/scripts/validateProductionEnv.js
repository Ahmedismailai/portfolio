const required = ["MONGO_URI", "JWT_SECRET", "FRONTEND_URL", "BACKEND_PUBLIC_URL"];
const uploadRequired = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

if (process.env.NODE_ENV !== "production") process.exit(0);

const missing = required.filter((name) => !process.env[name]?.trim());
const missingUploadConfig = uploadRequired.filter((name) => !process.env[name]?.trim());

if (missing.length || missingUploadConfig.length) {
  const names = [...missing, ...missingUploadConfig].join(", ");
  console.error(`Production environment is missing: ${names}`);
  process.exit(1);
}

if (process.env.JWT_SECRET.trim().length < 32) {
  console.error("JWT_SECRET must be at least 32 characters in production");
  process.exit(1);
}
