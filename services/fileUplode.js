const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const HandelUplodeSinglefile = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image");

module.exports = { HandelUplodeSinglefile };
