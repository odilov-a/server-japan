const path = require("path");
const multer = require("multer");
const Files = require("../models/File.js");

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".doc",
    ".docx",
    ".pdf",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".txt",
  ];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type! Allowed file types are: " +
          allowedExtensions.join(", ")
      ),
      false
    );
  }
};

exports.upload = async (req, res) => {
  try {
    const publicFolderPath = `./uploads`;
    const storage = multer.diskStorage({
      destination: publicFolderPath,
      filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = path.basename(
          file.originalname,
          path.extname(file.originalname)
        );
        const fileExtension = path.extname(file.originalname);
        // Nom: timestamp-originalName.pdf
        const fileName = `${originalName}-${timestamp}${fileExtension}`;
        cb(null, fileName);
      },
    });

    const upload = multer({
      storage,
      fileFilter,
    }).single("file");

    upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      if (!req.file) {
        return res.status(400).json({ message: "File not found" });
      }
      const newFile = new Files({
        fileName: req.file.filename,
        fileUrl: `http://localhost:7001/uploads/${req.file.filename}`,
      });
      await newFile.save();
      return res.status(200).json({ data: newFile });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
