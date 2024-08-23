const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Data BAse connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
    re;
  }
};

module.exports = connectDB;
