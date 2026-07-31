const mongoose = require("mongoose");

mongoose.set("sanitizeFilter", true);
mongoose.set("strictQuery", true);

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log(`MongoDB Connected: ${connection.connection.host}`);
  return connection;
};

module.exports = connectDB;
