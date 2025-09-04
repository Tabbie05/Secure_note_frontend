import express from "express"
import createNote, { deleteNote, getNote, SendDestructionMssgToEmail } from "../controller/noteController.js"

console.log(createNote)
const router = express.Router()

router.post("/",createNote)
router.get("/:id",getNote)
router.put("/",deleteNote)
router.post("/send-destruction-info",SendDestructionMssgToEmail)
export default router 

