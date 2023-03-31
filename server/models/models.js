const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();
let connection;

exports.connectToDatabase = () => {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  connection.connect((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log('Connected to database');
  });
};

exports.getAllFiles = (callback) => {
  connection.query('SELECT * FROM files', (err, rows) => {
    if (err) {
      callback(err);
      return;
    }

    callback(null, rows);
  });
};

exports.addFile = (filename, originalname, callback) => {
  const sql = 'INSERT INTO files (filename, originalname) VALUES (?, ?)';
  connection.query(sql, [filename, originalname], (err) => {
    if (err) {
      callback(err);
      return;
    }

    callback(null);
  });
};

exports.deleteFileById = (id, callback) => {
  const sql = 'DELETE FROM files WHERE id = ?';
  connection.query(sql, [id], (err) => {
    if (err) {
      callback(err);
      return;
    }

    callback(null);
  });
};