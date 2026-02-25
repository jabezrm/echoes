import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Activity from "./models/Activity.js";
import User from "./models/User.js";
import cors from "cors";
import authRoutes from "./routes/auth.js";


dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("API running");
});

// CREATE a new user
app.post("/users", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Username required" });
    }
    const newUser = await User.create({ username });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// READ all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 


// CREATE a new activity
app.post("/activities", async (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const activity = await Activity.create({
    title,
    content,
    user: userId
  });

  res.status(201).json(activity);
});

// READ all activities
app.get("/activities", async (req, res) => {
  try {
    const activities = await Activity.find()
  .populate("user", "username")
  .sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ a single activity by ID
app.get("/activities/:id", async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ error: "Activity not found" });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE an activity by ID
app.put("/activities/:id", async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return the updated document
    );
    if (!updated) return res.status(404).json({ error: "Activity not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an activity by ID
app.delete("/activities/:id", async (req, res) => {
  try {
    const deleted = await Activity.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Activity not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
