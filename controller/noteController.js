import NotesModel from "../models/notes.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

/**
 * Create a new note
 */
export const createNote = async (req, res) => {
  try {
    const {
      content,
      password, // plain password from frontend
      destroyAfter,
      notificationEmail,
      showWithoutConfirmation,
      linkTitle,
    } = req.body;

    const noteId = crypto.randomBytes(6).toString("hex");

    // Hash password if provided
    let passwordHash = null;
    if (password && password.trim()) {
      passwordHash = await bcrypt.hash(password.trim(), 12);
    }

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
    console.error("Create Note Error:", err);
    res.status(500).json({ error: "Failed to create note" });
  }
};

/**
 * Get note metadata or content
 */
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
    const age = now - new Date(note.createdAt).getTime();

    // Expiry checks
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

    // If password protected → don’t send content yet
    if (note.passwordHash) {
      return res.status(200).json({
        message: "Note found successfully!",
        data: {
          noteId: note.noteId,
          linkTitle: note.linkTitle,
          createdAt: note.createdAt,
          destroyAfter: note.destroyAfter,
          hasPassword: true,
        },
      });
    }

    // If destroy after reading → return content then destroy
    if (note.destroyAfter === "After reading") {
      const safeNote = note.toObject();
      delete safeNote.passwordHash;

      note.destroy = true;
      await note.save();

      return res.status(200).json({
        message: "Note found successfully!",
        data: safeNote,
      });
    }

    // Otherwise return the full note
    const safeNote = note.toObject();
    delete safeNote.passwordHash;

    return res.status(200).json({
      message: "Note found successfully!",
      data: safeNote,
    });
  } catch (err) {
    console.error("Get Note Error:", err);
    res.status(500).json({ error: "Server error while fetching note." });
  }
};

/**
 * Verify password and return content
 */
export const verifyNotePassword = async (req, res) => {
  const noteId = req.params.id;
  const { password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    const note = await NotesModel.findOne({ noteId });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    if (note.destroy === true) {
      return res.status(410).json({ success: false, message: "This note has been destroyed!" });
    }

    if (!note.passwordHash) {
      return res.status(400).json({ success: false, message: "Note is not password protected" });
    }

    // Expiry check
    const now = Date.now();
    const age = now - new Date(note.createdAt).getTime();
    let shouldDestroy = false;

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
      return res.status(410).json({ success: false, message: "This note has expired/destroyed!" });
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, note.passwordHash);

    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    // If correct, prepare safe note (without passwordHash)
    const safeNote = note.toObject();
    delete safeNote.passwordHash;

    if (note.destroyAfter === "After reading") {
      note.destroy = true;
      await note.save();
    }

    return res.status(200).json({
      success: true,
      message: "Password verified successfully!",
      data: safeNote,
    });
  } catch (error) {
    console.error("Verify Password Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Delete/destroy note by noteId
 */
export const deleteNote = async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: "Note ID is required" });
    }

    const del_note = await NotesModel.findOneAndUpdate(
      { noteId: id },
      { destroy: true },
      { new: true }
    );

    if (!del_note) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({
      message: "Note destroyed successfully",
      data: del_note,
    });
  } catch (err) {
    console.error("Delete Note Error:", err);
    return res.status(500).json({ error: "Server error while updating note." });
  }
};

/**
 * Send destruction email
 */
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
    from: `Secure Note <${process.env.EMAIL_USER}>`,
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