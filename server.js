const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./db");
const Device = require("./models/Device");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register Device
app.post("/registerDevice", async (req, res) => {
  const { userId, androidId } = req.body;
  if (!userId || !androidId)
    return res
      .status(400)
      .json({ success: false, msg: "Missing userId or androidId" });

  try {
    const existing = await Device.findOne({ userId, androidId });
    if (existing)
      return res.json({ success: true, msg: "Device already registered" });

    const device = new Device({ userId, androidId });
    await device.save();
    res.json({ success: true, msg: "Device registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "DB error" });
  }
});

// Verify Device
app.post("/verifyDevice", async (req, res) => {
  const { userId, androidId } = req.body;
  if (!userId || !androidId)
    return res
      .status(400)
      .json({ success: false, msg: "Missing userId or androidId" });

  try {
    const device = await Device.findOne({ userId, androidId });
    if (device) res.json({ success: true, msg: "Device verified" });
    else res.json({ success: false, msg: "Device not recognized" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "DB error" });
  }
});

// Unregister Device
app.post("/unregisterDevice", async (req, res) => {
  const { userId, androidId } = req.body;
  if (!userId || !androidId)
    return res
      .status(400)
      .json({ success: false, msg: "Missing userId or androidId" });

  try {
    const device = await Device.findOne({ userId, androidId });
    if (!device)
      return res.status(404).json({ success: false, msg: "Device not found" });

    await Device.deleteOne({ _id: device._id });
    res.json({ success: true, msg: "Device successfully unregistered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "DB error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
