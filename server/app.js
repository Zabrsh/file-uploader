const express = require('express');
const app = express();
const filesRouter = require('./routes/fileRoutes');

app.use(express.json());
app.use('/files', filesRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  

module.exports = app;