import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/notesRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/notes", router);  

mongoose.connect("mongodb://127.0.0.1:27017/notesdb")
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.get("/", (req, res) => res.send("Hello world"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
