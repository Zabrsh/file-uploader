const { getAllFiles, addFile, deleteFileById } = require('../models/models');

exports.getFiles = (req, res) => {
  getAllFiles((err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.send(files);
  });
};

exports.uploadFile = (req, res) => {
  const { filename } = req.file;
  const { originalname } = req.file;

  addFile(filename, originalname, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.send('File uploaded successfully');
  });
};

exports.deleteFile = (req, res) => {
  const { id } = req.params;

  deleteFileById(id, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.send(`File with ID ${id} deleted successfully`);
  });
};