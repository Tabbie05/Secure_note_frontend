import express from "express"
import createNote, { getNote } from "../controller/noteController.js"

console.log(createNote)
const router = express.Router()

router.post("/",createNote)
router.get("/:id",getNote)
export default router 