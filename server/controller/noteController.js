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

    if (!note) {
      return res.status(404).json({ message: "Couldn't find the note!" });
    }

    if (note.destroy === true) {
      return res.status(410).json({ message: "This note has been destroyed!" });
    }

    const now = Date.now();
    let shouldDestroy = false;

    if (note.destroyAfter === "After reading") {
      // Show the note once, then mark it destroyed
      res.status(200).json({
        message: "Note found successfully!",
        data: note,
      });

      note.destroy = true;
      await note.save();
      return;
    }

    // Check if the note is expired by time
    const age = now - note.createdAt;

    if (note.destroyAfter === "After 1 hour" && age >= 60 * 60 * 1000) {
      shouldDestroy = true;
    } else if (note.destroyAfter === "After 24 hours" && age >= 24 * 60 * 60 * 1000) {
      shouldDestroy = true;
    } else if (note.destroyAfter === "After 7 days" && age >= 7 * 24 * 60 * 60 * 1000) {
      shouldDestroy = true;
    } else if (note.destroyAfter === "After 30 days" && age >= 30 * 24 * 60 * 60 * 1000) {
      shouldDestroy = true;
    }

    if (shouldDestroy) {
      note.destroy = true;
      await note.save();
      return res.status(410).json({ message: "This note has expired/destroyed!" });
    }

    // If all good, return the note
    return res.status(200).json({
      message: "Note found successfully!",
      data: note,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching note." });
  }
};

