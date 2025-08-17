const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI || "YOUR_ATLAS_URI_HERE";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

module.exports = mongoose;
