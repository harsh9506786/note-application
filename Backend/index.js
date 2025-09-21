import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import noteRoutes from "./routes/note.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// DB Connection
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.log(`❌ Error: ${error}`);
  }
};
connection();

// Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/v1/noteapp", noteRoutes);

// Frontend Serve
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, "../Frontend/dist");

app.use(express.static(buildPath));

// Catch-all route for SPA
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at ${port}`);
});
