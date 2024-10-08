import express from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "node:url"

import {
  uploadAudioHandler,
  uploadMultipleImageHandler,
  uploadSingleDocumentHandler,
  uploadSingleImageHandler,
  uploadVideoHandler,
} from "../controller/upload-controller"

const router = express.Router()

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

router.post("/uploadSingleImage", upload.single("image"), uploadSingleImageHandler)
router.post("/uploadDocument", upload.single("document"), uploadSingleDocumentHandler)
router.post("/uploadMultipleImage", upload.array("image"), uploadMultipleImageHandler)
router.post("/uploadVideo", upload.single("video"), uploadVideoHandler)
router.post("/uploadAudio", upload.single("audio"), uploadAudioHandler)

export default router
