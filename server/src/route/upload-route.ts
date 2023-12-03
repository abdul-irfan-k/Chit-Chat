import express from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "node:url"

import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

import { uploadMultipleImageHandler, uploadSingleImageHandler } from "../controller/upload-controller.js"

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
// router.post("/uploadMultipleImage", upload.array("image"),uploadMultipleImageHandler)

// directly image adding cloudinary without storing
// cloudinary.config({
// })
// const cloudinaryStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
// })
// const cloudinaryUpload = multer({ storage: cloudinaryStorage })

// router.post("/uploadSingleImage", cloudinaryUpload.single("file"), uploadSingleImageHandler)

export default router
