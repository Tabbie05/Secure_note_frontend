import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
  noteId: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires:"after reading"
  },
  passwordHash: {
    type: String,
    default: null,
  },
  destroy: {
    type: Boolean,
    default: false,
  },
  destroyAfter: {
    type: String,
    enum: ["after reading", "1 hour", "24 hours", "7 days", "30 days"],
  },
  notificationEmail: {
    type: String,
    default: null,
  },
  showWithoutConfirmation: {
    type: Boolean,
    default: false,
  },
  linkTitle:{
    type:String,
    default:null
  }
});

const NotesModel = mongoose.model("securenotes",notesSchema)
export default NotesModel
