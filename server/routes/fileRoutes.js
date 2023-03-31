const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/fileModel');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.array('files'), async (req, res) => {
  try {
    const files = req.files.map((file) => ({
      file_name: file.originalname,
      file_size: file.size,
      upload_date: new Date(),
    }));

    const createdFiles = await File.bulkCreate(files);

    res.status(201).json(createdFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/download/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findByPk(id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.download(`uploads/${file.file_name}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;