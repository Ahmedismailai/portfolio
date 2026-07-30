require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../src/config/db");
const User = require("../src/models/user.model");

const main = async () => {
  const name = process.env.ADMIN_NAME?.trim();
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";

  if (!name || !email || password.length < 8) {
    throw new Error(
      "Set ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD (at least 8 characters) before running this command",
    );
  }

  await connectDB();

  if (await User.exists({ email })) {
    throw new Error("An admin with that email already exists");
  }

  await User.create({ name, email, password, role: "admin" });
  console.log(`Admin created for ${email}`);
};

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
