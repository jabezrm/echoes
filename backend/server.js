import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Activity from "./models/Activity.js";
dotenv.config(); 

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("API running");
});

app.post("/test", async (req, res) => {
  const newPost = await Activity.create({
    content: "My first post!"
  });

  res.json(newPost);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
