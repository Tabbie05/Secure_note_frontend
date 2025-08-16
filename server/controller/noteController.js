import NotesModel from "../models/notes.js";
import crypto from "crypto";

const createNote = async (req, res) => {
  try {
    const {
      content,
      passwordHash,
      destroyAfter,
      notificationEmail,
      showWithoutConfirmation,
      linkTitle,
    } = req.body;

    const noteId = crypto.randomBytes(6).toString("hex");

    const noteDetails = await NotesModel.create({
      noteId,
      content,
      passwordHash,
      destroyAfter,
      notificationEmail,
      showWithoutConfirmation,
      linkTitle,
    });

    res.status(201).json({
      message: "Note created successfully",
      noteId: noteDetails.noteId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create note" });
  }
};

export default createNote;

