import express from "express";

import mongoose from "mongoose";
import router from "./routes/notesRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/notes", router);  

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/notesdb";
mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.get("/", (req, res) => res.send("Hello world"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
