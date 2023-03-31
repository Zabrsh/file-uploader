const Files = require('../models/fileModel');

exports.uploadFiles = async (req, res) => {
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
};

exports.downloadFile = async (req, res) => {
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
};

