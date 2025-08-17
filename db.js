const mongoose = require("mongoose");

const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://maheshprayaga09:mahesh09@deviceauth.crbtwjp.mongodb.net/?retryWrites=true&w=majority&appName=DeviceAuth";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

module.exports = mongoose;
