require("dotenv").config();
const express = require("express");
const Telnyx = require("telnyx");

const app = express();
app.use(express.json());

const telnyxClient = new Telnyx(process.env.TELNYX_API_KEY);
const FROM_NUMBER = process.env.TELNYX_PHONE || "+19452290064";

// Health check
app.get("/", (req, res) => {
  res.json({ status: "✅ Helloemma Telnyx server is live!", from: FROM_NUMBER });
});

// Send SMS
app.post("/sms", async (req, res) => {
  const { to, text } = req.body;
  if (!to || !text) return res.status(400).json({ error: "Missing 'to' or 'text'" });
  try {
    const msg = await telnyxClient.messages.create({ from: FROM_NUMBER, to, text });
    res.json({ success: true, id: msg.data.id });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Make a Voice Call
app.post("/call", async (req, res) => {
  const { to } = req.body;
  if (!to) return res.status(400).json({ error: "Missing 'to'" });
  try {
    const call = await telnyxClient.calls.create({
      connection_id: process.env.TELNYX_CONNECTION_ID,
      from: FROM_NUMBER,
      to,
    });
    res.json({ success: true, call_control_id: call.data.call_control_id });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Webhook
app.post("/webhook", (req, res) => {
  const event = req.body?.data;
  if (event) console.log(`📩 Webhook: ${event.event_type}`);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Helloemma server running on port ${PORT}`));
