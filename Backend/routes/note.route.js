import express from "express";
import {
  CreateNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/note.controller.js";

const router = express.Router();

router.post("/create-note", CreateNote);
router.get("/get-notes", getAllNotes);
router.put("/update-note/:id", updateNote);
router.delete("/delete-note/:id", deleteNote);

export default router;
