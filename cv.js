import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import CV from '../models/cvModel.js'; // Import the CV model

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ dest: 'public/cv/' });

export const downloadCV = async (req, res) => {
  try {
    const cv = await CV.findOne({}); // Retrieve the CV metadata
    if (!cv) return res.status(404).send("CV not found");

    const filePath = path.join(__dirname, '..', 'public', 'cv', cv.filename);


     // Ensure correct headers are sent for PDF
     res.setHeader('Content-Type', 'application/pdf');
     res.setHeader('Content-Disposition', `attachment; filename=${cv.filename}`);

     
    res.download(filePath, cv.filename, (err) => {
      if (err) {
        console.error("File download error:", err);
        res.status(500).send("File not found");
      }
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const uploadCV = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const oldCv = await CV.findOne({});
    if (oldCv) {
      const oldFilePath = path.join(__dirname, '..', 'public', 'cv', oldCv.filename);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); // Delete old file
      }
      await CV.deleteOne({}); // Remove old CV metadata
    }

    const newFilePath = path.join(__dirname, '..', 'public', 'cv', req.file.filename);
    fs.renameSync(req.file.path, newFilePath);

    const newCv = new CV({
      filename: req.file.filename,
      uploadDate: new Date(),
    });
    await newCv.save();

    res.status(200).send("File uploaded and updated successfully.");
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send("Server error");
  }
};

export const deleteCV = async (req, res) => {
  try {
    const cv = await CV.findOne({});
    if (!cv) return res.status(404).send("CV not found");

    const filePath = path.join(__dirname, '..', 'public', 'cv', cv.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete file
      await CV.deleteOne({}); // Remove CV metadata
      res.status(200).send("File deleted successfully.");
    } else {
      res.status(404).send("File not found.");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
};
