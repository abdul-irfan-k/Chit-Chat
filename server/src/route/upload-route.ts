import express from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "node:url"

import { uploadMultipleImageHandler, uploadSingleDocumentHandler, uploadSingleImageHandler } from "../controller/upload-controller.js"

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "../", "public", "upload"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1])
  },
})
const upload = multer({ storage })

router.post("/uploadSingleImage", upload.single("file"), uploadSingleImageHandler)
router.post("/uploadDocument",upload.single("document"),uploadSingleDocumentHandler)
router.post("/uploadMultipleImage", upload.array("image"),uploadMultipleImageHandler)
router.post("/uploadVideo", upload.array("image"),uploadMultipleImageHandler)


export default router
