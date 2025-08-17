const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Fake in-memory database (for demo only)
// Format: { userId: androidId }
let devices = {};

// 📌 Register Device API
app.post("/registerDevice", (req, res) => {
  const { userId, androidId } = req.body;

  if (!userId || !androidId) {
    return res
      .status(400)
      .json({ success: false, msg: "Missing userId or androidId" });
  }

  devices[userId] = androidId; // save device binding
  res.json({ success: true, msg: "Device registered" });
});

// 📌 Verify Device API
app.post("/verifyDevice", (req, res) => {
  const { userId, androidId } = req.body;

  if (!userId || !androidId) {
    return res
      .status(400)
      .json({ success: false, msg: "Missing userId or androidId" });
  }

  if (devices[userId] && devices[userId] === androidId) {
    res.json({ success: true, msg: "Device verified" });
  } else {
    res.json({ success: false, msg: "Device not recognized" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
