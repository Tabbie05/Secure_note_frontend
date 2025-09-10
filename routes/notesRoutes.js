import express from "express"
import { createNote, deleteNote, getNote, SendDestructionMssgToEmail, verifyNotePassword } from "../controller/noteController.js"

console.log(createNote)
const router = express.Router()

router.post("/",createNote)
router.get("/:id",getNote)
router.put("/",deleteNote)
router.post("/send-destruction-info",SendDestructionMssgToEmail)
router.post('/:id/verify-password', verifyNotePassword);
export default router 

