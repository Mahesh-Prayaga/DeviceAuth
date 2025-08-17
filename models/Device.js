const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  androidId: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Device", deviceSchema);
