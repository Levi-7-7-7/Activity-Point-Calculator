require("dotenv").config(); // ✅ Load .env at the top

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static certificate files (if needed)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection (Mongoose v6+ doesn't need useNewUrlParser or useUnifiedTopology)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/certificates', require('./routes/certificates'));

// Root
app.get('/', (req, res) => res.send("🎉 Activity Points API Running"));

// Optional: Catch unhandled routes
app.use((req, res) => {
  res.status(404).json({ msg: "API route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
