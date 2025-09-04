import mongoose from "mongoose";
//if delafter == after read  flag true return
// swutch case if flag true then reutrn u saw a;ready

//7day dat.now or createdat ko compare kregee if km h toh 

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
    enum: ["After reading", "After 1 hour", "After 24 hours", "After 7 days", "After 30 days"],
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
