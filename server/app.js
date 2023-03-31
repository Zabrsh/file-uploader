const express = require('express');
const multer = require('multer');
const { getFiles, uploadFile, deleteFile } = require('./controllers/controllers');
const { connectToDatabase } = require('./models/models');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Connect to database
connectToDatabase();

// Define routes
app.get('/files', getFiles);
app.post('/upload', upload.single('file'), uploadFile);
app.delete('/files/:id', deleteFile);

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));