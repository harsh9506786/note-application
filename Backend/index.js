import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path"

import noteRoutes from "./routes/note.route.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

const connection = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log(`Error message: ${error}`);
  }
};
connection();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.use(cors());

app.use("/api/v1/noteapp", noteRoutes);

const buildPath = path.join(__dirname, '../frontend/build'); // Path ko dhyan se set karein
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
