import express from "express"
import createNote, { deleteNote, getNote } from "../controller/noteController.js"

console.log(createNote)
const router = express.Router()

router.post("/",createNote)
router.get("/:id",getNote)
router.put("/",deleteNote)
export default router 