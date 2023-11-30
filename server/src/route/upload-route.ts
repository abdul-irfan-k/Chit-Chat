import express from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from 'node:url';

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "public", "upload"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1])
  },
})
const upload = multer({ storage })

router.post("/upload",upload.single("file"), (req, res) => {
  const val = req.body
  console.log("req body", req.body)
  debugger
})

export default router
