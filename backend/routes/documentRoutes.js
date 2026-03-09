const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadDocument, uploadImage } = require("../controller/documentController");

router.post("/upload", authMiddleware, upload.single("document"), uploadDocument);
router.post("/upload-image", authMiddleware, upload.single("image"), uploadImage);

module.exports = router;