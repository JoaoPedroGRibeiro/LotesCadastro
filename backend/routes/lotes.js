import express from "express";
import { getLotes, addLotes, updateLotes, deleteLotes} from "../controller/lote.js"

const router = express.Router()

router.get("/", getLotes)

router.post("/", addLotes)

router.put("/:id", updateLotes)

router.delete("/:id", deleteLotes)

export default router