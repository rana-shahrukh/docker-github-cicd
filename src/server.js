const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5050;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/notesdb";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Note = mongoose.model("Note", noteSchema);

app.get("/", (req, res) => {
  res.json({
    message: "Notes API is running"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK"
  });
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch notes"
    });
  }
});

app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({
      error: "Failed to create note"
    });
  }
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    process.exit(1);
  }
}

startServer();
