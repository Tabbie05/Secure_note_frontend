import NotesModel from "../models/notes.js";
import crypto from "crypto";

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

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
    } else if (
      note.destroyAfter === "After 24 hours" &&
      age >= 24 * 60 * 60 * 1000
    ) {
      shouldDestroy = true;
    } else if (
      note.destroyAfter === "After 7 days" &&
      age >= 7 * 24 * 60 * 60 * 1000
    ) {
      shouldDestroy = true;
    } else if (
      note.destroyAfter === "After 30 days" &&
      age >= 30 * 24 * 60 * 60 * 1000
    ) {
      shouldDestroy = true;
    }

    if (shouldDestroy) {
      note.destroy = true;
      await note.save();
      return res
        .status(410)
        .json({ message: "This note has expired/destroyed!" });
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

export const deleteNote = async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: "Note ID is required" });
    }

    const del_note = await NotesModel.findByIdAndUpdate(
      id,
      { destroy: true },
      { new: true } // ensures the updated document is returned
    );

    if (!del_note) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({
      message: "Note  destroyed successfully",
      data: del_note,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error while updating note." });
  }
};

export const SendDestructionMssgToEmail = async (req, res) => {
  const { email, destroyAfter } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: `"Secure Note" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Note Destruction Info",
    text: `Hi,\n\nThis is to inform you that your note will be destroyed: ${destroyAfter}.\n\nThank you,\nSecure Note`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email sending failed:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
};
