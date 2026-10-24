const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5050;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/notesdb";

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
