import NotesModel from "../models/notes.js";
import crypto from "crypto";

const createNote = async (req, res) => {
  console.log(req.body);
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

export const getNote = async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await NotesModel.findOne({ noteId });

    if (note) {
      res.status(200).json({
        message: "Note found successfully!",
        data: note,
      });
    } else {
      res.status(404).json({ message: "Couldn't find the note!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching note." });
  }
};

