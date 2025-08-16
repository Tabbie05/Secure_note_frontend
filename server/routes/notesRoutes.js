import express from "express"
import createNote from "../controller/noteController.js"

console.log(createNote)
const router = express.Router()

router.post("/",createNote)

export default router 