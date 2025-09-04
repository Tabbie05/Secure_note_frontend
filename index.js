// index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/notesRoutes.js"; // Make sure this file exists and exports a valid router
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/notes", router);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Test route
app.get("/", (req, res) => res.send("Hello world"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
